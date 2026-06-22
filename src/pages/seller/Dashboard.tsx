import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SellerLayout } from "@/components/SellerLayout";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { formatINR } from "@/lib/format";
import { Package, ShoppingBag, DollarSign, TrendingUp, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function SellerDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ products: 0, orders: 0, revenue: 0, pending: 0 });
  const [recent, setRecent] = useState<any[]>([]);
  const [chart, setChart] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const [{ count: pc }, { data: items }] = await Promise.all([
        supabase.from("products").select("*", { count: "exact", head: true }).eq("seller_id", user.id),
        supabase.from("order_items").select("*, order:orders(status, created_at)").eq("seller_id", user.id).order("created_at", { ascending: false }),
      ]);
      const revenue = (items ?? []).reduce((s: number, i: any) => s + Number(i.price) * i.quantity, 0);
      const orderIds = new Set((items ?? []).map((i: any) => i.order_id));
      const pending = (items ?? []).filter((i: any) => i.order?.status === "pending").length;
      setStats({ products: pc ?? 0, orders: orderIds.size, revenue, pending });
      setRecent((items ?? []).slice(0, 5));

      // last 7 days
      const days: Record<string, number> = {};
      for (let i = 6; i >= 0; i--) {
        const d = new Date(); d.setDate(d.getDate() - i);
        days[d.toLocaleDateString("en-IN", { weekday: "short" })] = 0;
      }
      (items ?? []).forEach((it: any) => {
        const d = new Date(it.order?.created_at ?? it.created_at);
        const diff = (Date.now() - d.getTime()) / 86400000;
        if (diff < 7) {
          const k = d.toLocaleDateString("en-IN", { weekday: "short" });
          days[k] = (days[k] ?? 0) + Number(it.price) * it.quantity;
        }
      });
      setChart(Object.entries(days).map(([day, revenue]) => ({ day, revenue })));
    })();
  }, [user]);

  const cards = [
    { label: "Revenue", value: formatINR(stats.revenue), icon: DollarSign, color: "text-success" },
    { label: "Orders", value: stats.orders, icon: ShoppingBag, color: "text-primary" },
    { label: "Products", value: stats.products, icon: Package, color: "text-info" },
    { label: "Pending", value: stats.pending, icon: TrendingUp, color: "text-warning" },
  ];

  return (
    <SellerLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Welcome to your store</p>
        </div>
        <Link to="/seller/products/new"><Button className="bg-gradient-hero text-white border-0"><Plus className="h-4 w-4 mr-1"/>Add Product</Button></Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {cards.map(c => (
          <div key={c.label} className="bg-card border border-border rounded-xl p-5">
            <c.icon className={`h-5 w-5 ${c.color}`}/>
            <p className="text-xs text-muted-foreground mt-3">{c.label}</p>
            <p className="text-2xl font-bold mt-1">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-5">
          <h3 className="font-semibold mb-4">Revenue (last 7 days)</h3>
          <div className="h-64">
            <ResponsiveContainer>
              <LineChart data={chart}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12}/>
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12}/>
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }}/>
                <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: "hsl(var(--primary))" }}/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-semibold mb-4">Recent Sales</h3>
          {recent.length === 0 ? <p className="text-sm text-muted-foreground">No sales yet.</p> : (
            <div className="space-y-3">
              {recent.map(r => (
                <div key={r.id} className="flex items-center gap-2">
                  {r.image_url && <img src={r.image_url} alt="" className="h-9 w-9 rounded object-cover bg-secondary"/>}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{r.title}</p>
                    <p className="text-xs text-muted-foreground">Qty {r.quantity}</p>
                  </div>
                  <p className="text-sm font-semibold">{formatINR(Number(r.price) * r.quantity)}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </SellerLayout>
  );
}
