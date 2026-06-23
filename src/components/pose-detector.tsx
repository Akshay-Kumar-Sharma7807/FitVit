"use client";

import { useEffect, useRef, useState } from "react";

export type Exercise = "bicep_curl" | "squat" | "pushup" | "shoulder_press" | "lunge";

interface Landmark { x: number; y: number; z: number; visibility?: number; }

export interface PoseDetectorProps {
  exercise: Exercise;
  onRepCount: (count: number) => void;
  onFormFeedback: (status: "good" | "bad", message: string) => void;
  onStop: () => void;
}

const LM = { LSH: 11, RSH: 12, LEL: 13, REL: 14, LWR: 15, RWR: 16, LHP: 23, RHP: 24, LKN: 25, RKN: 26, LAN: 27, RAN: 28 };

function ang(a: Landmark, b: Landmark, c: Landmark): number {
  const r = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
  let d = Math.abs(r * 180 / Math.PI);
  return d > 180 ? 360 - d : d;
}

function v(lm: Landmark, t = 0.4) { return (lm.visibility ?? 1) > t; }

// Pick arm side with better visibility
function arm(lms: Landmark[]) {
  const lv = (lms[LM.LSH].visibility ?? 0) + (lms[LM.LEL].visibility ?? 0) + (lms[LM.LWR].visibility ?? 0);
  const rv = (lms[LM.RSH].visibility ?? 0) + (lms[LM.REL].visibility ?? 0) + (lms[LM.RWR].visibility ?? 0);
  return rv > lv
    ? { sh: lms[LM.RSH], el: lms[LM.REL], wr: lms[LM.RWR], hp: lms[LM.RHP], kn: lms[LM.RKN], an: lms[LM.RAN] }
    : { sh: lms[LM.LSH], el: lms[LM.LEL], wr: lms[LM.LWR], hp: lms[LM.LHP], kn: lms[LM.LKN], an: lms[LM.LAN] };
}

// Pick leg side with better visibility
function leg(lms: Landmark[]) {
  const lv = (lms[LM.LHP].visibility ?? 0) + (lms[LM.LKN].visibility ?? 0) + (lms[LM.LAN].visibility ?? 0);
  const rv = (lms[LM.RHP].visibility ?? 0) + (lms[LM.RKN].visibility ?? 0) + (lms[LM.RAN].visibility ?? 0);
  return rv > lv
    ? { sh: lms[LM.RSH], hp: lms[LM.RHP], kn: lms[LM.RKN], an: lms[LM.RAN] }
    : { sh: lms[LM.LSH], hp: lms[LM.LHP], kn: lms[LM.LKN], an: lms[LM.LAN] };
}

// Internal mutable state — lives entirely in a ref, never re-creates the effect
interface S {
  phase: "up" | "down";
  reps: number;
  holdDown: number; // frames held in down zone
  holdUp: number;   // frames held in up zone
  angleHistory: number[];
  lastRepMs: number;
  badFormStreak: number; // consecutive bad frames (don't flip formGood on noise)
}

function mkState(): S {
  return { phase: "up", reps: 0, holdDown: 0, holdUp: 0, angleHistory: [], lastRepMs: 0, badFormStreak: 0 };
}

function smooth(history: number[], next: number, n = 6): number {
  history.push(next);
  if (history.length > n) history.shift();
  return history.reduce((a, b) => a + b, 0) / history.length;
}

type R = { msg: string; good: boolean; reps: number };

// Require N frames in zone before committing phase; 800ms rep cooldown
const HOLD = 5;
const COOLDOWN = 800;

function tryRep(s: S): boolean {
  const now = Date.now();
  if (now - s.lastRepMs > COOLDOWN) { s.reps++; s.lastRepMs = now; return true; }
  return false;
}

// ── Bicep Curl ──────────────────────────────────────────────────────────────
function curl(lms: Landmark[], s: S): R {
  const { sh, el, wr } = arm(lms);
  if (!v(sh) || !v(el) || !v(wr)) return { msg: "Show your arm to the camera — step back slightly", good: false, reps: s.reps };

  const a = smooth(s.angleHistory, ang(sh, el, wr));
  const inCurled = a < 60;    // top of curl
  const inExtend = a > 150;   // arm fully extended

  if (inCurled) { s.holdDown++; s.holdUp = 0; } else if (inExtend) { s.holdUp++; s.holdDown = 0; } else { s.holdDown = 0; s.holdUp = 0; }

  if (s.holdDown >= HOLD && s.phase === "up") { s.phase = "down"; }
  if (s.holdUp >= HOLD && s.phase === "down") { tryRep(s); s.phase = "up"; }

  // Elbow drift: elbow shouldn't move far from torso (x shouldn't be very far from shoulder x)
  const elbowDrift = Math.abs(el.x - sh.x) > 0.20;
  if (elbowDrift) return { msg: "Keep your elbow pinned to your side", good: false, reps: s.reps };
  if (inCurled) return { msg: "Perfect curl! Now lower slowly", good: true, reps: s.reps };
  if (inExtend) return { msg: s.phase === "up" ? `Rep ${s.reps} done! Curl all the way up` : "Extend fully down to start", good: true, reps: s.reps };
  if (a < 100) return { msg: "Good — squeeze the bicep at the top", good: true, reps: s.reps };
  return { msg: "Full range of motion: curl up higher or extend further down", good: false, reps: s.reps };
}

// ── Squat ───────────────────────────────────────────────────────────────────
function squat(lms: Landmark[], s: S): R {
  const { sh, hp, kn, an } = leg(lms);
  if (!v(hp) || !v(kn) || !v(an)) return { msg: "Step back — show full body including your feet", good: false, reps: s.reps };

  const a = smooth(s.angleHistory, ang(hp, kn, an));
  const inBottom = a < 110;  // squat depth
  const inTop = a > 165;     // standing

  if (inBottom) { s.holdDown++; s.holdUp = 0; } else if (inTop) { s.holdUp++; s.holdDown = 0; } else { s.holdDown = 0; s.holdUp = 0; }

  if (s.holdDown >= HOLD && s.phase === "up") { s.phase = "down"; }
  if (s.holdUp >= HOLD && s.phase === "down") { tryRep(s); s.phase = "up"; }

  // Forward lean: shoulder should stay above hip
  const tooLean = v(sh) && sh.y < hp.y - 0.15; // shoulder too far above hip in image = leaning way back; this check is for forward lean
  const backLean = v(sh) && (sh.x - hp.x) > 0.10;

  if (inBottom) {
    if (backLean) return { msg: "Chest up — you're leaning too far forward", good: false, reps: s.reps };
    return { msg: "Great depth! Drive through heels to stand", good: true, reps: s.reps };
  }
  if (inTop) return { msg: s.phase === "up" ? `Rep ${s.reps}! Stand tall, then go again` : "Feet shoulder-width, squat down", good: true, reps: s.reps };
  if (a < 140) return { msg: "Keep going — thighs parallel to the floor", good: false, reps: s.reps };
  return { msg: "Hinge at the hips and bend your knees", good: true, reps: s.reps };
}

// ── Push-Up ─────────────────────────────────────────────────────────────────
function pushup(lms: Landmark[], s: S): R {
  const { sh, el, wr, hp, an } = arm(lms);
  if (!v(sh) || !v(el) || !v(wr)) return { msg: "Position camera to the side — show full body", good: false, reps: s.reps };

  const a = smooth(s.angleHistory, ang(sh, el, wr));
  const inBottom = a < 85;
  const inTop = a > 155;

  if (inBottom) { s.holdDown++; s.holdUp = 0; } else if (inTop) { s.holdUp++; s.holdDown = 0; } else { s.holdDown = 0; s.holdUp = 0; }

  if (s.holdDown >= HOLD && s.phase === "up") { s.phase = "down"; }
  if (s.holdUp >= HOLD && s.phase === "down") { tryRep(s); s.phase = "up"; }

  // Body alignment from side: shoulder, hip, ankle roughly collinear
  const bodyAngle = (v(hp) && v(an)) ? ang(sh, hp, an) : 175;
  const hipSag = bodyAngle < 150;
  const hipUp = bodyAngle > 200;

  if (hipSag) return { msg: "Core tight — your hips are dropping!", good: false, reps: s.reps };
  if (hipUp) return { msg: "Lower your hips — body must be straight", good: false, reps: s.reps };
  if (inBottom) return { msg: "Great depth! Push up powerfully", good: true, reps: s.reps };
  if (inTop) return { msg: s.phase === "up" ? `Rep ${s.reps}! Lower yourself down` : "Fully lock arms at top", good: true, reps: s.reps };
  if (a < 120) return { msg: "Go lower — chest toward the floor", good: false, reps: s.reps };
  return { msg: "Slowly lower with control", good: true, reps: s.reps };
}

// ── Shoulder Press ──────────────────────────────────────────────────────────
function press(lms: Landmark[], s: S): R {
  const { sh, el, wr, hp } = arm(lms);
  if (!v(sh) || !v(el) || !v(wr)) return { msg: "Face the camera and show both arms", good: false, reps: s.reps };

  const a = smooth(s.angleHistory, ang(sh, el, wr));
  const inTop = a > 160;    // arms locked out overhead
  const inStart = a < 95;   // elbows at ~90°, weights at ear height

  if (inTop) { s.holdUp++; s.holdDown = 0; } else if (inStart) { s.holdDown++; s.holdUp = 0; } else { s.holdDown = 0; s.holdUp = 0; }

  if (s.holdDown >= HOLD && s.phase === "up") { s.phase = "down"; }
  if (s.holdUp >= HOLD && s.phase === "down") { tryRep(s); s.phase = "up"; }

  // Back arch: if hip moves forward relative to shoulder
  const arch = v(hp) && Math.abs(sh.x - hp.x) > 0.12;

  if (arch) return { msg: "Don't arch your back — brace your core", good: false, reps: s.reps };
  if (inTop) return { msg: s.phase === "up" ? `Rep ${s.reps}! Lock out fully at the top` : "Lower to ear height and press again", good: true, reps: s.reps };
  if (inStart) return { msg: "Good start — press straight overhead", good: true, reps: s.reps };
  if (a > 130) return { msg: "Almost there — fully extend your arms overhead", good: false, reps: s.reps };
  return { msg: "Keep pressing up", good: true, reps: s.reps };
}

// ── Lunge ───────────────────────────────────────────────────────────────────
function lunge(lms: Landmark[], s: S): R {
  // Pick the leg that is MORE bent (front leg doing work)
  const la = ang(lms[LM.LHP], lms[LM.LKN], lms[LM.LAN]);
  const ra = ang(lms[LM.RHP], lms[LM.RKN], lms[LM.RAN]);
  const useSide = (v(lms[LM.LKN]) && v(lms[LM.RKN])) ? (la < ra ? "L" : "R") : (v(lms[LM.LKN]) ? "L" : "R");
  const hp = useSide === "L" ? lms[LM.LHP] : lms[LM.RHP];
  const kn = useSide === "L" ? lms[LM.LKN] : lms[LM.RKN];
  const an = useSide === "L" ? lms[LM.LAN] : lms[LM.RAN];
  const sh = useSide === "L" ? lms[LM.LSH] : lms[LM.RSH];

  if (!v(hp) || !v(kn) || !v(an)) return { msg: "Step back — show full legs to camera", good: false, reps: s.reps };

  const a = smooth(s.angleHistory, ang(hp, kn, an));
  const inBottom = a < 110;
  const inTop = a > 162;

  if (inBottom) { s.holdDown++; s.holdUp = 0; } else if (inTop) { s.holdUp++; s.holdDown = 0; } else { s.holdDown = 0; s.holdUp = 0; }

  if (s.holdDown >= HOLD && s.phase === "up") { s.phase = "down"; }
  if (s.holdUp >= HOLD && s.phase === "down") { tryRep(s); s.phase = "up"; }

  const torsoLean = v(sh) && ang(sh, hp, kn) < 135;

  if (torsoLean && a < 140) return { msg: "Keep torso upright — don't lean forward", good: false, reps: s.reps };
  if (inBottom) return { msg: "Perfect depth! Drive back through your heel", good: true, reps: s.reps };
  if (inTop) return { msg: s.phase === "up" ? `Rep ${s.reps}! Step forward and lunge` : "Stand fully before next rep", good: true, reps: s.reps };
  if (a < 140) return { msg: "Lower further — back knee toward the floor", good: false, reps: s.reps };
  return { msg: "Step forward and lower with control", good: true, reps: s.reps };
}

// ── Skeleton ─────────────────────────────────────────────────────────────────
const BONES: [number, number][] = [[11,12],[11,13],[13,15],[12,14],[14,16],[11,23],[12,24],[23,24],[23,25],[25,27],[24,26],[26,28]];

function drawSkeleton(ctx: CanvasRenderingContext2D, lms: Landmark[], w: number, h: number, good: boolean) {
  const c = good ? "#22c55e" : "#ef4444", f = good ? "#86efac" : "#fca5a5";
  for (const [a, b] of BONES) {
    if (!lms[a] || !lms[b] || (lms[a].visibility ?? 1) < 0.25 || (lms[b].visibility ?? 1) < 0.25) continue;
    ctx.beginPath(); ctx.strokeStyle = c; ctx.lineWidth = 3;
    ctx.moveTo(lms[a].x * w, lms[a].y * h); ctx.lineTo(lms[b].x * w, lms[b].y * h); ctx.stroke();
  }
  for (const lm of lms) {
    if ((lm.visibility ?? 1) < 0.25) continue;
    ctx.beginPath(); ctx.arc(lm.x * w, lm.y * h, 5, 0, 2 * Math.PI);
    ctx.fillStyle = f; ctx.fill(); ctx.strokeStyle = c; ctx.lineWidth = 2; ctx.stroke();
  }
}

const MODEL = "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_full/float16/1/pose_landmarker_full.task";
const WASM  = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm";

// ── Component ────────────────────────────────────────────────────────────────
export function PoseDetector({ exercise, onRepCount, onFormFeedback, onStop }: PoseDetectorProps) {
  const videoRef   = useRef<HTMLVideoElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const rafRef     = useRef<number | null>(null);
  const lmRef      = useRef<unknown>(null);
  const stateRef   = useRef<S>(mkState());
  // Keep callbacks in refs so the detection loop never needs to restart
  const cbRep      = useRef(onRepCount);
  const cbForm     = useRef(onFormFeedback);
  const exRef      = useRef(exercise);
  cbRep.current    = onRepCount;
  cbForm.current   = onFormFeedback;
  exRef.current    = exercise;

  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);
  const [reps,    setReps]    = useState(0);
  const [good,    setGood]    = useState(true);
  const [msg,     setMsg]     = useState("Get into position…");

  // ONE effect — never re-runs (empty deps)
  useEffect(() => {
    let stopped = false;
    let stream: MediaStream | null = null;
    stateRef.current = mkState();

    (async () => {
      try {
        const { PoseLandmarker, FilesetResolver } = await import("@mediapipe/tasks-vision");
        const fs = await FilesetResolver.forVisionTasks(WASM);
        const pl = await PoseLandmarker.createFromOptions(fs, {
          baseOptions: { modelAssetPath: MODEL, delegate: "GPU" },
          runningMode: "VIDEO", numPoses: 1,
        });
        if (stopped) { pl.close(); return; }
        lmRef.current = pl;

        stream = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480, facingMode: "user" }, audio: false });
        if (stopped) { stream.getTracks().forEach(t => t.stop()); return; }

        const vid = videoRef.current!;
        vid.srcObject = stream; await vid.play();
        setLoading(false);

        let lastTs = -1;
        function loop() {
          if (stopped) return;
          const vid = videoRef.current, cvs = canvasRef.current;
          if (!vid || !cvs || vid.readyState < 2) { rafRef.current = requestAnimationFrame(loop); return; }

          const ctx = cvs.getContext("2d")!;
          cvs.width = vid.videoWidth; cvs.height = vid.videoHeight;
          ctx.save(); ctx.scale(-1, 1); ctx.drawImage(vid, -cvs.width, 0, cvs.width, cvs.height); ctx.restore();

          const ts = performance.now();
          if (ts !== lastTs) {
            lastTs = ts;
            const res = (lmRef.current as { detectForVideo:(v:HTMLVideoElement,ts:number)=>{landmarks:Landmark[][]} }).detectForVideo(vid, ts);
            if (res.landmarks?.length > 0) {
              const raw = res.landmarks[0];
              const mir = raw.map((l: Landmark) => ({ ...l, x: 1 - l.x }));
              const s = stateRef.current;
              const prevReps = s.reps;

              let r: R;
              switch (exRef.current) {
                case "bicep_curl":    r = curl(raw, s); break;
                case "squat":         r = squat(raw, s); break;
                case "pushup":        r = pushup(raw, s); break;
                case "shoulder_press":r = press(raw, s); break;
                case "lunge":         r = lunge(raw, s); break;
                default: r = { msg: "", good: true, reps: s.reps };
              }

              drawSkeleton(ctx, mir, cvs.width, cvs.height, r.good);

              if (r.reps !== prevReps) { setReps(r.reps); cbRep.current(r.reps); }
              setGood(r.good); setMsg(r.msg);
              cbForm.current(r.good ? "good" : "bad", r.msg);
            }
          }
          rafRef.current = requestAnimationFrame(loop);
        }
        rafRef.current = requestAnimationFrame(loop);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Camera or model failed to load");
        setLoading(false);
      }
    })();

    return () => {
      stopped = true;
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      stream?.getTracks().forEach(t => t.stop());
      (lmRef.current as { close?:()=>void }|null)?.close?.();
    };
  }, []); // ← intentionally empty; callbacks accessed via refs

  if (error) return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 text-center h-64">
      <div className="w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
      </div>
      <p className="font-semibold text-destructive">Camera Error</p>
      <p className="text-sm text-muted-foreground max-w-xs">{error}</p>
      <button onClick={onStop} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium">Go Back</button>
    </div>
  );

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Camera — NO badge on top */}
      <div className="relative rounded-2xl overflow-hidden border border-border/60 shadow-xl bg-black">
        {loading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/90 backdrop-blur-sm gap-3">
            <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin"/>
            <p className="text-sm font-medium">Loading pose model…</p>
            <p className="text-xs text-muted-foreground">First load may take ~10 s</p>
          </div>
        )}
        <video ref={videoRef} className="hidden" playsInline muted/>
        <canvas ref={canvasRef} className="w-full h-auto block"/>
      </div>

      {/* Stats — clearly below the camera */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-card border border-border/60 rounded-2xl p-4 text-center shadow-sm">
          <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest mb-1">Reps</p>
          <p key={reps} className="text-5xl font-bold font-headline text-primary" style={{animation:"pop .3s ease-out"}}>{reps}</p>
        </div>

        <div className={`rounded-2xl border p-4 flex flex-col items-center justify-center gap-2 transition-colors duration-300 ${good ? "bg-green-500/10 border-green-500/30" : "bg-red-500/10 border-red-500/30"}`}>
          <span className={`text-2xl`}>{good ? "✓" : "!"}</span>
          <p className={`text-xs font-semibold text-center leading-snug ${good ? "text-green-600 dark:text-green-400" : "text-red-500"}`}>
            {good ? "Good Form" : "Fix Form"}
          </p>
        </div>
      </div>

      {/* Feedback message — fully outside camera */}
      <div className={`rounded-2xl border px-4 py-3 text-sm font-medium leading-relaxed transition-all duration-300 ${good ? "bg-green-500/8 border-green-500/25 text-green-700 dark:text-green-300" : "bg-red-500/8 border-red-500/25 text-red-600 dark:text-red-400"}`}>
        {msg}
      </div>

      <button onClick={onStop} className="w-full py-3 rounded-2xl bg-destructive/10 border border-destructive/30 text-destructive text-sm font-semibold hover:bg-destructive/20 transition-all flex items-center justify-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>
        End Session
      </button>

      <style jsx>{`@keyframes pop{0%{transform:scale(1.6);opacity:.5}100%{transform:scale(1);opacity:1}}`}</style>
    </div>
  );
}
