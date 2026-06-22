import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShopLayout } from "@/components/ShopLayout";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { formatINR } from "@/lib/format";
import { Package } from "lucide-react";

const statusColor: Record<string, string> = {
  pending: "bg-warning/10 text-warning",
  shipped: "bg-info/10 text-info",
  delivered: "bg-success/10 text-success",
  cancelled: "bg-destructive/10 text-destructive",
};

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    supabase.from("orders").select("*").eq("user_id", user.id).order("created_at", { ascending: false })
      .then(({ data }) => setOrders(data ?? []));
  }, [user]);

  return (
    <ShopLayout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">My Orders</h1>
        {orders.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-2xl border border-border">
            <Package className="h-16 w-16 mx-auto text-muted-foreground mb-3"/>
            <p className="text-muted-foreground">No orders yet.</p>
            <Link to="/shop" className="text-primary mt-2 inline-block">Start shopping →</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map(o => (
              <Link key={o.id} to={`/orders/${o.id}`} className="block bg-card border border-border rounded-xl p-5 hover:border-primary/40 transition-colors">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold">{o.order_number}</p>
                    <p className="text-xs text-muted-foreground">{new Date(o.created_at).toLocaleDateString()}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusColor[o.status] ?? "bg-secondary"}`}>{o.status}</span>
                  <div className="text-right">
                    <p className="font-bold">{formatINR(o.total)}</p>
                    <p className="text-xs text-muted-foreground capitalize">{o.payment_method}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </ShopLayout>
  );
}
