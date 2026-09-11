import { Link } from "@tanstack/react-router";
import { LayoutDashboard, Mail, NotebookPen, CalendarClock, Menu, Sparkles } from "lucide-react";
import { useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const NAV = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/email-generator", label: "Email Generator", icon: Mail },
  { to: "/meeting-summarizer", label: "Meeting Summarizer", icon: NotebookPen },
  { to: "/task-planner", label: "Task Planner", icon: CalendarClock },
] as const;

function Brand() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
        <Sparkles className="size-4.5" aria-hidden="true" />
      </span>
      <span className="flex flex-col leading-tight">
        <span className="font-display text-base font-semibold">WorkMate AI</span>
        <span className="text-xs text-muted-foreground">Productivity Assistant</span>
      </span>
    </div>
  );
}

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-1" aria-label="Main">
      {NAV.map(({ to, label, icon: Icon }) => (
        <Link
          key={to}
          to={to}
          onClick={onNavigate}
          activeOptions={{ exact: to === "/" }}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          activeProps={{
            className: "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground shadow-sm",
          }}
        >
          <Icon className="size-4.5 shrink-0" aria-hidden="true" />
          {label}
        </Link>
      ))}
    </nav>
  );
}

function SidebarFooterNote() {
  return (
    <p className="rounded-xl bg-secondary/70 p-3 text-xs leading-relaxed text-muted-foreground">
      Review every AI output before professional use. Never enter confidential or personal
      information.
    </p>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col justify-between gap-6 border-r border-sidebar-border bg-sidebar p-5 backdrop-blur-xl lg:flex">
        <div className="flex flex-col gap-8">
          <Brand />
          <NavLinks />
        </div>
        <SidebarFooterNote />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-sidebar-border bg-sidebar px-4 py-3 backdrop-blur-xl lg:hidden">
          <Brand />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open navigation">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 bg-sidebar p-5 backdrop-blur-xl">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <div className="flex h-full flex-col justify-between gap-8">
                <div className="flex flex-col gap-8">
                  <Brand />
                  <NavLinks onNavigate={() => setOpen(false)} />
                </div>
                <SidebarFooterNote />
              </div>
            </SheetContent>
          </Sheet>
        </header>

        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
          {children}
        </main>
      </div>
    </div>
  );
}

export function PageHeader({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <header className="mb-8 flex items-start gap-4">
      <span className="hidden size-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-accent-foreground sm:flex">
        <Icon className="size-6" />
      </span>
      <div>
        <h1 className="text-2xl font-semibold sm:text-3xl">{title}</h1>
        <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground sm:text-base">{description}</p>
      </div>
    </header>
  );
}
