import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ShopLayout } from "@/components/ShopLayout";
import { ProductCard, type Product } from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function Category() {
  const { slug } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data: cat } = await supabase.from("categories").select("id,name").eq("slug", slug!).maybeSingle();
      if (cat) {
        setName(cat.name);
        const { data } = await supabase.from("products").select("*").eq("category_id", cat.id).eq("status", "active");
        setProducts((data ?? []) as any);
      }
      setLoading(false);
    })();
  }, [slug]);

  return (
    <ShopLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-1">{name || "Category"}</h1>
        <p className="text-muted-foreground mb-6">{products.length} products</p>
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{[...Array(8)].map((_, i) => <Skeleton key={i} className="aspect-[3/4] rounded-xl" />)}</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        )}
      </div>
    </ShopLayout>
  );
}
