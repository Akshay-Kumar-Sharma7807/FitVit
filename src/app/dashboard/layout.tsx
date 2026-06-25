"use client";

import { SidebarProvider, Sidebar, SidebarInset, SidebarTrigger, SidebarHeader, SidebarContent, SidebarFooter, useSidebar } from "@/components/ui/sidebar";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useSession, signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

function HeaderLogo() {
  const { open, isMobile } = useSidebar();

  if (open && !isMobile) return null;

  return (
    <div className="flex items-center gap-2 transition-all duration-300">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary"><path d="M12 22c-5 0-9-4.5-9-10 0-5.5 4-10 9-10s9 4.5 9 10c0 5.5-4 10-9 10z"></path><path d="M12 2a5 5 0 0 0-5 5c0 1.4.5 2.8 1.5 3.8A5 5 0 0 0 12 13a5 5 0 0 0 3.5-1.2c1-1 1.5-2.4 1.5-3.8A5 5 0 0 0 12 2z"></path></svg>
      <span className="font-headline font-semibold text-base bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">FitVit</span>
    </div>
  );
}

function SidebarUserFooter() {
  const { data: session } = useSession();
  const user = session?.user;

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
      <Avatar className="h-8 w-8">
        <AvatarImage src={user?.image ?? ""} alt={user?.name ?? "User"} />
        <AvatarFallback className="bg-primary/20 text-primary text-xs font-bold">
          {initials}
        </AvatarFallback>
      </Avatar>
      <div className="duration-200 group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:-ml-8 flex-1 min-w-0">
        <p className="font-semibold text-sm truncate">{user?.name ?? "User"}</p>
        <p className="text-xs text-muted-foreground truncate">{user?.email ?? ""}</p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="group-data-[collapsible=icon]:opacity-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all shrink-0"
        title="Sign out"
      >
        <LogOut className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar className="border-r border-border/50">
        <SidebarHeader className="border-b border-border/50 px-6 py-4 group-data-[collapsible=icon]:px-2">
          <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary"><path d="M12 22c-5 0-9-4.5-9-10 0-5.5 4-10 9-10s9 4.5 9 10c0 5.5-4 10-9 10z"></path><path d="M12 2a5 5 0 0 0-5 5c0 1.4.5 2.8 1.5 3.8A5 5 0 0 0 12 13a5 5 0 0 0 3.5-1.2c1-1 1.5-2.4 1.5-3.8A5 5 0 0 0 12 2z"></path></svg>
            <div className="duration-200 group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:-ml-8">
              <p className="font-headline font-semibold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">FitVit</p>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent className="py-2">
          <SidebarNav />
        </SidebarContent>
        <SidebarFooter className="border-t border-border/50 px-6 py-4 group-data-[collapsible=icon]:px-2">
          <SidebarUserFooter />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="bg-background">
        <header className="flex h-14 items-center justify-between border-b border-border/50 bg-background/50 backdrop-blur-sm px-4 sm:px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
              <HeaderLogo />
            </div>
            <ThemeToggle />
        </header>
        <main className="flex-1 overflow-auto p-4 sm:p-6 transition-all duration-300">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
