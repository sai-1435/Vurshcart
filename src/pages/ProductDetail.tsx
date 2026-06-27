import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { motion } from "framer-motion";

import { ShopLayout } from "@/components/ShopLayout";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import {
  Truck,
  Shield,
  RotateCcw,
  Star,
  ShoppingCart,
  Heart
} from "lucide-react";

import { formatINR } from "@/lib/format";

import { useCart } from "@/hooks/use-cart";

import { toast } from "sonner";

export default function ProductDetail() {

  const { slug } = useParams();

  const { add } = useCart();

  const [product, setProduct] =
    useState<any>(null);

  const [qty, setQty] =
    useState(1);

  const [loading, setLoading] =
    useState(true);

  const [wishlisted, setWishlisted] =
    useState(false);

  useEffect(() => {

    const loadProduct = async () => {

      try {

        setLoading(true);

        await fetch(
  `https://vurshcart.onrender.com/product/${slug}`
);

        const data =
          await response.json();

        if (data.success) {

          setProduct(
            data.product
          );

        }

      } catch (error) {

        console.error(error);

      }

      setLoading(false);

    };

    loadProduct();

  }, [slug]);

  if (loading) {

    return (

      <ShopLayout>

        <div className="container mx-auto px-4 py-8 grid md:grid-cols-2 gap-8">

          <Skeleton
            className="aspect-square rounded-2xl"
          />

          <div className="space-y-4">

            <Skeleton className="h-8 w-3/4" />

            <Skeleton className="h-6 w-1/3" />

            <Skeleton className="h-24 w-full" />

          </div>

        </div>

      </ShopLayout>

    );

  }

  if (!product) {

    return (

      <ShopLayout>

        <div className="container mx-auto px-4 py-20 text-center">

          <p className="text-muted-foreground">

            Product not found

          </p>

        </div>

      </ShopLayout>

    );

  }
    return (

    <ShopLayout>

      <div className="container mx-auto px-4 py-6 md:py-10">

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >

            <div className="aspect-square rounded-2xl overflow-hidden bg-secondary border border-border">

              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover"
              />

            </div>

          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              x: 10
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
          >

            <p className="text-sm text-muted-foreground uppercase tracking-wide">

              {product.brand || "Vrukart"}

            </p>

            <h1 className="text-2xl md:text-4xl font-bold mt-2">

              {product.name}

            </h1>

            <div className="mt-3 flex items-center gap-3">

              <div className="flex items-center gap-1 px-3 py-1 rounded bg-green-600 text-white">

                <Star className="h-4 w-4 fill-white" />

                {Number(
                  product.rating || 4.5
                ).toFixed(1)}

              </div>

              <span className="text-sm text-muted-foreground">

                245 Ratings & Reviews

              </span>

            </div>

            <div className="mt-6">

              <span className="text-4xl font-bold">

                {formatINR(
                  Number(product.price)
                )}

              </span>

            </div>

            <div className="mt-6 p-4 border rounded-xl bg-secondary">

              <h3 className="font-semibold mb-3">

                Delivery Information

              </h3>

              <p>
                🚚 Free Delivery Available
              </p>

              <p>
                📦 Stock Available:
                {" "}
                {product.stock}
              </p>

              <p>
                🔒 Secure Payment
              </p>

              <p>
                ↩️ Easy Returns
              </p>

            </div>
            

            <div className="mt-6 flex items-center gap-3">

              <div className="flex items-center border border-border rounded-lg">

                <button
                  onClick={() =>
                    setQty(
                      Math.max(
                        1,
                        qty - 1
                      )
                    )
                  }
                  className="px-4 py-2"
                >
                 -
                </button>

                <span className="px-5 font-medium">

                  {qty}

                </span>

                <button
                  onClick={() =>
                    setQty(qty + 1)
                  }
                  className="px-4 py-2"
                >
                  +
                </button>

                          </div>
                          </div>

            <div className="mt-6 flex flex-wrap gap-3">

              <Button
  size="icon"
  variant="outline"
  onClick={async () => {

    const user = JSON.parse(
      localStorage.getItem("user") || "{}"
    );

    if (!user?.id) {
      toast.error("Please Login");
      return;
    }

    try {

      await fetch(
  "https://vurshcart.onrender.com/add-to-wishlist",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json"
          },
          body: JSON.stringify({
            user_id: user.id,
            product_id: product.id
          })
        }
      );

      setWishlisted(true);

      toast.success(
        "Added To Wishlist ❤️"
      );

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed To Add Wishlist"
      );

    }

  }}
>

  <Heart
    className={`h-5 w-5 ${
      wishlisted
        ? "fill-red-500 text-red-500"
        : ""
    }`}
  />

</Button>

              <Button
                size="lg"
                className="flex-1 min-w-40 bg-yellow-500 text-black hover:bg-yellow-400"
                onClick={() =>
                  add(
                    Number(product.id),
                    qty
                  )
                }
              >

                <ShoppingCart className="h-4 w-4 mr-2" />

                Add To Cart

              </Button>

              <Button
                size="lg"
                className="flex-1 min-w-40 bg-orange-500 text-white hover:bg-orange-400"
                onClick={async () => {

                  await add(
                    Number(product.id),
                    qty
                  );

                  window.location.href =
                    "/checkout";

                }}
              >

                Buy Now

              </Button>

            </div>

            <div className="mt-8 grid grid-cols-3 gap-3">

              <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-secondary">

                <Truck className="h-5 w-5 text-primary" />

                <span className="text-xs text-center">

                  Fast Delivery

                </span>

              </div>

              <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-secondary">

                <RotateCcw className="h-5 w-5 text-primary" />

                <span className="text-xs text-center">

                  Easy Returns

                </span>

              </div>

              <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-secondary">

                <Shield className="h-5 w-5 text-primary" />

                <span className="text-xs text-center">

                  Secure Payment

                </span>

              </div>

            </div>

            <div className="mt-8">

              <h3 className="text-xl font-semibold mb-3">

                About This Product

              </h3>

              <p className="text-muted-foreground leading-relaxed">

                {
                  product.description ||
                  "Premium quality product available on Vrukart with fast delivery, secure payment and easy returns."
                }

              </p>

            </div>
                        <div className="mt-10">

              <h3 className="text-xl font-semibold mb-4">

                Product Specifications

              </h3>

              <div className="border rounded-xl overflow-hidden">

                <div className="grid grid-cols-2 border-b">

                  <div className="p-3 font-medium bg-secondary">
                    Brand
                  </div>

                  <div className="p-3">
                    {product.brand || "Vrukart"}
                  </div>

                </div>

                <div className="grid grid-cols-2 border-b">

                  <div className="p-3 font-medium bg-secondary">
                    Category
                  </div>

                  <div className="p-3">
                    {product.category || "General"}
                  </div>

                </div>

                <div className="grid grid-cols-2 border-b">

                  <div className="p-3 font-medium bg-secondary">
                    Stock
                  </div>

                  <div className="p-3">
                    {product.stock}
                  </div>

                </div>

                <div className="grid grid-cols-2">

                  <div className="p-3 font-medium bg-secondary">
                    Rating
                  </div>

                  <div className="p-3">
                    {product.rating || "4.5"}
                  </div>

                </div>

              </div>

            </div>

            <div className="mt-10">

              <h3 className="text-xl font-semibold mb-4">

                Customer Reviews

              </h3>

              <div className="space-y-4">

                <div className="border rounded-xl p-4">

                  <div className="flex items-center gap-2 mb-2">

                    ⭐⭐⭐⭐⭐

                  </div>

                  <p>

                    Excellent product quality and fast delivery.

                  </p>

                  <p className="text-sm text-muted-foreground mt-2">

                    Verified Customer

                  </p>

                </div>

                <div className="border rounded-xl p-4">

                  <div className="flex items-center gap-2 mb-2">

                    ⭐⭐⭐⭐⭐

                  </div>

                  <p>

                    Worth the price. Highly recommended.

                  </p>

                  <p className="text-sm text-muted-foreground mt-2">

                    Verified Customer

                  </p>

                </div>

              </div>

            </div>

            <div className="mt-10">

              <h3 className="text-xl font-semibold mb-4">

                Similar Products

              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                <div className="border rounded-xl p-4 text-center">

                  More products coming soon...

                </div>

                <div className="border rounded-xl p-4 text-center">

                  More products coming soon...

                </div>

                <div className="border rounded-xl p-4 text-center">

                  More products coming soon...

                </div>

                <div className="border rounded-xl p-4 text-center">

                  More products coming soon...

                </div>

              </div>

            </div>

          </motion.div>

        </div>

      </div>

    </ShopLayout>

  );

}