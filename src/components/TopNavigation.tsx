import { NavLink } from "react-router-dom";
import { Bot, LayoutDashboard, Search, Calendar, GraduationCap, FileText, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

export function TopNavigation() {
  const navigationItems = [
    { name: "AI Assistant", href: "/", icon: Bot },
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Course Explorer", href: "/courses", icon: Search },
    { name: "Academic Planner", href: "/planner", icon: Calendar },
    { name: "Degree Audit", href: "/audit", icon: GraduationCap },
    { name: "Transcript", href: "/transcript", icon: FileText },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <nav className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
                <Bot className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-medium text-primary">Boiler</span>
              <span className="text-lg font-medium text-foreground">AI</span>
            </div>
            <div className="hidden md:flex md:space-x-6">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  end={item.href === "/"}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center space-x-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-refined",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )
                  }
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-muted-foreground">Alex Johnson</span>
            <div className="h-7 w-7 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-xs font-medium text-primary">AJ</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}