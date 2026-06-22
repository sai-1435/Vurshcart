import { useEffect, useState } from "react";
import { SellerLayout } from "@/components/SellerLayout";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { formatINR } from "@/lib/format";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend } from "recharts";

const COLORS = ["hsl(217 91% 60%)", "hsl(262 83% 65%)", "hsl(142 71% 45%)", "hsl(38 92% 50%)", "hsl(0 84% 60%)"];

export default function SellerAnalytics() {
  const { user } = useAuth();
  const [byProduct, setByProduct] = useState<any[]>([]);
  const [byMonth, setByMonth] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    supabase.from("order_items").select("title, price, quantity, created_at").eq("seller_id", user.id).then(({ data }) => {
      const items = data ?? [];
      const prod: Record<string, number> = {};
      const mon: Record<string, number> = {};
      items.forEach((i: any) => {
        const r = Number(i.price) * i.quantity;
        prod[i.title] = (prod[i.title] ?? 0) + r;
        const k = new Date(i.created_at).toLocaleDateString("en-IN", { month: "short" });
        mon[k] = (mon[k] ?? 0) + r;
      });
      setByProduct(Object.entries(prod).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([name, value]) => ({ name, value })));
      setByMonth(Object.entries(mon).map(([month, revenue]) => ({ month, revenue })));
    });
  }, [user]);

  return (
    <SellerLayout>
      <h1 className="text-2xl font-bold mb-6">Analytics</h1>
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-semibold mb-4">Revenue by month</h3>
          <div className="h-72">
            <ResponsiveContainer>
              <BarChart data={byMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))"/>
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12}/>
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12}/>
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} formatter={(v: any) => formatINR(v)}/>
                <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-semibold mb-4">Top products</h3>
          <div className="h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={byProduct} dataKey="value" nameKey="name" outerRadius={90} label>
                  {byProduct.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]}/>)}
                </Pie>
                <Tooltip formatter={(v: any) => formatINR(v)}/>
                <Legend wrapperStyle={{ fontSize: 12 }}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </SellerLayout>
  );
}
