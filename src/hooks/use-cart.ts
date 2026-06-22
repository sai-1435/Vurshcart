import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  product: {
    id: string;
    title: string;
    slug: string;
    price: number;
    images: any;
    stock: number;
    seller_id: string;
  };
}

export function useCart() {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (!user) { setItems([]); return; }
    setLoading(true);
    const { data } = await supabase
      .from("cart_items")
      .select("id, product_id, quantity, product:products(id,title,slug,price,images,stock,seller_id)")
      .eq("user_id", user.id);
    setItems((data ?? []) as any);
    setLoading(false);
  }, [user]);

  useEffect(() => { load(); }, [load]);

  const add = async (productId: string, qty = 1) => {
    if (!user) { toast.error("Please sign in to add items"); return; }
    const existing = items.find(i => i.product_id === productId);
    if (existing) {
      await supabase.from("cart_items").update({ quantity: existing.quantity + qty }).eq("id", existing.id);
    } else {
      await supabase.from("cart_items").insert({ user_id: user.id, product_id: productId, quantity: qty });
    }
    toast.success("Added to cart");
    load();
  };

  const update = async (id: string, qty: number) => {
    if (qty < 1) return remove(id);
    await supabase.from("cart_items").update({ quantity: qty }).eq("id", id);
    load();
  };

  const remove = async (id: string) => {
    await supabase.from("cart_items").delete().eq("id", id);
    load();
  };

  const clear = async () => {
    if (!user) return;
    await supabase.from("cart_items").delete().eq("user_id", user.id);
    setItems([]);
  };

  const subtotal = items.reduce((s, i) => s + Number(i.product?.price ?? 0) * i.quantity, 0);
  const count = items.reduce((s, i) => s + i.quantity, 0);

  return { items, loading, add, update, remove, clear, subtotal, count, reload: load };
}
