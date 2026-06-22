import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShopLayout } from "@/components/ShopLayout";
import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatINR } from "@/lib/format";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function Checkout() {
  const { items, subtotal, clear } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    full_name: "", phone: "", line1: "", line2: "", city: "", state: "", pincode: "", country: "India",
  });
  const [payment, setPayment] = useState("cod");

  useEffect(() => {
    if (!user) return;
    supabase.from("addresses").select("*").eq("user_id", user.id).eq("is_default", true).maybeSingle()
      .then(({ data }) => { if (data) setForm(data as any); });
  }, [user]);

  if (items.length === 0) return (
    <ShopLayout><div className="container mx-auto px-4 py-20 text-center">
      <p>Your cart is empty.</p>
      <Button onClick={() => navigate("/shop")} className="mt-4 bg-gradient-hero text-white border-0">Shop now</Button>
    </div></ShopLayout>
  );

  const shipping = subtotal > 500 ? 0 : 49;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + shipping + tax;

  const place = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    try {
      const { data: order, error } = await supabase.from("orders").insert({
        user_id: user.id, subtotal, shipping, tax, total,
        payment_method: payment, payment_status: "pending", status: "pending",
        shipping_address: form as any,
      }).select().single();
      if (error) throw error;

      const orderItems = items.map(i => ({
        order_id: order.id,
        product_id: i.product_id,
        seller_id: i.product.seller_id,
        title: i.product.title,
        image_url: Array.isArray(i.product.images) ? i.product.images[0] : null,
        price: i.product.price,
        quantity: i.quantity,
      }));
      const { error: e2 } = await supabase.from("order_items").insert(orderItems);
      if (e2) throw e2;

      await clear();
      toast.success(`Order placed! ${order.order_number}`);
      navigate(`/orders/${order.id}`);
    } catch (e: any) { toast.error(e.message); }
    setLoading(false);
  };

  return (
    <ShopLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <form onSubmit={place} className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-card border border-border rounded-xl p-5">
              <h2 className="font-semibold mb-4">Shipping Address</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2"><Label>Full name</Label><Input required value={form.full_name} onChange={e => setForm({ ...form, full_name: e.target.value })}/></div>
                <div><Label>Phone</Label><Input required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}/></div>
                <div><Label>Pincode</Label><Input required value={form.pincode} onChange={e => setForm({ ...form, pincode: e.target.value })}/></div>
                <div className="sm:col-span-2"><Label>Address line 1</Label><Input required value={form.line1} onChange={e => setForm({ ...form, line1: e.target.value })}/></div>
                <div className="sm:col-span-2"><Label>Address line 2</Label><Input value={form.line2 || ""} onChange={e => setForm({ ...form, line2: e.target.value })}/></div>
                <div><Label>City</Label><Input required value={form.city} onChange={e => setForm({ ...form, city: e.target.value })}/></div>
                <div><Label>State</Label><Input required value={form.state} onChange={e => setForm({ ...form, state: e.target.value })}/></div>
              </div>
            </section>
            <section className="bg-card border border-border rounded-xl p-5">
              <h2 className="font-semibold mb-4">Payment Method</h2>
              <div className="space-y-2">
                {[
                  { v: "cod", l: "Cash on Delivery" },
                  { v: "upi", l: "VrushPay / UPI (mock)" },
                  { v: "card", l: "Credit / Debit Card (mock)" },
                ].map(o => (
                  <label key={o.v} className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-secondary">
                    <input type="radio" name="pay" value={o.v} checked={payment === o.v} onChange={() => setPayment(o.v)} />
                    <span>{o.l}</span>
                  </label>
                ))}
              </div>
            </section>
          </div>
          <aside className="lg:sticky lg:top-24 h-fit bg-card border border-border rounded-xl p-5 space-y-3">
            <h3 className="font-semibold">Summary</h3>
            <div className="space-y-1 text-sm">
              {items.map(i => (
                <div key={i.id} className="flex justify-between gap-2">
                  <span className="truncate text-muted-foreground">{i.product?.title} × {i.quantity}</span>
                  <span>{formatINR(Number(i.product?.price) * i.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-2 space-y-1 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatINR(subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? "FREE" : formatINR(shipping)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Tax (5%)</span><span>{formatINR(tax)}</span></div>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold text-lg"><span>Total</span><span>{formatINR(total)}</span></div>
            <Button type="submit" className="w-full bg-gradient-hero text-white border-0" disabled={loading}>
              {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin"/>}
              Place Order
            </Button>
          </aside>
        </form>
      </div>
    </ShopLayout>
  );
}
