import { Link, useLocation, useNavigate } from "react-router-dom";
import { Logo } from "./Logo";
import { LayoutDashboard, Package, ShoppingBag, Store as StoreIcon, BarChart3, LogOut, ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

const links = [
  { to: "/seller", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/seller/products", label: "Products", icon: Package },
  { to: "/seller/orders", label: "Orders", icon: ShoppingBag },
  { to: "/seller/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/seller/store", label: "Store", icon: StoreIcon },
];

export function SellerLayout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { signOut, profile } = useAuth();

  return (
    <div className="min-h-screen flex bg-secondary/30">
      <aside className="hidden md:flex w-60 flex-col bg-card border-r border-border sticky top-0 h-screen">
        <div className="h-16 px-4 flex items-center border-b border-border">
          <Link to="/seller"><Logo /></Link>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {links.map(l => {
            const active = l.end ? pathname === l.to : pathname.startsWith(l.to);
            return (
              <Link key={l.to} to={l.to}
                className={cn("flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                  active ? "bg-primary text-primary-foreground font-medium" : "text-muted-foreground hover:bg-accent hover:text-foreground")}>
                <l.icon className="h-4 w-4" />{l.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-border space-y-1">
          <button onClick={() => navigate("/")} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-accent">
            <ArrowLeft className="h-4 w-4" /> Back to shop
          </button>
          <button onClick={signOut} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-accent">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
          <div className="px-3 pt-2 text-xs text-muted-foreground truncate">{profile?.full_name}</div>
        </div>
      </aside>
      <div className="flex-1 min-w-0">
        <header className="md:hidden h-14 px-4 flex items-center justify-between bg-card border-b border-border sticky top-0 z-30">
          <Link to="/seller"><Logo /></Link>
          <button onClick={() => navigate("/")} className="text-sm text-muted-foreground">Shop</button>
        </header>
        <div className="md:hidden flex overflow-x-auto gap-1 px-3 py-2 bg-card border-b border-border hide-scrollbar">
          {links.map(l => {
            const active = l.end ? pathname === l.to : pathname.startsWith(l.to);
            return (
              <Link key={l.to} to={l.to}
                className={cn("px-3 py-1.5 rounded-md text-xs whitespace-nowrap",
                  active ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground")}>
                {l.label}
              </Link>
            );
          })}
        </div>
        <main className="p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
