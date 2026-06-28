import smtplib

EMAIL = "support@vrukart.in"
PASSWORD = "YOUR_PASSWORD"

try:
    print("Connecting...")

    server = smtplib.SMTP("smtp.titan.email", 587, timeout=10)
    server.ehlo()

    print("Connected")

    server.starttls()
    print("TLS Started")

    server.login(EMAIL, PASSWORD)
    print("Login Success")

    server.quit()

except Exception as e:
    print(e)