import { Link, useNavigate } from "react-router-dom";
import { ShopLayout } from "@/components/ShopLayout";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { formatINR, productImage } from "@/lib/format";
import { Trash2, ShoppingBag } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function Cart() {
  const { items, update, remove, subtotal, loading } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const shipping = subtotal > 500 || subtotal === 0 ? 0 : 49;
  const total = subtotal + shipping;

  if (!user) return (
    <ShopLayout><div className="container mx-auto px-4 py-20 text-center">
      <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4"/>
      <h2 className="text-2xl font-bold">Sign in to view your cart</h2>
      <Link to="/auth"><Button className="mt-4 bg-gradient-hero text-white border-0">Sign in</Button></Link>
    </div></ShopLayout>
  );

  return (
    <ShopLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Your Cart ({items.length})</h1>
        {loading ? <p className="text-muted-foreground">Loading...</p> : items.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-2xl border border-border">
            <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4"/>
            <p className="text-muted-foreground">Your cart is empty.</p>
            <Link to="/shop"><Button className="mt-4 bg-gradient-hero text-white border-0">Continue shopping</Button></Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-3">
              {items.map(item => (
                <div key={item.id} className="flex gap-4 p-4 bg-card border border-border rounded-xl">
                  <Link to={`/product/${item.product?.slug}`} className="flex-shrink-0">
                    <img src={productImage(item.product?.images)} alt={item.product?.title} className="h-24 w-24 object-cover rounded-lg bg-secondary" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${item.product?.slug}`} className="font-medium line-clamp-2 hover:text-primary">{item.product?.title}</Link>
                    <p className="text-sm font-semibold mt-1">{formatINR(item.product?.price)}</p>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex items-center border border-border rounded-lg">
                        <button onClick={() => update(item.id, item.quantity - 1)} className="px-3 py-1 hover:bg-secondary">−</button>
                        <span className="px-3 text-sm font-medium">{item.quantity}</span>
                        <button onClick={() => update(item.id, item.quantity + 1)} className="px-3 py-1 hover:bg-secondary">+</button>
                      </div>
                      <button onClick={() => remove(item.id)} className="text-sm text-muted-foreground hover:text-destructive flex items-center gap-1"><Trash2 className="h-3.5 w-3.5"/> Remove</button>
                    </div>
                  </div>
                  <div className="text-right font-semibold">{formatINR(Number(item.product?.price ?? 0) * item.quantity)}</div>
                </div>
              ))}
            </div>
            <aside className="lg:sticky lg:top-24 h-fit bg-card border border-border rounded-xl p-5 space-y-3">
              <h3 className="font-semibold">Order Summary</h3>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Subtotal</span><span>{formatINR(subtotal)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? "FREE" : formatINR(shipping)}</span></div>
              <div className="border-t pt-3 flex justify-between font-semibold"><span>Total</span><span>{formatINR(total)}</span></div>
              <Button className="w-full bg-gradient-hero text-white border-0" onClick={() => navigate("/checkout")}>Proceed to Checkout</Button>
              <p className="text-xs text-muted-foreground text-center">Free shipping over ₹500</p>
            </aside>
          </div>
        )}
      </div>
    </ShopLayout>
  );
}
