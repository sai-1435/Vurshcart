import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { ShopLayout } from "@/components/ShopLayout";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductCard } from "@/components/ProductCard";
import { Heart, Truck, Shield, RotateCcw, Star, ShoppingCart } from "lucide-react";
import { formatINR, productImage } from "@/lib/format";
import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export default function ProductDetail() {
  const { slug } = useParams();
  const { add } = useCart();
  const { user } = useAuth();
  const [product, setProduct] = useState<any>(null);
  const [seller, setSeller] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [related, setRelated] = useState<any[]>([]);
  const [imgIdx, setImgIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data: p } = await supabase.from("products").select("*").eq("slug", slug!).maybeSingle();
      if (!p) { setLoading(false); return; }
      setProduct(p);
      const [{ data: sp }, { data: rv }, { data: rel }] = await Promise.all([
        supabase.from("seller_profiles").select("*").eq("user_id", p.seller_id).maybeSingle(),
        supabase.from("reviews").select("*").eq("product_id", p.id).order("created_at", { ascending: false }).limit(10),
        supabase.from("products").select("*").eq("category_id", p.category_id).neq("id", p.id).eq("status", "active").limit(4),
      ]);
      setSeller(sp); setReviews(rv ?? []); setRelated(rel ?? []);
      setLoading(false);
    })();
  }, [slug]);

  if (loading) return <ShopLayout><div className="container mx-auto px-4 py-8 grid md:grid-cols-2 gap-8"><Skeleton className="aspect-square rounded-2xl"/><div className="space-y-4"><Skeleton className="h-8 w-3/4"/><Skeleton className="h-6 w-1/3"/><Skeleton className="h-24 w-full"/></div></div></ShopLayout>;
  if (!product) return <ShopLayout><div className="container mx-auto px-4 py-20 text-center"><p className="text-muted-foreground">Product not found.</p></div></ShopLayout>;

  const images: string[] = Array.isArray(product.images) && product.images.length ? product.images : [productImage(null)];
  const discount = product.compare_price && Number(product.compare_price) > Number(product.price)
    ? Math.round(((Number(product.compare_price) - Number(product.price)) / Number(product.compare_price)) * 100) : 0;

  const onWish = async () => {
    if (!user) { toast.error("Sign in first"); return; }
    const { error } = await supabase.from("wishlists").insert({ user_id: user.id, product_id: product.id });
    if (error && !error.message.includes("duplicate")) toast.error(error.message);
    else toast.success("Saved");
  };

  return (
    <ShopLayout>
      <div className="container mx-auto px-4 py-6 md:py-10">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="aspect-square rounded-2xl overflow-hidden bg-secondary border border-border">
              <img src={images[imgIdx]} alt={product.title} className="w-full h-full object-cover" />
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto hide-scrollbar">
                {images.map((img, i) => (
                  <button key={i} onClick={() => setImgIdx(i)}
                    className={`flex-shrink-0 h-16 w-16 rounded-lg overflow-hidden border-2 ${imgIdx === i ? "border-primary" : "border-transparent"}`}>
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
            {product.brand && <p className="text-sm text-muted-foreground uppercase tracking-wide">{product.brand}</p>}
            <h1 className="text-2xl md:text-3xl font-bold mt-1">{product.title}</h1>
            <div className="mt-2 flex items-center gap-2 text-sm">
              <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-success text-white">
                <Star className="h-3 w-3 fill-white" />{Number(product.rating ?? 4.5).toFixed(1)}
              </div>
              <span className="text-muted-foreground">{product.review_count ?? 0} reviews</span>
            </div>

            <div className="mt-5 flex items-baseline gap-3">
              <span className="text-3xl font-bold">{formatINR(product.price)}</span>
              {discount > 0 && <>
                <span className="text-muted-foreground line-through">{formatINR(product.compare_price)}</span>
                <span className="text-success font-semibold">{discount}% off</span>
              </>}
            </div>

            {seller && (
              <Link to={`/shop?seller=${seller.slug}`} className="mt-4 inline-block text-sm text-muted-foreground">
                Sold by <span className="text-primary hover:underline font-medium">{seller.store_name}</span>
                {seller.verified && <span className="ml-1 text-xs text-success">✓ Verified</span>}
              </Link>
            )}

            <div className="mt-6 flex items-center gap-3">
              <div className="flex items-center border border-border rounded-lg">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 hover:bg-secondary">−</button>
                <span className="px-4 font-medium">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-3 py-2 hover:bg-secondary">+</button>
              </div>
              <span className="text-sm text-muted-foreground">{product.stock} in stock</span>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <Button size="lg" onClick={() => add(product.id, qty)} className="flex-1 min-w-40 bg-gradient-hero text-white border-0">
                <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
              </Button>
              <Button size="lg" variant="outline" onClick={onWish}>
                <Heart className="h-4 w-4 mr-2" /> Wishlist
              </Button>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-2 text-xs text-muted-foreground">
              <div className="flex flex-col items-center gap-1 p-3 rounded-lg bg-secondary"><Truck className="h-4 w-4 text-primary"/>Fast Delivery</div>
              <div className="flex flex-col items-center gap-1 p-3 rounded-lg bg-secondary"><RotateCcw className="h-4 w-4 text-primary"/>Easy Returns</div>
              <div className="flex flex-col items-center gap-1 p-3 rounded-lg bg-secondary"><Shield className="h-4 w-4 text-primary"/>Secure Pay</div>
            </div>

            {product.description && (
              <div className="mt-8 prose prose-sm max-w-none">
                <h3 className="text-lg font-semibold mb-2">About this product</h3>
                <p className="text-muted-foreground whitespace-pre-wrap">{product.description}</p>
              </div>
            )}
          </motion.div>
        </div>

        {reviews.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="grid gap-3">
              {reviews.map(r => (
                <div key={r.id} className="bg-card border border-border rounded-xl p-4">
                  <div className="flex items-center gap-2">
                    {[...Array(5)].map((_, i) => <Star key={i} className={`h-3.5 w-3.5 ${i < r.rating ? "fill-warning text-warning" : "text-muted"}`} />)}
                    {r.title && <span className="text-sm font-semibold">{r.title}</span>}
                  </div>
                  {r.body && <p className="text-sm text-muted-foreground mt-1">{r.body}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold mb-4">You might also like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </section>
        )}
      </div>
    </ShopLayout>
  );
}
