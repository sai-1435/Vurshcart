import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  ArrowRight,
  Phone,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

type AuthMode = "login" | "signup";

export default function Auth() {
  const navigate = useNavigate();

  const {
    signInWithGoogle,
    signInWithApple,
  } = useAuth();

  const [mode, setMode] = useState<AuthMode>("login");
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [phone, setPhone] = useState("");

  const [showPassword, setShowPassword] =
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
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

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

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-black"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1520607162513-77705c0f0d4f?auto=format&fit=crop&w=2000&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        animation: "zoomBackground 25s ease-in-out infinite alternate",
      }}
    >
      {/* DARK OVERLAY */}

      <div className="absolute inset-0 bg-black/70" />

      {/* GRADIENT */}

      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />

      {/* TOP LOGO */}

      <div className="absolute left-10 top-8 z-20">

        <h1 className="text-5xl font-black tracking-wider text-red-600">

          VK

        </h1>

        <p className="text-sm tracking-[10px] text-white">

          VRUSHKART

        </p>

      </div>

      {/* LOGIN CARD */}

      <div className="relative z-20 flex min-h-screen items-center justify-center">

        <div
          className="
          w-full
          max-w-md
          rounded-md
          border
          border-white/10
          bg-black/70
          p-14
          shadow-[0_0_60px_rgba(0,0,0,0.7)]
          backdrop-blur-md
        "
        >

          <h2 className="mb-10 text-4xl font-bold text-white">

            {mode === "login"
              ? "Sign In"
              : "Create Account"}

          </h2>

          {mode === "login" && (
            <>

              {/* EMAIL */}

              <div className="mb-5">

                <Label className="mb-2 block text-white">

                  Email

                </Label>

                <div className="relative">

                  <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                  <Input
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="Email"
                    className="
                      h-14
                      border-gray-600
                      bg-[#333]
                      pl-12
                      text-white
                      placeholder:text-gray-400
                      focus:border-red-600
                    "
                  />

                </div>

              </div>

              {/* PASSWORD */}

              <div className="mb-8">

                <Label className="mb-2 block text-white">

                  Password

                </Label>

                <div className="relative">

                  <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

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
                    placeholder="Password"
                    className="
                      h-14
                      border-gray-600
                      bg-[#333]
                      pl-12
                      pr-12
                      text-white
                      placeholder:text-gray-400
                      focus:border-red-600
                    "
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-300" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-300" />
                    )}
                  </button>

                </div>

              </div>
                            {/* Remember Me */}

              <div className="mb-6 flex items-center justify-between">

                <label className="flex items-center gap-2 text-sm text-gray-300">

                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-500 bg-[#333]"
                  />

                  Remember me

                </label>

                <button
                  className="text-sm text-gray-300 transition hover:text-white"
                >
                  Forgot Password?
                </button>

              </div>

              {/* LOGIN BUTTON */}

              <Button
                onClick={handleLogin}
                disabled={loading}
                className="
                  h-14
                  w-full
                  rounded
                  bg-[#E50914]
                  text-base
                  font-semibold
                  transition-all
                  duration-300
                  hover:bg-[#F6121D]
                  hover:scale-[1.02]
                  active:scale-100
                "
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>

              {/* OR */}

              <div className="my-8 flex items-center">

                <div className="h-px flex-1 bg-gray-700" />

                <span className="px-4 text-sm text-gray-400">

                  OR

                </span>

                <div className="h-px flex-1 bg-gray-700" />

              </div>

              {/* GOOGLE */}

              <Button
                variant="outline"
                onClick={signInWithGoogle}
                className="
                  mb-4
                  h-14
                  w-full
                  border-gray-600
                  bg-[#222]
                  text-white
                  hover:bg-[#333]
                "
              >
                Continue with Google
              </Button>

              {/* APPLE */}

              <Button
                variant="outline"
                onClick={signInWithApple}
                className="
                  mb-4
                  h-14
                  w-full
                  border-gray-600
                  bg-[#222]
                  text-white
                  hover:bg-[#333]
                "
              >
                Continue with Apple
              </Button>

              {/* PHONE */}

              <div className="mb-6">

                <Label className="mb-2 block text-white">

                  Phone Number

                </Label>

                <div className="relative">

                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

                  <Input
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value)
                    }
                    placeholder="+91 9876543210"
                    className="
                      h-14
                      border-gray-600
                      bg-[#333]
                      pl-12
                      text-white
                      placeholder:text-gray-400
                    "
                  />

                </div>

              </div>

              <Button
                variant="outline"
                className="
                  h-14
                  w-full
                  border-gray-600
                  bg-[#222]
                  text-white
                  hover:bg-[#333]
                "
              >
                Continue with Phone
              </Button>

              {/* SIGN UP */}

              <div className="mt-10 text-center">

                <span className="text-gray-400">

                  New to VrushKart?

                </span>

                <button
                  onClick={() => setMode("signup")}
                  className="
                    ml-2
                    font-semibold
                    text-white
                    transition
                    hover:text-[#E50914]
                  "
                >
                  Sign up now
                </button>

              </div>

              {/* CAPTCHA */}

              <p className="mt-8 text-center text-xs leading-6 text-gray-500">

                This page is protected by Google reCAPTCHA to ensure
                you're not a bot.

              </p>

            </>
          )}

          {/* SIGNUP */}

          {mode === "signup" && (

            <>

              <h2 className="mb-8 text-4xl font-bold text-white">

                Create Account

              </h2>

              {/* NAME */}

              <div className="mb-5">

                <Label className="mb-2 block text-white">

                  Full Name

                </Label>

                <div className="relative">

                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

                  <Input
                    value={fullName}
                    onChange={(e) =>
                      setFullName(e.target.value)
                    }
                    placeholder="Full Name"
                    className="
                      h-14
                      border-gray-600
                      bg-[#333]
                      pl-12
                      text-white
                    "
                  />

                </div>

              </div>

              {/* EMAIL */}

              <div className="mb-5">

                <Label className="mb-2 block text-white">

                  Email

                </Label>

                <div className="relative">

                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

                  <Input
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="Email"
                    className="
                      h-14
                      border-gray-600
                      bg-[#333]
                      pl-12
                      text-white
                    "
                  />

                </div>

              </div>
                            {/* PASSWORD */}

              <div className="mb-5">

                <Label className="mb-2 block text-white">

                  Password

                </Label>

                <div className="relative">

                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

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
                    placeholder="Create Password"
                    className="
                      h-14
                      border-gray-600
                      bg-[#333]
                      pl-12
                      pr-12
                      text-white
                      placeholder:text-gray-400
                    "
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-300" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-300" />
                    )}
                  </button>

                </div>

              </div>

              {/* CONFIRM PASSWORD */}

              <div className="mb-6">

                <Label className="mb-2 block text-white">

                  Confirm Password

                </Label>

                <div className="relative">

                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

                  <Input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(
                        e.target.value
                      )
                    }
                    placeholder="Confirm Password"
                    className="
                      h-14
                      border-gray-600
                      bg-[#333]
                      pl-12
                      text-white
                      placeholder:text-gray-400
                    "
                  />

                </div>

              </div>

              {/* SELLER OPTION */}

              <label
                className="
                  mb-8
                  flex
                  cursor-pointer
                  items-center
                  gap-3
                  rounded-md
                  border
                  border-gray-700
                  bg-[#222]
                  p-4
                  transition
                  hover:border-red-600
                "
              >

                <input
                  type="checkbox"
                  className="h-5 w-5 accent-red-600"
                />

                <div>

                  <p className="font-semibold text-white">

                    Register as Seller

                  </p>

                  <p className="text-sm text-gray-400">

                    Open your premium store on
                    VrushKart Marketplace

                  </p>

                </div>

              </label>

              {/* CREATE ACCOUNT */}

              <Button
                className="
                  h-14
                  w-full
                  rounded
                  bg-[#E50914]
                  text-base
                  font-semibold
                  hover:bg-[#F6121D]
                  transition-all
                  duration-300
                  hover:scale-[1.02]
                "
              >

                Create Account

                <ArrowRight className="ml-2 h-5 w-5" />

              </Button>

              {/* DIVIDER */}

              <div className="my-8 flex items-center">

                <div className="h-px flex-1 bg-gray-700" />

                <span className="px-4 text-sm text-gray-400">

                  OR

                </span>

                <div className="h-px flex-1 bg-gray-700" />

              </div>

              {/* GOOGLE */}

              <Button
                variant="outline"
                onClick={signInWithGoogle}
                className="
                  mb-4
                  h-14
                  w-full
                  border-gray-600
                  bg-[#222]
                  text-white
                  hover:bg-[#333]
                "
              >

                Continue with Google

              </Button>

              {/* APPLE */}

              <Button
                variant="outline"
                onClick={signInWithApple}
                className="
                  h-14
                  w-full
                  border-gray-600
                  bg-[#222]
                  text-white
                  hover:bg-[#333]
                "
              >

                Continue with Apple

              </Button>

              {/* LOGIN LINK */}

              <div className="mt-10 text-center">

                <span className="text-gray-400">

                  Already have an account?

                </span>

                <button
                  onClick={() =>
                    setMode("login")
                  }
                  className="
                    ml-2
                    font-semibold
                    text-white
                    hover:text-[#E50914]
                  "
                >

                  Sign In

                </button>

              </div>

            </>

          )}

        </div>

      </div>

      {/* NETFLIX STYLE DARK SHADOW */}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/70 to-transparent" />

      {/* TOP SHADOW */}

      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black via-black/60 to-transparent" />

      {/* BACKGROUND ANIMATION */}

      <style>{`

      @keyframes zoomBackground{

          0%{

             transform:scale(1);

          }

          100%{

             transform:scale(1.08);

          }

      }

      `}</style>

    </div>

  );

}
