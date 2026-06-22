import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ShopLayout } from "@/components/ShopLayout";
import { supabase } from "@/integrations/supabase/client";
import { formatINR } from "@/lib/format";
import { Skeleton } from "@/components/ui/skeleton";

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [{ data: o }, { data: oi }] = await Promise.all([
        supabase.from("orders").select("*").eq("id", id!).maybeSingle(),
        supabase.from("order_items").select("*").eq("order_id", id!),
      ]);
      setOrder(o); setItems(oi ?? []); setLoading(false);
    })();
  }, [id]);

  if (loading) return <ShopLayout><div className="container mx-auto px-4 py-8 max-w-3xl space-y-4"><Skeleton className="h-24"/><Skeleton className="h-64"/></div></ShopLayout>;
  if (!order) return <ShopLayout><div className="container mx-auto px-4 py-20 text-center">Order not found.</div></ShopLayout>;

  const addr = order.shipping_address as any;

  return (
    <ShopLayout>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Link to="/orders" className="text-sm text-muted-foreground">← Back to orders</Link>
        <div className="mt-3 flex items-center justify-between flex-wrap gap-3">
          <h1 className="text-2xl font-bold">Order {order.order_number}</h1>
          <span className="px-3 py-1 rounded-full bg-secondary text-sm capitalize">{order.status}</span>
        </div>
        <p className="text-sm text-muted-foreground">Placed {new Date(order.created_at).toLocaleString()}</p>

        <section className="mt-6 bg-card border border-border rounded-xl p-5">
          <h2 className="font-semibold mb-3">Items</h2>
          <div className="space-y-3">
            {items.map(it => (
              <div key={it.id} className="flex gap-3 items-center">
                {it.image_url && <img src={it.image_url} alt="" className="h-16 w-16 object-cover rounded-lg bg-secondary"/>}
                <div className="flex-1 min-w-0">
                  <p className="font-medium line-clamp-1">{it.title}</p>
                  <p className="text-sm text-muted-foreground">Qty {it.quantity} · {formatINR(it.price)}</p>
                </div>
                <div className="font-semibold">{formatINR(Number(it.price) * it.quantity)}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <section className="bg-card border border-border rounded-xl p-5">
            <h2 className="font-semibold mb-2">Shipping</h2>
            <p className="text-sm">{addr?.full_name}<br/>{addr?.line1}{addr?.line2 ? `, ${addr.line2}` : ""}<br/>{addr?.city}, {addr?.state} {addr?.pincode}<br/>{addr?.country}<br/>{addr?.phone}</p>
          </section>
          <section className="bg-card border border-border rounded-xl p-5 space-y-1.5 text-sm">
            <h2 className="font-semibold mb-2">Payment</h2>
            <div className="flex justify-between"><span className="text-muted-foreground">Method</span><span className="capitalize">{order.payment_method}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Status</span><span className="capitalize">{order.payment_status}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatINR(order.subtotal)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{formatINR(order.shipping)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Tax</span><span>{formatINR(order.tax)}</span></div>
            <div className="border-t pt-2 flex justify-between font-bold"><span>Total</span><span>{formatINR(order.total)}</span></div>
          </section>
        </div>
      </div>
    </ShopLayout>
  );
}
