import { SidebarProvider, Sidebar, SidebarInset, SidebarTrigger, SidebarHeader, SidebarContent, SidebarFooter } from "@/components/ui/sidebar";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar className="border-r border-border/50">
        <SidebarHeader className="border-b border-border/50 p-4">
          <div className="flex items-center gap-3">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary"><path d="M12 22c-5 0-9-4.5-9-10 0-5.5 4-10 9-10s9 4.5 9 10c0 5.5-4 10-9 10z"></path><path d="M12 2a5 5 0 0 0-5 5c0 1.4.5 2.8 1.5 3.8A5 5 0 0 0 12 13a5 5 0 0 0 3.5-1.2c1-1 1.5-2.4 1.5-3.8A5 5 0 0 0 12 2z"></path></svg>
            <div className="duration-200 group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:-ml-8">
              <p className="font-headline font-semibold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">FitVit</p>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent className="py-2">
          <SidebarNav />
        </SidebarContent>
        <SidebarFooter className="border-t border-border/50 p-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="https://placehold.co/40x40.png" alt="User" data-ai-hint="person avatar" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="duration-200 group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:-ml-8 flex-1">
              <p className="font-semibold text-sm">User</p>
              <p className="text-xs text-muted-foreground">user@example.com</p>
            </div>
            <Button variant="ghost" size="icon" className="group-data-[collapsible=icon]:opacity-0 text-muted-foreground hover:text-foreground">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="bg-background">
        <header className="flex h-14 items-center justify-between border-b border-border/50 bg-background/50 backdrop-blur-sm px-4 sm:px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
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
