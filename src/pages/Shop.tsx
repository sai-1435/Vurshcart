import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { ShopLayout } from "@/components/ShopLayout";
import { ProductCard, type Product } from "@/components/ProductCard";

import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";

import { Search } from "lucide-react";

import {
Select,
SelectContent,
SelectItem,
SelectTrigger,
SelectValue
} from "@/components/ui/select";

export default function Shop() {

const [params, setParams] =
useSearchParams();

const q =
params.get("q") ?? "";

const sort =
params.get("sort") ?? "newest";

const [products, setProducts] =
useState<Product[]>([]);

const [loading, setLoading] =
useState(true);

useEffect(() => {


const loadProducts =
  async () => {

    try {

      setLoading(true);

      const response =
        await fetch(
          "http://127.0.0.1:5000/products"
        );

      const data =
        await response.json();

      if (data.success) {

        let productList =
          data.products.map(
            (item: any) => ({
              id: item.id,
              slug: item.id.toString(),
              title: item.name,
              price: Number(item.price),
              images: item.image_url,
              brand: item.brand || "",
              rating: Number(item.rating || 4.5),
              review_count: 0
            })
          );

        if (q) {

          productList =
            productList.filter(
              (p: any) =>
                p.title
                  .toLowerCase()
                  .includes(
                    q.toLowerCase()
                  )
            );
        }

        if (sort === "price-asc") {

          productList.sort(
            (a: any, b: any) =>
              a.price - b.price
          );

        } else if (
          sort === "price-desc"
        ) {

          productList.sort(
            (a: any, b: any) =>
              b.price - a.price
          );
        }

        setProducts(productList);
      }

    } catch (error) {

      console.error(error);

    }

    setLoading(false);

  };

loadProducts();


}, [q, sort]);

return (


<ShopLayout>

  <div className="container mx-auto px-4 py-6">

    <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between mb-6">

      <div className="relative flex-1 max-w-xl">

        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
        />

        <Input
          value={q}
          onChange={(e) =>
            setParams({
              q: e.target.value,
              sort
            })
          }
          placeholder="Search products..."
          className="pl-9 bg-card"
        />

      </div>

      <Select
        value={sort}
        onValueChange={(v) =>
          setParams({
            q,
            sort: v
          })
        }
      >

        <SelectTrigger
          className="w-full sm:w-44"
        >
          <SelectValue />
        </SelectTrigger>

        <SelectContent>

          <SelectItem value="newest">
            Newest
          </SelectItem>

          <SelectItem value="price-asc">
            Price: Low to High
          </SelectItem>

          <SelectItem value="price-desc">
            Price: High to Low
          </SelectItem>

        </SelectContent>

      </Select>

    </div>

    {loading ? (

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

        {[...Array(8)].map((_, i) => (

          <Skeleton
            key={i}
            className="aspect-[3/4] rounded-xl"
          />

        ))}

      </div>

    ) : products.length === 0 ? (

      <div className="text-center py-20">

        <p className="text-muted-foreground">

          No products found

        </p>

      </div>

    ) : (

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

        {products.map((p, i) => (

          <ProductCard
            key={p.id}
            product={p}
            index={i}
          />

        ))}

      </div>

    )}

  </div>

</ShopLayout>


);

}
