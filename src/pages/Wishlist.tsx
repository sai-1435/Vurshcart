import { useEffect, useState } from "react";
import { ShopLayout } from "@/components/ShopLayout";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { ProductCard } from "@/components/ProductCard";
import { Heart } from "lucide-react";

export default function Wishlist() {
  const { user } = useAuth();
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    supabase.from("wishlists").select("product:products(*)").eq("user_id", user.id)
      .then(({ data }) => setProducts((data ?? []).map((w: any) => w.product).filter(Boolean)));
  }, [user]);

  return (
    <ShopLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
        {products.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-2xl border border-border">
            <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-3"/>
            <p className="text-muted-foreground">No saved items yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((p, i) => <ProductCard key={p.id} product={p} index={i}/>)}
          </div>
        )}
      </div>
    </ShopLayout>
  );
}
