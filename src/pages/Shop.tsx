import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ShopLayout } from "@/components/ShopLayout";
import { ProductCard, type Product } from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") ?? "";
  const sort = params.get("sort") ?? "newest";
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let query = supabase.from("products").select("*").eq("status", "active");
    if (q) query = query.ilike("title", `%${q}%`);
    if (sort === "price-asc") query = query.order("price", { ascending: true });
    else if (sort === "price-desc") query = query.order("price", { ascending: false });
    else if (sort === "rating") query = query.order("rating", { ascending: false });
    else query = query.order("created_at", { ascending: false });
    query.limit(48).then(({ data }) => { setProducts((data ?? []) as any); setLoading(false); });
  }, [q, sort]);

  return (
    <ShopLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between mb-6">
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setParams({ q: e.target.value, sort })}
              placeholder="Search products..."
              className="pl-9 bg-card"
            />
          </div>
          <Select value={sort} onValueChange={(v) => setParams({ q, sort: v })}>
            <SelectTrigger className="w-full sm:w-44"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="rating">Top Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => <Skeleton key={i} className="aspect-[3/4] rounded-xl" />)}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No products yet. Be the first seller!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        )}
      </div>
    </ShopLayout>
  );
}
