import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Logo } from "@/components/Logo";
import { toast } from "sonner";
import { Loader2, Mail, Phone } from "lucide-react";

export default function Auth() {
  const navigate = useNavigate();

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [asSeller, setAsSeller] = useState(false);

  const [loading, setLoading] = useState(false);

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const [emailOtp, setEmailOtp] = useState("");
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  const {
    signInWithGoogle,
    signInWithApple,
    signInWithPhone,
    verifyPhoneOtp,
  } = useAuth();

  const sendEmailOtp = async () => {
    try {
      const response = await fetch(
        "https://vurshcart.onrender.com/send-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setEmailOtpSent(true);
        toast.success("OTP sent");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Failed to send email OTP");
    }
  };

  const verifyEmailOtp = async () => {
    try {
      const response = await fetch(
        "https://vurshcart.onrender.com/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            otp: emailOtp,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setEmailVerified(true);
        toast.success("Email Verified");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Verification failed");
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const url =
        mode === "signin"
          ? "https://vurshcart.onrender.com/login"
          : "https://vurshcart.onrender.com/register";

      const body =
        mode === "signin"
          ? {
              email,
              password,
            }
          : {
              full_name: fullName,
              email,
              password,
              role: asSeller ? "seller" : "user",
            };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (data.success) {
        if (mode === "signin") {
          localStorage.setItem(
            "user",
            JSON.stringify(data.user)
          );

          toast.success("Login Successful");

          navigate("/");
        } else {
          toast.success("Account Created Successfully");
          setMode("signin");
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Server Error");
    }

    setLoading(false);
  };

  const onOAuth = async (fn: () => Promise<void>) => {
    setLoading(true);

    try {
      await fn();
    } catch (e: any) {
      toast.error(e.message);
    }

    setLoading(false);
  };

  const onPhone = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      if (!otpSent) {
        await signInWithPhone(phone);
        setOtpSent(true);
        toast.success("OTP Sent");
      } else {
        await verifyPhoneOtp(phone, otp);
        toast.success("Welcome!");
        navigate("/");
      }
    } catch (e: any) {
      toast.error(e.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-gradient-soft">
      <div className="hidden md:flex flex-col justify-between p-12 bg-gradient-hero text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_60%)]" />

        <div className="relative">
          <Link to="/" className="text-white">
            <Logo />
          </Link>
        </div>

        <div className="relative">
          <h2 className="text-3xl font-bold leading-tight">
            The future of commerce is intelligent.
          </h2>

          <p className="mt-3 text-white/85">
            Join millions of shoppers and sellers on India's AI-powered marketplace.
          </p>
        </div>

        <div className="relative text-sm text-white/70">
          © {new Date().getFullYear()} Vrukart
        </div>
      </div>

      <div className="flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          <div className="md:hidden">
            <Link to="/">
              <Logo />
            </Link>
          </div>
                    <h1 className="text-2xl font-bold">
            {mode === "signin" ? "Welcome back" : "Create your account"}
          </h1>

          <p className="text-sm text-muted-foreground mt-1">
            Shop or sell on VrushCart
          </p>

          <Tabs defaultValue="email" className="mt-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="email">
                <Mail className="h-4 w-4 mr-2" />
                Email
              </TabsTrigger>

              <TabsTrigger value="phone">
                <Phone className="h-4 w-4 mr-2" />
                Phone
              </TabsTrigger>
            </TabsList>

            <TabsContent value="email" className="mt-4 space-y-4">
              <form onSubmit={onSubmit} className="space-y-3">
                {mode === "signup" && (
                  <>
                    <Button
                      type="button"
                      onClick={sendEmailOtp}
                      className="w-full"
                    >
                      Send Email OTP
                    </Button>

                    {emailOtpSent && (
                      <>
                        <Input
                          placeholder="Enter Email OTP"
                          value={emailOtp}
                          onChange={(e) =>
                            setEmailOtp(e.target.value)
                          }
                        />

                        <Button
                          type="button"
                          variant="outline"
                          className="w-full"
                          onClick={verifyEmailOtp}
                        >
                          Verify OTP
                        </Button>
                      </>
                    )}

                    <div>
                      <Label>Full Name</Label>
                      <Input
                        value={fullName}
                        onChange={(e) =>
                          setFullName(e.target.value)
                        }
                        required
                      />
                    </div>
                  </>
                )}

                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    required
                  />
                </div>

                <div>
                  <Label>Password</Label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    required
                  />
                </div>

                {mode === "signup" && (
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={asSeller}
                      onChange={(e) =>
                        setAsSeller(e.target.checked)
                      }
                    />
                    Register as Seller
                  </label>
                )}

                <Button
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : mode === "signin" ? (
                    "Login"
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>

              <div className="my-4 flex items-center gap-2">
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs text-muted-foreground">
                  OR
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() =>
                    onOAuth(signInWithGoogle)
                  }
                >
                  Google
                </Button>

                <Button
                  variant="outline"
                  onClick={() =>
                    onOAuth(signInWithApple)
                  }
                >
                  Apple
                </Button>
              </div>

              <p className="text-center text-sm mt-4">
                {mode === "signin"
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
                <button
                  type="button"
                  className="text-primary underline"
                  onClick={() =>
                    setMode(
                      mode === "signin"
                        ? "signup"
                        : "signin"
                    )
                  }
                >
                  {mode === "signin"
                    ? "Sign Up"
                    : "Sign In"}
                </button>
              </p>
            </TabsContent>

            <TabsContent value="phone">
              <form
                onSubmit={onPhone}
                className="space-y-3"
              >
                <Input
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                />

                {otpSent && (
                  <Input
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value)
                    }
                  />
                )}

                <Button
                  className="w-full"
                  disabled={loading}
                >
                  {otpSent
                    ? "Verify OTP"
                    : "Send OTP"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}