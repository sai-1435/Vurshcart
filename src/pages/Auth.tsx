import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Logo } from "@/components/Logo";

import {
  Loader2,
  Mail,
  Phone,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";

import { toast } from "sonner";

export default function Auth() {
  const navigate = useNavigate();

  const {
    signInWithGoogle,
    signInWithApple,
    signInWithPhone,
    verifyPhoneOtp,
  } = useAuth();

  const [mode, setMode] =
    useState<"signin" | "signup">("signin");

  const [loading, setLoading] = useState(false);

  /* ---------------------------
      Register States
  ---------------------------- */

  const [email, setEmail] = useState("");

  const [emailOtp, setEmailOtp] = useState("");

  const [emailOtpSent, setEmailOtpSent] =
    useState(false);

  const [emailVerified, setEmailVerified] =
    useState(false);

  const [fullName, setFullName] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [asSeller, setAsSeller] =
    useState(false);

  /* ---------------------------
        Phone Login
  ---------------------------- */

  const [phone, setPhone] = useState("");

  const [otp, setOtp] = useState("");

  const [otpSent, setOtpSent] =
    useState(false);

  /* ---------------------------
      Send Email OTP
  ---------------------------- */

  const sendEmailOtp = async () => {
    if (!email) {
      toast.error("Enter your email first");
      return;
    }

    try {
      const response = await fetch(
        "https://vurshcart.onrender.com/send-otp",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setEmailOtpSent(true);
        toast.success(
          "OTP sent successfully"
        );
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error(
        "Unable to send OTP"
      );
    }
  };
    /* ---------------------------
      Verify Email OTP
  ---------------------------- */

  const verifyEmailOtp = async () => {
    if (!emailOtp) {
      toast.error("Enter the OTP");
      return;
    }

    try {
      const response = await fetch(
        "https://vurshcart.onrender.com/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
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

        toast.success(
          "Email Verified Successfully"
        );
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error(
        "OTP Verification Failed"
      );
    }
  };

  /* ---------------------------
      Login / Register
  ---------------------------- */

  const onSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (mode === "signup") {
      if (!emailVerified) {
        toast.error(
          "Verify your email first."
        );
        return;
      }

      if (!fullName.trim()) {
        toast.error(
          "Enter your full name."
        );
        return;
      }

      if (!password) {
        toast.error(
          "Enter your password."
        );
        return;
      }

      if (password.length < 8) {
        toast.error(
          "Password should be at least 8 characters."
        );
        return;
      }

      if (password !== confirmPassword) {
        toast.error(
          "Passwords do not match."
        );
        return;
      }
    }

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
              role: asSeller
                ? "seller"
                : "user",
            };

      const response = await fetch(
        url,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();
            if (data.success) {
        if (mode === "signin") {
          localStorage.setItem(
            "user",
            JSON.stringify(data.user)
          );

          toast.success(
            "Welcome back!"
          );

          navigate("/");
        } else {
          toast.success(
            "Account Created Successfully"
          );

          setMode("signin");

          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setFullName("");

          setEmailOtp("");
          setEmailOtpSent(false);
          setEmailVerified(false);
          setAsSeller(false);
        }
      } else {
        toast.error(
          data.message ||
            "Something went wrong."
        );
      }
    } catch (error) {
      console.error(error);

      toast.error(
        "Server Error"
      );
    }

    setLoading(false);
  };

  /* ---------------------------
      Google / Apple Login
  ---------------------------- */

  const onOAuth = async (
    fn: () => Promise<void>
  ) => {
    setLoading(true);

    try {
      await fn();
    } catch (error: any) {
      toast.error(error.message);
    }

    setLoading(false);
  };

  /* ---------------------------
      Phone Login
  ---------------------------- */

  const onPhone = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      if (!otpSent) {
        await signInWithPhone(phone);

        setOtpSent(true);

        toast.success(
          "OTP Sent Successfully"
        );
      } else {
        await verifyPhoneOtp(
          phone,
          otp
        );

        toast.success(
          "Welcome!"
        );

        navigate("/");
      }
    } catch (error: any) {
      toast.error(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-black">

      {/* ===========================
              LEFT SIDE
      =========================== */}

      <div className="hidden lg:flex relative overflow-hidden bg-gradient-to-br from-black via-zinc-900 to-black">

        <div className="absolute inset-0">

          <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-white/5 blur-3xl" />

          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white/5 blur-3xl" />

        </div>

        <div className="relative z-10 flex flex-col justify-between h-full p-14">

          <div>

            <Link to="/">
              <Logo />
            </Link>

          </div>

          <div className="space-y-8">

            <div className="space-y-5">

              <h1 className="text-6xl font-black text-white leading-tight">
                Shop.
                <br />
                Sell.
                <br />
                Grow.
              </h1>

              <p className="text-lg text-gray-300 max-w-md">
                India's next-generation AI powered
                marketplace built for trusted buyers,
                verified sellers and seamless shopping.
              </p>

            </div>
                        <div className="grid grid-cols-2 gap-5">

              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5">

                <ShieldCheck className="h-10 w-10 text-white mb-4" />

                <h3 className="text-lg font-semibold text-white">
                  Secure Registration
                </h3>

                <p className="text-sm text-gray-400 mt-2">
                  Email OTP verification keeps every
                  account safe and trusted.
                </p>

              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5">

                <BadgeCheck className="h-10 w-10 text-white mb-4" />

                <h3 className="text-lg font-semibold text-white">
                  Verified Accounts
                </h3>

                <p className="text-sm text-gray-400 mt-2">
                  Every customer is authenticated
                  before joining VrushKart.
                </p>

              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5">

                <ShoppingBag className="h-10 w-10 text-white mb-4" />

                <h3 className="text-lg font-semibold text-white">
                  Premium Shopping
                </h3>

                <p className="text-sm text-gray-400 mt-2">
                  Millions of products with a luxury
                  shopping experience.
                </p>

              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5">

                <Sparkles className="h-10 w-10 text-white mb-4" />

                <h3 className="text-lg font-semibold text-white">
                  AI Powered
                </h3>

                <p className="text-sm text-gray-400 mt-2">
                  Personalized recommendations
                  powered by artificial intelligence.
                </p>

              </div>

            </div>

          </div>

          <div className="text-gray-500 text-sm">

            © {new Date().getFullYear()} VrushKart.
            All rights reserved.

          </div>

        </div>

      </div>

      {/* ===========================
            RIGHT SIDE
      =========================== */}

      <div className="flex items-center justify-center bg-white px-8 py-12">

        <div className="w-full max-w-md">

          <div className="lg:hidden mb-8">

            <Logo />

          </div>

          <h2 className="text-4xl font-bold tracking-tight">

            {mode === "signin"
              ? "Welcome Back"
              : "Create Account"}

          </h2>

          <p className="text-gray-500 mt-3">

            {mode === "signin"
              ? "Login to continue shopping."
              : "Create your secure VrushKart account."}

          </p>

          <Tabs
            defaultValue="email"
            className="mt-8"
          >

            <TabsList className="grid w-full grid-cols-2">

              <TabsTrigger value="email">

                <Mail className="mr-2 h-4 w-4" />

                Email

              </TabsTrigger>

              <TabsTrigger value="phone">

                <Phone className="mr-2 h-4 w-4" />

                Phone

              </TabsTrigger>

            </TabsList>

            <TabsContent
              value="email"
              className="mt-6"
            >

              <form
                onSubmit={onSubmit}
                className="space-y-5"
              >
                                {mode === "signup" ? (
                  <>
                    {/* STEP 1 - EMAIL */}

                    <div>
                      <Label>Email Address</Label>

                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) =>
                          setEmail(e.target.value)
                        }
                        disabled={emailVerified}
                        required
                      />
                    </div>

                    {!emailOtpSent && (
                      <Button
                        type="button"
                        className="w-full h-11"
                        onClick={sendEmailOtp}
                      >
                        Send OTP
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    )}

                    {/* STEP 2 - VERIFY OTP */}

                    {emailOtpSent && !emailVerified && (
                      <>
                        <div>
                          <Label>Email OTP</Label>

                          <Input
                            placeholder="Enter 6 digit OTP"
                            value={emailOtp}
                            onChange={(e) =>
                              setEmailOtp(
                                e.target.value
                              )
                            }
                          />
                        </div>

                        <Button
                          type="button"
                          variant="outline"
                          className="w-full h-11"
                          onClick={verifyEmailOtp}
                        >
                          Verify OTP
                        </Button>
                      </>
                    )}

                    {/* STEP 3 - ACCOUNT DETAILS */}

                    {emailVerified && (
                      <>
                        <div className="rounded-xl border border-green-300 bg-green-50 p-3 text-sm text-green-700">
                          ✓ Email verified successfully
                        </div>

                        <div>
                          <Label>Full Name</Label>

                          <Input
                            placeholder="Enter full name"
                            value={fullName}
                            onChange={(e) =>
                              setFullName(
                                e.target.value
                              )
                            }
                            required
                          />
                        </div>

                        <div>
                          <Label>Password</Label>

                          <Input
                            type="password"
                            placeholder="Create password"
                            value={password}
                            onChange={(e) =>
                              setPassword(
                                e.target.value
                              )
                            }
                            required
                          />
                        </div>

                        <div>
                          <Label>
                            Confirm Password
                          </Label>

                          <Input
                            type="password"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) =>
                              setConfirmPassword(
                                e.target.value
                              )
                            }
                            required
                          />
                        </div>

                        <label className="flex items-center gap-3 text-sm cursor-pointer">

                          <input
                            type="checkbox"
                            checked={asSeller}
                            onChange={(e) =>
                              setAsSeller(
                                e.target.checked
                              )
                            }
                          />

                          Register as Seller

                        </label>

                        <Button
                          type="submit"
                          className="w-full h-11"
                          disabled={loading}
                        >
                          {loading ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                          ) : (
                            "Create Account"
                          )}
                        </Button>
                      </>
                    )}
                                    ) : (
                  <>
                    {/* ======================
                          SIGN IN
                    ======================= */}

                    <div>
                      <Label>Email Address</Label>

                      <Input
                        type="email"
                        placeholder="Enter your email"
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
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) =>
                          setPassword(
                            e.target.value
                          )
                        }
                        required
                      />
                    </div>

                    <div className="flex justify-end">

                      <button
                        type="button"
                        className="text-sm text-black hover:underline"
                      >
                        Forgot Password?
                      </button>

                    </div>

                    <Button
                      type="submit"
                      className="w-full h-11"
                      disabled={loading}
                    >
                      {loading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        "Login"
                      )}
                    </Button>
                  </>
                )}

                <div className="flex items-center my-6">

                  <div className="flex-1 border-t" />

                  <span className="px-4 text-xs text-gray-500 uppercase">
                    OR
                  </span>

                  <div className="flex-1 border-t" />

                </div>

                <div className="grid grid-cols-2 gap-4">

                  <Button
                    type="button"
                    variant="outline"
                    className="h-11"
                    onClick={() =>
                      onOAuth(signInWithGoogle)
                    }
                  >
                    Google
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="h-11"
                    onClick={() =>
                      onOAuth(signInWithApple)
                    }
                  >
                    Apple
                  </Button>

                </div>

                <p className="text-center text-sm mt-8">

                  {mode === "signin"
                    ? "Don't have an account?"
                    : "Already have an account?"}

                  <button
                    type="button"
                    onClick={() =>
                      setMode(
                        mode === "signin"
                          ? "signup"
                          : "signin"
                      )
                    }
                    className="ml-2 font-semibold underline"
                  >
                    {mode === "signin"
                      ? "Create Account"
                      : "Sign In"}
                  </button>

                </p>

              </form>

            </TabsContent>

            {/* ======================
                  PHONE LOGIN
            ======================= */}

            <TabsContent
              value="phone"
              className="mt-6"
            >

              <form
                onSubmit={onPhone}
                className="space-y-5"
              >

                <div>

                  <Label>Phone Number</Label>

                  <Input
                    placeholder="+91 XXXXX XXXXX"
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value)
                    }
                  />

                </div>

                {otpSent && (

                  <div>

                    <Label>OTP</Label>

                    <Input
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) =>
                        setOtp(e.target.value)
                      }
                    />

                  </div>

                )}

                <Button
                  className="w-full h-11"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : otpSent ? (
                    "Verify OTP"
                  ) : (
                    "Send OTP"
                  )}
                </Button>

              </form>

            </TabsContent>

          </Tabs>

        </div>

      </div>

    </div>
  );
}