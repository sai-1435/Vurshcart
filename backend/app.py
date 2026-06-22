from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_mail import Mail, Message
import mysql.connector
import bcrypt
import random

app = Flask(__name__)
CORS(app)
app.config["MAIL_SERVER"] = "smtp.gmail.com"
app.config["MAIL_PORT"] = 587
app.config["MAIL_USE_TLS"] = True

app.config["MAIL_USERNAME"] = "vrukartofficial@gmail.com"
app.config["MAIL_PASSWORD"] = "werfotutagjmcgqp"

mail = Mail(app)

# MySQL Connection
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Sai143aa4@",
    database="vrukart_db"
)

# Home Route
@app.route("/")
def home():
    return {
        "status": "success",
        "message": "Vrukart Backend Running"
    }

# Register Route
@app.route("/register", methods=["POST"])
def register():

    data = request.json

    full_name = data["full_name"]
    email = data["email"]
    password = data["password"]

    cursor = db.cursor()

    # Check if email already exists
    cursor.execute(
        "SELECT id FROM users WHERE email=%s",
        (email,)
    )

    if cursor.fetchone():
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
        INSERT INTO users(full_name,email,password)
        VALUES(%s,%s,%s)
        """,
        (
            full_name,
            email,
            hashed_password.decode("utf-8")
        )
    )

    db.commit()

    return jsonify({
        "success": True,
        "message": "User Registered Successfully"
    })

# Login Route
@app.route("/login", methods=["POST"])
def login():

    data = request.json

    email = data["email"]
    password = data["password"]

    cursor = db.cursor(dictionary=True)

    cursor.execute(
        "SELECT * FROM users WHERE email=%s",
        (email,)
    )

    user = cursor.fetchone()

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

    otp = str(random.randint(100000, 999999))

    cursor = db.cursor()

    cursor.execute(
        "INSERT INTO email_otps(email, otp) VALUES(%s,%s)",
        (email, otp)
    )

    db.commit()

    msg = Message(
        "Vrukart Email Verification",
        sender=app.config["MAIL_USERNAME"],
        recipients=[email]
    )

    msg.html = f"""
<div style="max-width:700px;margin:auto;background:#111827;color:white;font-family:Arial,sans-serif;">

  <div style="text-align:center;padding:20px;background:#0f172a;">
    <h1 style="color:#ffffff;">Vrukart</h1>
    <p style="color:#94a3b8;">India's Smart AI Marketplace</p>
  </div>

  <div style="padding:30px;">

    <h2 style="color:#60a5fa;">
      Dear Customer,
    </h2>

    <p>
      Thank you for choosing Vrukart.
    </p>

    <p>
      Your One Time Password (OTP) is:
    </p>

    <div style="
      background:#1e293b;
      padding:25px;
      text-align:center;
      font-size:40px;
      font-weight:bold;
      letter-spacing:8px;
      border-radius:12px;
      margin:20px 0;">
      {otp}
    </div>

    <p>
      This OTP is valid for 10 minutes.
    </p>

    <p>
      Do not share this OTP with anyone.
    </p>

    <br>

    <b>Happy Shopping!</b>

    <br><br>

    Regards,<br>
    Team Vrukart

    <hr>

    <p>
      📧 support@vrukart.com<br>
      🌐 www.vrukart.com
    </p>

    <p style="font-size:12px;color:#9ca3af;">
      This is a system generated email. Please do not reply.
    </p>

  </div>
</div>
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

    cursor = db.cursor(dictionary=True)

    cursor.execute(
        """
        SELECT * FROM email_otps
        WHERE email=%s AND otp=%s
        ORDER BY id DESC
        LIMIT 1
        """,
        (email, otp)
    )

    otp_record = cursor.fetchone()

    if otp_record:
        return jsonify({
            "success": True,
            "message": "OTP Verified Successfully"
        })

    return jsonify({
        "success": False,
        "message": "Invalid OTP"
    }), 400

if __name__ == "__main__":
    app.run(debug=True)