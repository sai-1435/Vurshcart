import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Star } from "lucide-react";
import { formatINR, productImage } from "@/lib/format";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState } from "react";

export interface Product {
  id: string;
  slug: string;
  title: string;
  price: number;
  compare_price?: number | null;
  images: any;
  rating?: number | null;
  review_count?: number | null;
  brand?: string | null;
}

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { user } = useAuth();
  const [wishing, setWishing] = useState(false);
  const discount = product.compare_price && Number(product.compare_price) > Number(product.price)
    ? Math.round(((Number(product.compare_price) - Number(product.price)) / Number(product.compare_price)) * 100)
    : 0;

  const addWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) { toast.error("Sign in to save items"); return; }
    setWishing(true);
    const { error } = await supabase.from("wishlists").insert({ user_id: user.id, product_id: product.id });
    setWishing(false);
    if (error && !error.message.includes("duplicate")) toast.error(error.message);
    else toast.success("Saved to wishlist");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.3) }}
    >
      <Link to={`/product/${product.slug}`} className="group block bg-card rounded-xl overflow-hidden border border-border hover:border-primary/40 hover:shadow-card transition-all">
        <div className="relative aspect-square bg-secondary overflow-hidden">
          <img
            src={productImage(product.images)}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {discount > 0 && (
            <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-destructive text-destructive-foreground">
              {discount}% OFF
            </span>
          )}
          <Button
            size="icon" variant="secondary"
            onClick={addWishlist} disabled={wishing}
            className="absolute top-2 right-2 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 hover:bg-white"
            aria-label="Save to wishlist"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        <div className="p-3">
          {product.brand && <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{product.brand}</p>}
          <h3 className="text-sm font-medium line-clamp-2 min-h-[2.5rem]">{product.title}</h3>
          <div className="mt-1.5 flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="h-3 w-3 fill-warning text-warning" />
            <span>{Number(product.rating ?? 4.5).toFixed(1)}</span>
            <span>· {product.review_count ?? 0}</span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-semibold">{formatINR(product.price)}</span>
            {discount > 0 && (
              <span className="text-xs text-muted-foreground line-through">{formatINR(product.compare_price!)}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
