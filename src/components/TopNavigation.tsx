import { NavLink } from "react-router-dom";
import { Bot, LayoutDashboard, Search, Calendar, GraduationCap, FileText, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

export function TopNavigation() {
  const navigationItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "AI Assistant", href: "/ai-assistant", icon: Bot },
    { name: "Course Explorer", href: "/courses", icon: Search },
    { name: "Academic Planner", href: "/planner", icon: Calendar },
    { name: "Degree Audit", href: "/audit", icon: GraduationCap },
    { name: "Transcript", href: "/transcript", icon: FileText },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <nav className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Bot className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-xl font-semibold text-primary">Boiler</span>
                <span className="text-xl font-semibold text-foreground">AI</span>
              </div>
            </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  end={item.href === "/"}
                  className={({ isActive }) =>
                    cn(
                      "inline-flex items-center space-x-2 px-1 pt-1 text-sm font-medium border-b-2 transition-refined",
                      isActive
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
                    )
                  }
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="flex items-center space-x-3">
              <div className="text-sm text-muted-foreground">
                Welcome back, <span className="font-medium text-foreground">Alex Johnson</span>
              </div>
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                <span className="text-sm font-medium text-foreground">AJ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}