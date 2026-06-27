import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  User,
  Phone,
  Shield,
  Check,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

type AuthMode = "login" | "signup";

export default function Auth() {
  const navigate = useNavigate();

  const {
    signInWithGoogle,
    signInWithApple,
    signInWithPhone,
    verifyPhoneOtp,
  } = useAuth();

  const [mode, setMode] =
    useState<AuthMode>("login");

  const [loading, setLoading] =
    useState(false);

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [fullName, setFullName] =
  useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");

  const [phone, setPhone] =
    useState("");

  const [otp, setOtp] =
    useState("");

  const [otpSent, setOtpSent] =
    useState(false);

  const handleLogin = async () => {
  try {
    setLoading(true);

    const response = await fetch(
      "https://vurshcart.onrender.com/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    if (data.success) {
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success("Welcome Back");
      navigate("/");
    } else {
      toast.error(data.message);
    }
  } catch {
    toast.error("Login Failed");
  } finally {
    setLoading(false);
  }
};

// 👇 ADD THIS WHOLE FUNCTION HERE
const handlePhoneLogin = async () => {
  toast.success("Phone Login Coming Soon");
};

return (


    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center p-8">

      <div className="w-full max-w-7xl h-[820px] rounded-[36px] overflow-hidden bg-white shadow-2xl flex">

        {/* LEFT PANEL */}

        <div className="relative w-[42%] bg-black text-white overflow-hidden">

          <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-900 to-black" />

          {/* Lamp */}

          <div className="absolute top-0 left-1/2 -translate-x-1/2">

            <div className="h-20 w-[2px] bg-neutral-600" />

            <div className="h-20 w-32 rounded-b-full bg-neutral-900 border border-neutral-700 shadow-2xl" />

          </div>

          {/* Brand */}

          <div className="relative z-10 flex h-full flex-col items-center justify-center px-12 text-center">
                        {/* VK Logo */}

            <div className="select-none">

              <h1
                className="text-[92px] font-black tracking-[-8px] leading-none"
                style={{
                  fontFamily:
                    "Georgia, serif",
                }}
              >
                VK
              </h1>

              <p className="mt-2 text-[34px] font-light tracking-[12px] uppercase">

                VRUSHKART

              </p>

            </div>

            <div className="mt-8 h-px w-52 bg-neutral-700 relative">

              <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />

            </div>

            <h2 className="mt-10 text-4xl font-bold leading-tight">

              India's Premium

              <br />

              AI Marketplace

            </h2>

            <p className="mt-6 max-w-sm text-lg leading-8 text-neutral-400">

              Shop smarter, sell faster and
              experience the next generation
              marketplace powered by AI.

            </p>

            <div className="mt-14 flex items-center gap-3 rounded-full border border-neutral-700 px-6 py-4">

              <Shield className="h-6 w-6" />

              <div className="text-left">

                <p className="font-semibold">

                  Trusted Platform

                </p>

                <p className="text-sm text-neutral-400">

                  Secure • Reliable • Fast

                </p>

              </div>

            </div>

          </div>

          {/* Curved Divider */}

          <div className="absolute right-[-170px] top-0 h-full w-[340px] rounded-full bg-white" />

        </div>

        {/* RIGHT PANEL */}

        <div className="relative flex-1 bg-white px-20 py-16">

          <div className="mx-auto max-w-md">

            <div className="mb-12 text-center">

              <h2 className="text-5xl font-bold tracking-tight">

                Welcome Back

              </h2>

              <p className="mt-4 text-lg text-neutral-500">

                Login to your account

              </p>

            </div>

            {/* Tabs */}

            <div className="mb-10 flex rounded-xl bg-neutral-100 p-1">

              <button
                onClick={() =>
                  setMode("login")
                }
                className={`flex-1 rounded-lg py-3 text-sm font-semibold transition ${
                  mode === "login"
                    ? "bg-black text-white"
                    : "text-neutral-600"
                }`}
              >
                Login
              </button>

              <button
                onClick={() =>
                  setMode("signup")
                }
                className={`flex-1 rounded-lg py-3 text-sm font-semibold transition ${
                  mode === "signup"
                    ? "bg-black text-white"
                    : "text-neutral-600"
                }`}
              >
                Create Account
              </button>

            </div>
                        {/* Login */}

            {mode === "login" && (

              <>

                {/* Email */}

                <div className="mb-6">

                  <Label className="mb-2 block font-medium">

                    Email Address

                  </Label>

                  <div className="relative">

                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />

                    <Input
                      type="email"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      placeholder="Enter your email"
                      className="h-14 rounded-2xl border-neutral-300 pl-14 text-base"
                    />

                  </div>

                </div>

                {/* Password */}

                <div>

                  <div className="mb-2 flex items-center justify-between">

                    <Label className="font-medium">

                      Password

                    </Label>

                    <button
                      className="text-sm text-neutral-500 hover:text-black"
                    >
                      Forgot Password?
                    </button>

                  </div>

                  <div className="relative">

                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />

                    <Input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      value={password}
                      onChange={(e) =>
                        setPassword(
                          e.target.value
                        )
                      }
                      placeholder="Enter password"
                      className="h-14 rounded-2xl border-neutral-300 pl-14 pr-14 text-base"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                      className="absolute right-5 top-1/2 -translate-y-1/2"
                    >

                      {showPassword ? (

                        <EyeOff className="h-5 w-5 text-neutral-500" />

                      ) : (

                        <Eye className="h-5 w-5 text-neutral-500" />

                      )}

                    </button>

                  </div>

                </div>

                {/* Login Button */}

                <Button
                  onClick={handleLogin}
                  disabled={loading}
                  className="mt-10 h-14 w-full rounded-2xl bg-black text-base font-semibold hover:bg-neutral-900"
                >

                  {loading ? (

                    <Loader2 className="h-5 w-5 animate-spin" />

                  ) : (

                    <>

                      Login

                      <ArrowRight className="ml-2 h-5 w-5" />

                    </>

                  )}

                </Button>

                {/* Divider */}

                <div className="relative my-10">

                  <div className="absolute inset-0 flex items-center">

                    <div className="w-full border-t border-neutral-200" />

                  </div>

                  <div className="relative flex justify-center">

                    <span className="bg-white px-5 text-sm text-neutral-400">

                      OR CONTINUE WITH

                    </span>

                  </div>

                </div>

                {/* Social Buttons */}

                <div className="grid grid-cols-2 gap-4">

                  <Button
                    variant="outline"
                    onClick={signInWithGoogle}
                    className="h-14 rounded-2xl text-base"
                  >
                    Google
                  </Button>

                  <Button
                    variant="outline"
                    onClick={signInWithApple}
                    className="h-14 rounded-2xl text-base"
                  >
                    Apple
                  </Button>

                </div>
                                {/* Phone Login */}

                <div className="mt-8">

                  <div className="mb-3 flex items-center gap-2">

                    <Phone className="h-5 w-5 text-neutral-500" />

                    <span className="font-medium">

                      Continue with Phone

                    </span>

                  </div>

                  <div className="relative">

                    <Phone className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />

                    <Input
                      value={phone}
                      onChange={(e) =>
                        setPhone(e.target.value)
                      }
                      placeholder="+91 9876543210"
                      className="h-14 rounded-2xl pl-14"
                    />

                  </div>

                  {otpSent && (

                    <Input
                      value={otp}
                      onChange={(e) =>
                        setOtp(e.target.value)
                      }
                      placeholder="Enter OTP"
                      className="mt-4 h-14 rounded-2xl text-center tracking-[10px]"
                    />

                  )}

                  <Button
                    onClick={handlePhoneLogin}
                    disabled={loading}
                    className="mt-4 h-14 w-full rounded-2xl bg-black"
                  >

                    {loading ? (

                      <Loader2 className="h-5 w-5 animate-spin" />

                    ) : otpSent ? (

                      "Verify OTP"

                    ) : (

                      "Send OTP"

                    )}

                  </Button>

                </div>

                {/* Bottom */}

                <div className="mt-10 text-center text-sm text-neutral-600">

                  Don't have an account?

                  <button
                    onClick={() =>
                      setMode("signup")
                    }
                    className="ml-2 font-semibold text-black hover:underline"
                  >

                    Create Account

                  </button>

                </div>

              </>

            )}

            {/* ================= SIGNUP ================= */}

            {mode === "signup" && (

              <>

                <div className="mb-10 text-center">

                  <h2 className="text-5xl font-bold tracking-tight">

                    Create Account

                  </h2>

                  <p className="mt-4 text-lg text-neutral-500">

                    Join the future of shopping

                  </p>

                </div>

                <div className="mb-6">

                  <Label className="mb-2 block">

                    Full Name

                  </Label>

                  <div className="relative">

                    <User className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />

                    <Input
  value={fullName}
  onChange={(e) => setFullName(e.target.value)}
  placeholder="Full Name"
  className="h-14 rounded-2xl pl-14"
/>

                  </div>

                </div>

                <div className="mb-6">

                  <Label className="mb-2 block">

                    Email Address

                  </Label>

                  <div className="relative">

                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />

                    <Input
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="Email Address"
  className="h-14 rounded-2xl pl-14"
/>

                  </div>

                </div>

                <div>

                  <Label className="mb-2 block">

                    Password

                  </Label>

                  <div className="relative">

                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />

                    <Input
  type={showPassword ? "text" : "password"}
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  placeholder="Create Password"
  className="h-14 rounded-2xl pl-14 pr-14"
/>

                  </div>

                </div>
                                <div className="mt-6">

                  <Label className="mb-2 block">

                    Confirm Password

                  </Label>

                  <div className="relative">

                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />

                    <Input
  type={showPassword ? "text" : "password"}
  value={confirmPassword}
  onChange={(e) => setConfirmPassword(e.target.value)}
  placeholder="Confirm Password"
  className="h-14 rounded-2xl pl-14 pr-14"
/>

                  </div>

                </div>

                {/* Seller */}

                <label className="mt-6 flex items-center gap-3 rounded-2xl border border-neutral-200 p-4">

                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded"
                  />

                  <div>

                    <p className="font-semibold">

                      Register as Seller

                    </p>

                    <p className="text-sm text-neutral-500">

                      Open your own store on
                      VrushKart

                    </p>

                  </div>

                </label>

                {/* Register */}

                <Button
                  className="mt-8 h-14 w-full rounded-2xl bg-black text-base font-semibold"
                >

                  Create Account

                  <ArrowRight className="ml-2 h-5 w-5" />

                </Button>

                {/* Divider */}

                <div className="relative my-10">

                  <div className="absolute inset-0 flex items-center">

                    <div className="w-full border-t border-neutral-200" />

                  </div>

                  <div className="relative flex justify-center">

                    <span className="bg-white px-5 text-sm text-neutral-400">

                      OR SIGN UP WITH

                    </span>

                  </div>

                </div>

                <div className="grid grid-cols-2 gap-4">

                  <Button
                    variant="outline"
                    onClick={signInWithGoogle}
                    className="h-14 rounded-2xl"
                  >

                    Google

                  </Button>

                  <Button
                    variant="outline"
                    onClick={signInWithApple}
                    className="h-14 rounded-2xl"
                  >

                    Apple

                  </Button>

                </div>

                <div className="mt-10 text-center text-sm text-neutral-600">

                  Already have an account?

                  <button
                    onClick={() =>
                      setMode("login")
                    }
                    className="ml-2 font-semibold text-black hover:underline"
                  >

                    Login

                  </button>

                </div>

              </>

            )}

          </div>

        </div>

      </div>

    </div>

  );

}