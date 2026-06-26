import { useEffect, useState } from "react";
import { ShopLayout } from "@/components/ShopLayout";
import { Button } from "@/components/ui/button";
import { Heart, Trash2 } from "lucide-react";

export default function Wishlist() {

  const [items, setItems] = useState<any[]>([]);

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const loadWishlist = async () => {

    try {

      const response = await fetch(
        `http://127.0.0.1:5000/wishlist/${user.id}`
      );

      const data = await response.json();

      if (data.success) {
        setItems(data.items);
      }

    } catch (error) {

      console.error(error);

    }

  };

  useEffect(() => {

    if (user?.id) {
      loadWishlist();
    }

  }, []);

  const removeWishlist = async (
    wishlistId: number
  ) => {

    await fetch(
      `http://127.0.0.1:5000/remove-wishlist/${wishlistId}`,
      {
        method: "DELETE"
      }
    );

    loadWishlist();

  };

  return (

    <ShopLayout>

      <div className="container mx-auto px-4 py-8">

        <h1 className="text-3xl font-bold mb-6">

          ❤️ My Wishlist

        </h1>

        {items.length === 0 ? (

          <div className="text-center py-16 bg-card rounded-2xl border border-border">

            <Heart
              className="h-16 w-16 mx-auto text-muted-foreground mb-4"
            />

            <h2 className="text-2xl font-semibold">

              Wishlist Empty

            </h2>

            <p className="text-muted-foreground mt-2">

              Add products to your wishlist

            </p>

          </div>

        ) : (

          <div className="grid md:grid-cols-3 gap-6">

            {items.map((item) => (

              <div
                key={item.wishlist_id}
                className="border rounded-xl p-4"
              >

                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-lg"
                />

                <h3 className="font-bold mt-3">

                  {item.name}

                </h3>

                <p className="mt-2 text-lg font-semibold">

                  ₹{item.price}

                </p>

                <Button
                  variant="destructive"
                  className="w-full mt-4"
                  onClick={() =>
                    removeWishlist(
                      item.wishlist_id
                    )
                  }
                >

                  <Trash2 className="h-4 w-4 mr-2" />

                  Remove

                </Button>

              </div>

            ))}

          </div>

        )}

      </div>

    </ShopLayout>

  );

}