import { ShopLayout } from "@/components/ShopLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Mail, Package, Heart, Store } from "lucide-react";

export default function Account() {
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/auth";
  };

  return (
    <ShopLayout>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">
          My Account
        </h1>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-gradient-hero grid place-items-center text-white text-xl font-bold">
              {user?.name?.[0]?.toUpperCase() || "U"}
            </div>

            <div>
              <p className="font-semibold text-lg">
                {user?.name || "User"}
              </p>

              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Mail className="h-3 w-3" />
                {user?.email}
              </p>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 mt-4">

          <Link
            to="/orders"
            className="bg-card border border-border rounded-xl p-5 hover:border-primary/40 flex items-center gap-3"
          >
            <Package className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">My Orders</p>
              <p className="text-xs text-muted-foreground">
                Track your purchases
              </p>
            </div>
          </Link>

          <Link
            to="/wishlist"
            className="bg-card border border-border rounded-xl p-5 hover:border-primary/40 flex items-center gap-3"
          >
            <Heart className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">Wishlist</p>
              <p className="text-xs text-muted-foreground">
                Saved for later
              </p>
            </div>
          </Link>

          <Link
            to="/become-seller"
            className="bg-card border border-border rounded-xl p-5 hover:border-primary/40 flex items-center gap-3"
          >
            <Store className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">
                Become a Seller
              </p>
              <p className="text-xs text-muted-foreground">
                Start selling today
              </p>
            </div>
          </Link>

        </div>

        <Button
          variant="destructive"
          className="mt-6"
          onClick={logout}
        >
          Logout
        </Button>
      </div>
    </ShopLayout>
  );
}