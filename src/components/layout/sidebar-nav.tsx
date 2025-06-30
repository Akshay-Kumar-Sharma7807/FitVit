"use client";

import { usePathname } from "next/navigation";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  HeartPulse,
  Leaf,
  Users,
  CalendarDays,
  CircleUser,
} from "lucide-react";
import Link from "next/link";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/workout", label: "Workout Plan", icon: HeartPulse },
  { href: "/dashboard/diet", label: "Diet Guide", icon: Leaf },
  { href: "/dashboard/community", label: "Community", icon: Users },
  { href: "/dashboard/progress", label: "Progress", icon: CalendarDays },
  { href: "/dashboard/profile", label: "Profile", icon: CircleUser },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {links.map((link) => (
        <SidebarMenuItem key={link.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname === link.href}
            tooltip={link.label}
          >
            <Link href={link.href}>
              <link.icon className="h-5 w-5" />
              <span>{link.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
