import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Ticket,
  Database,
  Shield,
  PackageCheck,
  HardDrive,
  Boxes,
  AppWindow,
  FileText,
  Settings,
  ChevronLeft,
} from "lucide-react";
import { TenantSelector } from "./TenantSelector";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const menuItems = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Tickets", path: "/tickets", icon: Ticket },
  { name: "Inventaire", path: "/inventory", icon: Database },
  { name: "Sécurité", path: "/security", icon: Shield },
  { name: "Patchs", path: "/patches", icon: PackageCheck },
  { name: "Backups", path: "/backups", icon: HardDrive },
  { name: "Services", path: "/services", icon: Boxes },
  { name: "Applications", path: "/applications", icon: AppWindow },
  { name: "Docs", path: "/docs", icon: FileText },
  { name: "Administration", path: "/admin", icon: Settings },
];

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 z-40",
        collapsed ? "w-16" : "w-72"
      )}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">MSP</span>
              </div>
              <span className="font-semibold text-sidebar-foreground">Portal</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="h-8 w-8"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
          </Button>
        </div>

        {/* Tenant Selector */}
        {!collapsed && <TenantSelector />}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-2">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === "/"}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground",
                      collapsed && "justify-center"
                    )
                  }
                  title={collapsed ? item.name : undefined}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  {!collapsed && <span>{item.name}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
