import { useEffect, useState } from "react";
import { SellerLayout } from "@/components/SellerLayout";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { formatINR } from "@/lib/format";
import { ShoppingBag } from "lucide-react";

export default function SellerOrders() {
  const { user } = useAuth();
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    supabase.from("order_items").select("*, order:orders(order_number, status, created_at, shipping_address)").eq("seller_id", user.id).order("created_at", { ascending: false })
      .then(({ data }) => setItems(data ?? []));
  }, [user]);

  return (
    <SellerLayout>
      <h1 className="text-2xl font-bold mb-6">Orders</h1>
      {items.length === 0 ? (
        <div className="text-center py-16 bg-card rounded-2xl border border-border">
          <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-3"/>
          <p className="text-muted-foreground">No orders yet.</p>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-secondary text-xs uppercase text-muted-foreground">
              <tr><th className="text-left p-3">Order</th><th className="text-left p-3">Product</th><th className="text-left p-3 hidden sm:table-cell">Qty</th><th className="text-left p-3">Total</th><th className="text-left p-3">Status</th><th className="text-left p-3 hidden md:table-cell">Date</th></tr>
            </thead>
            <tbody>
              {items.map(i => (
                <tr key={i.id} className="border-t border-border">
                  <td className="p-3 font-mono text-xs">{i.order?.order_number}</td>
                  <td className="p-3"><span className="font-medium line-clamp-1">{i.title}</span></td>
                  <td className="p-3 hidden sm:table-cell">{i.quantity}</td>
                  <td className="p-3 font-semibold">{formatINR(Number(i.price) * i.quantity)}</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded-full text-xs bg-secondary capitalize">{i.order?.status}</span></td>
                  <td className="p-3 hidden md:table-cell text-muted-foreground">{new Date(i.order?.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </SellerLayout>
  );
}
