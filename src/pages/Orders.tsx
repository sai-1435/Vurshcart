import { useEffect, useState } from "react";
import { ShopLayout } from "@/components/ShopLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Package } from "lucide-react";

export default function Orders() {

  const { user } = useAuth();

  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadOrders = async () => {

      try {

        const response = await fetch(
  `https://vurshcart.onrender.com/orders/${user?.id}`
);

        const data = await response.json();

        if (data.success) {
          setOrders(data.orders);
        }

      } catch (error) {

        console.error(error);

      }

      setLoading(false);

    };

    if (user?.id) {
      loadOrders();
    }

  }, [user]);

  return (

    <ShopLayout>

      <div className="container mx-auto px-4 py-8 max-w-5xl">

        <h1 className="text-3xl font-bold mb-6">

          My Orders

        </h1>

        {loading ? (

          <p>Loading orders...</p>

        ) : orders.length === 0 ? (

          <div className="text-center py-16 bg-card rounded-2xl border border-border">

            <Package
              className="h-16 w-16 mx-auto text-muted-foreground mb-4"
            />

            <h2 className="text-2xl font-semibold">

              No Orders Yet

            </h2>

            <p className="text-muted-foreground mt-2">

              You have not placed any orders yet.

            </p>

          </div>

        ) : (

          <div className="space-y-5">

            {orders.map((order) => (

              <div
                key={order.id}
                className="border rounded-xl p-6 bg-card shadow-sm"
              >

                <div className="flex justify-between items-center mb-4">

                  <h2 className="text-xl font-bold">

                    Order #{order.id}

                  </h2>

                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">

                    {order.status}

                  </span>

                </div>

                <div className="grid md:grid-cols-2 gap-3">

                  <p>
                    <strong>Amount:</strong>
                    {" "}₹{order.total_amount}
                  </p>

                  <p>
                    <strong>Delivery Status:</strong>
                    {" "}
                    {order.delivery_status || "Order Confirmed"}
                  </p>

                  <p>
                    <strong>Tracking ID:</strong>
                    {" "}
                    {order.tracking_id || "Pending"}
                  </p>

                  <p>
                    <strong>Expected Delivery:</strong>
                    {" "}
                    {order.expected_delivery || "Updating"}
                  </p>

                  <p>
  <strong>Order Date:</strong>
  {" "}
  {new Date(
    order.created_at
  ).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "long",
      year: "numeric"
    }
  )}
</p>

                </div>

                <div className="mt-5">

                  <div className="flex items-center gap-2 text-sm">

                    <span>📦</span>
                    <span>
                      {order.delivery_status || "Order Confirmed"}
                    </span>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </ShopLayout>

  );

}