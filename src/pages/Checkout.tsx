import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ShopLayout } from "@/components/ShopLayout";
import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/contexts/AuthContext";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { formatINR } from "@/lib/format";

import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function Checkout() {

  const {
    items,
    subtotal,
    clear
  } = useCart();

  const { user } =
    useAuth();

  const navigate =
    useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({
      full_name: "",
      phone: "",
      line1: "",
      line2: "",
      city: "",
      state: "",
      pincode: "",
      country: "India",
    });

  const [payment, setPayment] =
    useState("cod");

  useEffect(() => {

    const savedAddress =
      localStorage.getItem(
        "shippingAddress"
      );

    if (savedAddress) {

      setForm(
        JSON.parse(savedAddress)
      );

    }

  }, []);

  if (items.length === 0) {

    return (

      <ShopLayout>

        <div className="container mx-auto px-4 py-20 text-center">

          <p>Your cart is empty.</p>

          <Button
            onClick={() => navigate("/shop")}
            className="mt-4 bg-gradient-hero text-white border-0"
          >
            Shop Now
          </Button>

        </div>

      </ShopLayout>

    );

  }

  const shipping =
    subtotal > 500 ? 0 : 49;

  const tax =
    Math.round(subtotal * 0.05);

  const total =
    subtotal + shipping + tax;

  const place = async (
  e: React.FormEvent
) => {

  e.preventDefault();

  setLoading(true);

  localStorage.setItem(
    "shippingAddress",
    JSON.stringify(form)
  );

  try {

    // Cash On Delivery
    if (payment === "cod") {

  console.log("COD CLICKED");

  const res = await fetch(
    "http://127.0.0.1:5000/save-order",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: user?.id,
        total_amount: total
      })
    }
  );

  console.log("SAVE ORDER STATUS:", res.status);
  console.log(await res.text());

  clear();

  toast.success(
    "Order placed successfully"
  );

  navigate("/orders");

  setLoading(false);

  return;
}

    // Razorpay Payment
    const response = await fetch(
      "http://127.0.0.1:5000/create-order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          amount: total
        })
      }
    );

    const data = await response.json();

   const options = {
  key: "rzp_live_T5TuufRulT09gj",
  amount: data.order.amount,
  currency: data.order.currency,
  name: "Vrukart",
  description: "Order Payment",
  order_id: data.order.id,

  handler: async function (response) {

  console.log("Razorpay Response:", response);
  console.log("User:", user);

  const res = await fetch(
    "http://127.0.0.1:5000/save-order",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: user?.id,
        total_amount: total
      })
    }
  );

  console.log("Save Order Status:", res.status);
  console.log(await res.text());

  toast.success("Payment Successful");

  clear();

  navigate("/orders");
},

  prefill: {
    name: form.full_name,
    contact: form.phone,
    email: user?.email || ""
  },

  theme: {
    color: "#000000"
  }
};

    const razorpay = new (window as any).Razorpay(
      options
    );

    razorpay.open();

  } catch (error) {

    console.error(error);

    toast.error(
      "Payment Failed"
    );

  }

  setLoading(false);

};

  return (

    <ShopLayout>

      <div className="container mx-auto px-4 py-8">

        <h1 className="text-3xl font-bold mb-6">

          Checkout

        </h1>

        <form
          onSubmit={place}
          className="grid lg:grid-cols-3 gap-6"
        >

          <div className="lg:col-span-2 space-y-6">

            <section className="bg-card border border-border rounded-xl p-5">

              <h2 className="font-semibold mb-4">

                Shipping Address

              </h2>

              <div className="grid sm:grid-cols-2 gap-3">

                <div className="sm:col-span-2">

                  <Label>Full Name</Label>

                  <Input
                    required
                    value={form.full_name}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        full_name: e.target.value
                      })
                    }
                  />

                </div>

                <div>

                  <Label>Phone</Label>

                  <Input
                    required
                    value={form.phone}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        phone: e.target.value
                      })
                    }
                  />

                </div>

                <div>

                  <Label>Pincode</Label>

                  <Input
                    required
                    value={form.pincode}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        pincode: e.target.value
                      })
                    }
                  />

                </div>

                <div className="sm:col-span-2">

                  <Label>Address Line 1</Label>

                  <Input
                    required
                    value={form.line1}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        line1: e.target.value
                      })
                    }
                  />

                </div>

                <div className="sm:col-span-2">

                  <Label>Address Line 2</Label>

                  <Input
                    value={form.line2}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        line2: e.target.value
                      })
                    }
                  />

                </div>

                <div>

                  <Label>City</Label>

                  <Input
                    required
                    value={form.city}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        city: e.target.value
                      })
                    }
                  />

                </div>

                <div>

                  <Label>State</Label>

                  <Input
                    required
                    value={form.state}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        state: e.target.value
                      })
                    }
                  />

                </div>

              </div>

            </section>
            <section className="bg-card border border-border rounded-xl p-5">

  <h2 className="font-semibold mb-4">
    Payment Method
  </h2>

  <div className="space-y-2">

    <label className="flex items-center gap-3 p-3 border rounded-lg">
      <input
        type="radio"
        checked={payment === "cod"}
        onChange={() => setPayment("cod")}
      />
      <span>Cash On Delivery</span>
    </label>

    <label className="flex items-center gap-3 p-3 border rounded-lg">
      <input
        type="radio"
        checked={payment === "upi"}
        onChange={() => setPayment("upi")}
      />
      <span>UPI Payment</span>
    </label>

  </div>

</section>

</div>

<aside className="bg-card border border-border rounded-xl p-5 h-fit">

  <h3 className="font-semibold mb-4">
    Order Summary
  </h3>

  <div className="space-y-2 text-sm">

    <div className="flex justify-between">
      <span>Subtotal</span>
      <span>{formatINR(subtotal)}</span>
    </div>

    <div className="flex justify-between">
      <span>Shipping</span>
      <span>{formatINR(shipping)}</span>
    </div>

    <div className="flex justify-between">
      <span>Tax</span>
      <span>{formatINR(tax)}</span>
    </div>

    <div className="border-t pt-2 flex justify-between font-bold">
      <span>Total</span>
      <span>{formatINR(total)}</span>
    </div>

  </div>

  <Button
    type="submit"
    className="w-full mt-4 bg-gradient-hero text-white"
    disabled={loading}
  >

    {loading && (
      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
    )}

    Place Order

  </Button>

</aside>

</form>

</div>

</ShopLayout>

);

}