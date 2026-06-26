from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_mail import Mail, Message
import mysql.connector
import bcrypt
import random
import razorpay
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)

app.config["MAIL_SERVER"] = "smtp.gmail.com"
app.config["MAIL_PORT"] = 587
app.config["MAIL_USE_TLS"] = True

app.config["MAIL_USERNAME"] = "vrukartofficial@gmail.com"
app.config["MAIL_PASSWORD"] = "werfotutagjmcgqp"

mail = Mail(app)

def get_db():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="Sai143aa4@",
        database="vrukart_db"
    )

RAZORPAY_KEY_ID = "rzp_live_T5TuufRulT09gj"
RAZORPAY_KEY_SECRET = "6OZC6sjYUixzqIyhz4FQk3qz"

razorpay_client = razorpay.Client(
    auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET)
)

@app.route("/")
def home():
    return {
        "status": "success",
        "message": "Vrukart Backend Running"
    }
@app.route("/register", methods=["POST"])
def register():

    data = request.json

    full_name = data["full_name"]
    email = data["email"]
    password = data["password"]

    db = get_db()
    cursor = db.cursor()

    cursor.execute(
        "SELECT id FROM users WHERE email=%s",
        (email,)
    )

    if cursor.fetchone():

        cursor.close()
        db.close()

        return jsonify({
            "success": False,
            "message": "Email already exists"
        }), 400

    hashed_password = bcrypt.hashpw(
        password.encode("utf-8"),
        bcrypt.gensalt()
    )

    cursor.execute(
        """
        INSERT INTO users(
            full_name,
            email,
            password
        )
        VALUES(%s,%s,%s)
        """,
        (
            full_name,
            email,
            hashed_password.decode("utf-8")
        )
    )

    db.commit()

    cursor.close()
    db.close()

    return jsonify({
        "success": True,
        "message": "User Registered Successfully"
    })
@app.route("/login", methods=["POST"])
def login():

    data = request.json

    email = data["email"]
    password = data["password"]

    db = get_db()
    cursor = db.cursor(dictionary=True)

    cursor.execute(
        "SELECT * FROM users WHERE email=%s",
        (email,)
    )

    user = cursor.fetchone()

    cursor.close()
    db.close()

    if not user:
        return jsonify({
            "success": False,
            "message": "User not found"
        }), 404

    if bcrypt.checkpw(
        password.encode("utf-8"),
        user["password"].encode("utf-8")
    ):
        return jsonify({
            "success": True,
            "message": "Login Successful",
            "user": {
                "id": user["id"],
                "name": user["full_name"],
                "email": user["email"]
            }
        })

    return jsonify({
        "success": False,
        "message": "Invalid Password"
    }), 401
@app.route("/send-otp", methods=["POST"])
def send_otp():

    data = request.json
    email = data["email"]

    otp = str(
        random.randint(
            100000,
            999999
        )
    )

    db = get_db()
    cursor = db.cursor()

    cursor.execute(
        """
        INSERT INTO email_otps(
            email,
            otp
        )
        VALUES(%s,%s)
        """,
        (email, otp)
    )

    db.commit()

    cursor.close()
    db.close()

    msg = Message(
        "Vrukart Email Verification",
        sender=app.config["MAIL_USERNAME"],
        recipients=[email]
    )

    msg.html = f"""
    <h2>Vrukart Verification</h2>
    <p>Your OTP is:</p>

    <h1>{otp}</h1>

    <p>
      This OTP is valid
      for 10 minutes.
    </p>
    """

    mail.send(msg)

    return jsonify({
        "success": True,
        "message": "OTP Sent Successfully"
    })
@app.route("/verify-otp", methods=["POST"])
def verify_otp():

    data = request.json

    email = data["email"]
    otp = data["otp"]

    db = get_db()
    cursor = db.cursor(dictionary=True)

    cursor.execute(
        """
        SELECT *
        FROM email_otps
        WHERE email=%s
        AND otp=%s
        ORDER BY id DESC
        LIMIT 1
        """,
        (email, otp)
    )

    otp_record = cursor.fetchone()

    cursor.close()
    db.close()

    if otp_record:
        return jsonify({
            "success": True,
            "message": "OTP Verified Successfully"
        })

    return jsonify({
        "success": False,
        "message": "Invalid OTP"
    }), 400
@app.route("/products", methods=["GET"])
def get_products():

    db = get_db()
    cursor = db.cursor(dictionary=True)

    cursor.execute("""
        SELECT *
        FROM products
        ORDER BY id DESC
    """)

    products = cursor.fetchall()

    cursor.close()
    db.close()

    return jsonify({
        "success": True,
        "products": products
    })


@app.route("/add-to-cart", methods=["POST"])
def add_to_cart():

    data = request.json

    user_id = data["user_id"]
    product_id = data["product_id"]
    quantity = data["quantity"]

    db = get_db()
    cursor = db.cursor()

    cursor.execute(
        """
        INSERT INTO cart(
            user_id,
            product_id,
            quantity
        )
        VALUES(%s,%s,%s)
        """,
        (
            user_id,
            product_id,
            quantity
        )
    )

    db.commit()

    cursor.close()
    db.close()

    return jsonify({
        "success": True,
        "message": "Added To Cart"
    })


@app.route("/cart/<int:user_id>", methods=["GET"])
def get_cart(user_id):

    db = get_db()
    cursor = db.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            cart.id,
            cart.quantity,
            products.name,
            products.price,
            products.image_url
        FROM cart
        JOIN products
        ON cart.product_id = products.id
        WHERE cart.user_id=%s
    """, (user_id,))

    cart_items = cursor.fetchall()

    cursor.close()
    db.close()

    return jsonify({
        "success": True,
        "items": cart_items
    })
@app.route("/update-cart", methods=["PUT"])
def update_cart():

    data = request.json

    cart_id = data["cart_id"]
    quantity = data["quantity"]

    db = get_db()
    cursor = db.cursor()

    cursor.execute(
        """
        UPDATE cart
        SET quantity=%s
        WHERE id=%s
        """,
        (quantity, cart_id)
    )

    db.commit()

    cursor.close()
    db.close()

    return jsonify({
        "success": True,
        "message": "Cart Updated"
    })


@app.route("/remove-cart/<int:cart_id>", methods=["DELETE"])
def remove_cart(cart_id):

    db = get_db()
    cursor = db.cursor()

    cursor.execute(
        """
        DELETE FROM cart
        WHERE id=%s
        """,
        (cart_id,)
    )

    db.commit()

    cursor.close()
    db.close()

    return jsonify({
        "success": True,
        "message": "Item Removed"
    })


@app.route("/clear-cart/<int:user_id>", methods=["DELETE"])
def clear_cart(user_id):

    db = get_db()
    cursor = db.cursor()

    cursor.execute(
        """
        DELETE FROM cart
        WHERE user_id=%s
        """,
        (user_id,)
    )

    db.commit()

    cursor.close()
    db.close()

    return jsonify({
        "success": True,
        "message": "Cart Cleared"
    })
@app.route("/product/<int:product_id>", methods=["GET"])
def get_product(product_id):

    db = get_db()
    cursor = db.cursor(dictionary=True)

    cursor.execute(
        """
        SELECT *
        FROM products
        WHERE id=%s
        """,
        (product_id,)
    )

    product = cursor.fetchone()

    cursor.close()
    db.close()

    if not product:
        return jsonify({
            "success": False,
            "message": "Product not found"
        }), 404

    return jsonify({
        "success": True,
        "product": product
    })


@app.route("/create-order", methods=["POST"])
def create_order():

    data = request.json

    amount = data["amount"]

    order = razorpay_client.order.create({
        "amount": int(amount * 100),
        "currency": "INR",
        "payment_capture": 1
    })

    return jsonify({
        "success": True,
        "order": order
    })


@app.route("/orders/<int:user_id>", methods=["GET"])
def get_orders(user_id):

    db = get_db()
    cursor = db.cursor(dictionary=True)

    cursor.execute(
        """
        SELECT *
        FROM orders
        WHERE user_id=%s
        ORDER BY id DESC
        """,
        (user_id,)
    )

    orders = cursor.fetchall()

    cursor.close()
    db.close()

    return jsonify({
        "success": True,
        "orders": orders
    })
@app.route("/save-order", methods=["POST"])
def save_order():

    print("========== SAVE ORDER HIT ==========")

    data = request.json
    print(data)

    user_id = data["user_id"]
    total_amount = data["total_amount"]

    tracking_id = f"VK{random.randint(100000,999999)}"

    expected_delivery = (
        datetime.now() + timedelta(days=5)
    ).strftime("%Y-%m-%d")

    db = get_db()
    cursor = db.cursor()

    # Create Order
    cursor.execute(
        """
        INSERT INTO orders(
            user_id,
            total_amount,
            status,
            delivery_status,
            expected_delivery,
            tracking_id
        )
        VALUES(%s,%s,%s,%s,%s,%s)
        """,
        (
            user_id,
            total_amount,
            "Paid",
            "Order Confirmed",
            expected_delivery,
            tracking_id
        )
    )

    order_id = cursor.lastrowid

    print("ORDER ID:", order_id)

    # Get Cart Items
    cursor.execute(
        """
        SELECT product_id, quantity
        FROM cart
        WHERE user_id=%s
        """,
        (user_id,)
    )

    cart_items = cursor.fetchall()

    print("CART ITEMS:", cart_items)

    # Save Products Into Order Items
    for item in cart_items:

        product_id = item[0]
        quantity = item[1]

        cursor.execute(
            """
            INSERT INTO order_items(
                order_id,
                product_id,
                quantity
            )
            VALUES(%s,%s,%s)
            """,
            (
                order_id,
                product_id,
                quantity
            )
        )

    # Clear Cart
    cursor.execute(
        """
        DELETE FROM cart
        WHERE user_id=%s
        """,
        (user_id,)
    )

    db.commit()

    print("ORDER SAVED SUCCESSFULLY")

    cursor.close()
    db.close()

    return jsonify({
        "success": True,
        "order_id": order_id,
        "tracking_id": tracking_id,
        "expected_delivery": expected_delivery
    })
@app.route("/add-to-wishlist", methods=["POST"])
def add_to_wishlist():

    data = request.json

    user_id = data["user_id"]
    product_id = data["product_id"]

    db = get_db()
    cursor = db.cursor()

    cursor.execute(
        """
        SELECT id
        FROM wishlist
        WHERE user_id=%s
        AND product_id=%s
        """,
        (user_id, product_id)
    )

    existing = cursor.fetchone()

    if existing:

        cursor.close()
        db.close()

        return jsonify({
            "success": True,
            "message": "Already In Wishlist"
        })

    cursor.execute(
        """
        INSERT INTO wishlist(
            user_id,
            product_id
        )
        VALUES(%s,%s)
        """,
        (user_id, product_id)
    )

    db.commit()

    cursor.close()
    db.close()

    return jsonify({
        "success": True
    })



# ADD HERE 👇

@app.route("/wishlist/<int:user_id>", methods=["GET"])
def get_wishlist(user_id):

    db = get_db()
    cursor = db.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            wishlist.id AS wishlist_id,
            products.*
        FROM wishlist
        JOIN products
        ON wishlist.product_id = products.id
        WHERE wishlist.user_id=%s
    """, (user_id,))

    items = cursor.fetchall()

    cursor.close()
    db.close()

    return jsonify({
        "success": True,
        "items": items
    })


@app.route("/remove-wishlist/<int:wishlist_id>", methods=["DELETE"])
def remove_wishlist(wishlist_id):

    db = get_db()
    cursor = db.cursor()

    cursor.execute(
        """
        DELETE FROM wishlist
        WHERE id=%s
        """,
        (wishlist_id,)
    )

    db.commit()

    cursor.close()
    db.close()

    return jsonify({
        "success": True
    })

if __name__ == "__main__":
    app.run(debug=True)
