import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";

export interface CartItem {
id: number;
quantity: number;
name: string;
price: number;
image_url: string;
}

export function useCart() {

const [items, setItems] =
useState<CartItem[]>([]);

const [loading, setLoading] =
useState(false);

const user = JSON.parse(
localStorage.getItem("user") || "{}"
);

const load = useCallback(async () => {


if (!user?.id) {
  setItems([]);
  return;
}

setLoading(true);

try {

  const response =
    await fetch(
      `http://127.0.0.1:5000/cart/${user.id}`
    );

  const data =
    await response.json();

  if (data.success) {
    setItems(data.items);
  }

} catch (error) {
  console.error(error);
}

setLoading(false);


}, [user?.id]);

useEffect(() => {
load();
}, [load]);

const add = async (
productId: number,
qty = 1
) => {


if (!user?.id) {
  toast.error("Please Login");
  return;
}

try {

  const response =
    await fetch(
      "http://127.0.0.1:5000/add-to-cart",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json"
        },
        body: JSON.stringify({
          user_id: user.id,
          product_id: productId,
          quantity: qty
        })
      }
    );

  const data =
    await response.json();

  if (data.success) {
    toast.success(
      "Added To Cart"
    );
    load();
  }

} catch (error) {
  console.error(error);
}


};

const update = async (
cartId: number,
qty: number
) => {


await fetch(
  "http://127.0.0.1:5000/update-cart",
  {
    method: "PUT",
    headers: {
      "Content-Type":
        "application/json"
    },
    body: JSON.stringify({
      cart_id: cartId,
      quantity: qty
    })
  }
);

load();


};

const remove = async (
cartId: number
) => {


await fetch(
  `http://127.0.0.1:5000/remove-cart/${cartId}`,
  {
    method: "DELETE"
  }
);

load();


};

const clear = async () => {

if (!user?.id) return;

await fetch(
  `http://127.0.0.1:5000/clear-cart/${user.id}`,
  {
    method: "DELETE"
  }
);

setItems([]);

};

const subtotal =
items.reduce(
(sum, item) =>
sum +
Number(item.price) *
item.quantity,
0
);

const count =
items.reduce(
(sum, item) =>
sum + item.quantity,
0
);

return {
items,
loading,
add,
update,
remove,
clear,
subtotal,
count,
reload: load
};
}
