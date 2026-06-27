import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
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
  Apple,
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
    signInWithPhone,
    verifyPhoneOtp,
  } = useAuth();

  const [mode, setMode] =
    useState<AuthMode>("login");

  const [loading, setLoading] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [fullName, setFullName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [otp, setOtp] =
    useState("");

  const [otpSent, setOtpSent] =
    useState(false);

  const [isSeller, setIsSeller] =
    useState(false);

  const handleLogin = async () => {

    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

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
    const handleSignup = async () => {

    if (!fullName.trim()) {
      toast.error("Enter your full name");
      return;
    }

    if (!email.trim()) {
      toast.error("Enter your email");
      return;
    }

    if (!password) {
      toast.error("Enter password");
      return;
    }

    if (password.length < 6) {
      toast.error("Password should be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {

      setLoading(true);

      const response = await fetch(
        "https://vurshcart.onrender.com/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName,
            email,
            password,
            seller: isSeller,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {

        toast.success(
          "Account Created Successfully"
        );

        setMode("login");

        setFullName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

      } else {

        toast.error(data.message);

      }

    } catch {

      toast.error(
        "Registration Failed"
      );

    } finally {

      setLoading(false);

    }

  };

  const handlePhoneLogin = async () => {

    if (!otpSent) {

      if (!phone.trim()) {

        toast.error("Enter phone number");

        return;

      }

      try {

        setLoading(true);

        await signInWithPhone(phone);

        setOtpSent(true);

        toast.success(
          "OTP Sent Successfully"
        );

      } catch {

        toast.error(
          "Unable to send OTP"
        );

      } finally {

        setLoading(false);

      }

      return;

    }

    try {

      setLoading(true);

      await verifyPhoneOtp(otp);

      toast.success(
        "Phone Verified"
      );

      navigate("/");

    } catch {

      toast.error(
        "Invalid OTP"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="h-screen w-screen overflow-hidden bg-black">

      <div className="grid h-full w-full grid-cols-12">

        {/* LEFT SIDE */}

        <div className="relative col-span-7 overflow-hidden">
                  {/* ========================================= */}
        {/* PREMIUM LEFT HERO SECTION */}
        {/* ========================================= */}

          {/* Background Image */}

          <img
            src="/images/auth-bg.jpg"
            alt="VrushKart"
            className="
              hero-image
              absolute
              inset-0
              h-full
              w-full
              object-cover
              grayscale
              brightness-[0.38]
              contrast-125
            "
          />

          {/* Dark Overlay */}

          <div className="absolute inset-0 bg-black/45" />

          {/* Luxury Gradient */}

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-r
              from-black
              via-black/70
              to-transparent
            "
          />

          {/* Decorative Blur */}

          <div
            className="
              absolute
              -left-40
              top-1/2
              h-[600px]
              w-[600px]
              rounded-full
              bg-white/5
              blur-[120px]
            "
          />

          {/* Main Content */}

          <div
            className="
              relative
              z-20
              flex
              h-full
              flex-col
              justify-between
              p-20
            "
          >

            {/* Logo */}

            <div>

              <h1
                className="
                  text-[92px]
                  font-black
                  tracking-[-8px]
                  text-white
                  select-none
                "
              >

                VK

              </h1>

              <div
                className="
                  mt-4
                  h-[2px]
                  w-28
                  rounded-full
                  bg-white
                "
              />

            </div>

            {/* Hero Text */}

            <div className="max-w-xl">

              <p
                className="
                  mb-8
                  text-sm
                  uppercase
                  tracking-[12px]
                  text-neutral-400
                "
              >

                PREMIUM AI MARKETPLACE

              </p>

              <h2
                className="
                  text-7xl
                  font-black
                  leading-[82px]
                  tracking-tight
                  text-white
                "
              >

                Shop

                <br />

                Smarter.

                <br />

                Live Better.

              </h2>

              <p
                className="
                  mt-10
                  max-w-lg
                  text-lg
                  leading-9
                  text-neutral-300
                "
              >

                India's premium AI-powered marketplace
                delivering luxury shopping experiences,
                trusted sellers, secure payments,
                and lightning-fast delivery.

              </p>

            </div>

            {/* Bottom Statistics */}

            <div className="flex gap-14">

              <div>

                <h3 className="text-5xl font-bold text-white">

                  500K+

                </h3>

                <p className="mt-3 text-neutral-400">

                  Happy Customers

                </p>

              </div>

              <div className="h-14 w-px bg-white/20" />

              <div>

                <h3 className="text-5xl font-bold text-white">

                  25K+

                </h3>

                <p className="mt-3 text-neutral-400">

                  Premium Sellers

                </p>

              </div>

              <div className="h-14 w-px bg-white/20" />

              <div>

                <h3 className="text-5xl font-bold text-white">

                  4.9★

                </h3>

                <p className="mt-3 text-neutral-400">

                  Customer Rating

                </p>

              </div>

            </div>

          </div>

        </div>
                {/* ========================================= */}
        {/* RIGHT LOGIN PANEL */}
        {/* ========================================= */}

        <div className="col-span-5 flex items-center justify-center bg-[#050505]">

          <div
            className="
              relative
              w-[520px]
              rounded-[36px]
              border
              border-white/10
              bg-white/[0.04]
              p-14
              backdrop-blur-3xl
              shadow-[0_35px_120px_rgba(0,0,0,.85)]
            "
          >

            {/* Glow */}

            <div
              className="
                absolute
                inset-0
                rounded-[36px]
                border
                border-white/5
                pointer-events-none
              "
            />

            {/* Header */}

            <div className="mb-10">

              <p className="text-sm uppercase tracking-[8px] text-neutral-500">

                Welcome

              </p>

              <h2 className="mt-3 text-5xl font-black text-white">

                {mode === "login"
                  ? "Sign In"
                  : "Create Account"}

              </h2>

              <p className="mt-4 text-neutral-400">

                Continue your premium shopping experience.

              </p>

            </div>

            {/* Tabs */}

            <div
              className="
                mb-10
                grid
                grid-cols-2
                rounded-2xl
                bg-white/[0.05]
                p-1
              "
            >

              <button
                onClick={() =>
                  setMode("login")
                }
                className={`rounded-xl py-4 text-sm font-semibold transition-all duration-300 ${
                  mode === "login"
                    ? "bg-white text-black shadow-lg"
                    : "text-neutral-500 hover:text-white"
                }`}
              >

                Login

              </button>

              <button
                onClick={() =>
                  setMode("signup")
                }
                className={`rounded-xl py-4 text-sm font-semibold transition-all duration-300 ${
                  mode === "signup"
                    ? "bg-white text-black shadow-lg"
                    : "text-neutral-500 hover:text-white"
                }`}
              >

                Register

              </button>

            </div>

            {mode === "login" && (

              <>

                {/* EMAIL */}

                <div className="mb-6">

                  <Label className="mb-3 block text-neutral-300">

                    EMAIL

                  </Label>

                  <div className="relative">

                    <Mail
                      className="
                        absolute
                        left-5
                        top-1/2
                        -translate-y-1/2
                        h-5
                        w-5
                        text-neutral-500
                      "
                    />

                    <Input
                      value={email}
                      onChange={(e)=>
                        setEmail(e.target.value)
                      }
                      placeholder="Enter email"
                      className="
                        h-16
                        rounded-2xl
                        border-white/10
                        bg-white/[0.04]
                        pl-14
                        pr-4
                        text-white
                        placeholder:text-neutral-500
                        focus:border-white
                      "
                    />

                  </div>

                </div>

                {/* PASSWORD */}

                <div className="mb-8">

                  <Label className="mb-3 block text-neutral-300">

                    PASSWORD

                  </Label>

                  <div className="relative">

                    <Lock
                      className="
                        absolute
                        left-5
                        top-1/2
                        -translate-y-1/2
                        h-5
                        w-5
                        text-neutral-500
                      "
                    />

                    <Input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      value={password}
                      onChange={(e)=>
                        setPassword(
                          e.target.value
                        )
                      }
                      placeholder="Password"
                      className="
                        h-16
                        rounded-2xl
                        border-white/10
                        bg-white/[0.04]
                        pl-14
                        pr-14
                        text-white
                        placeholder:text-neutral-500
                      "
                    />

                    <button
                      type="button"
                      onClick={()=>
                        setShowPassword(
                          !showPassword
                        )
                      }
                      className="
                        absolute
                        right-5
                        top-1/2
                        -translate-y-1/2
                        text-neutral-500
                        hover:text-white
                      "
                    >

                      {showPassword ? (

                        <EyeOff className="h-5 w-5"/>

                      ) : (

                        <Eye className="h-5 w-5"/>

                      )}

                    </button>

                  </div>

                </div>
                                {/* OPTIONS */}

                <div className="mb-8 flex items-center justify-between">

                  <label className="flex items-center gap-3">

                    <input
                      type="checkbox"
                      className="h-4 w-4 accent-white"
                    />

                    <span className="text-sm text-neutral-400">

                      Remember Me

                    </span>

                  </label>

                  <button
                    className="
                      text-sm
                      text-neutral-400
                      transition-all
                      hover:text-white
                    "
                  >

                    Forgot Password?

                  </button>

                </div>

                {/* LOGIN BUTTON */}

                <Button
                  onClick={handleLogin}
                  disabled={loading}
                  className="
                    group
                    h-16
                    w-full
                    rounded-2xl
                    bg-white
                    text-lg
                    font-bold
                    text-black
                    transition-all
                    duration-300
                    hover:scale-[1.02]
                    hover:bg-neutral-200
                  "
                >

                  {loading ? (

                    <Loader2 className="h-6 w-6 animate-spin" />

                  ) : (

                    <>

                      Sign In

                      <ArrowRight
                        className="
                          ml-3
                          h-5
                          w-5
                          transition-all
                          duration-300
                          group-hover:translate-x-1
                        "
                      />

                    </>

                  )}

                </Button>

                {/* DIVIDER */}

                <div className="relative my-10">

                  <div className="absolute inset-0 flex items-center">

                    <div className="w-full border-t border-white/10" />

                  </div>

                  <div className="relative flex justify-center">

                    <span
                      className="
                        bg-[#050505]
                        px-5
                        text-xs
                        tracking-[5px]
                        text-neutral-500
                      "
                    >

                      CONTINUE WITH

                    </span>

                  </div>

                </div>

                {/* GOOGLE */}

                <Button
                  variant="outline"
                  onClick={signInWithGoogle}
                  className="
                    mb-4
                    h-15
                    w-full
                    justify-start
                    rounded-2xl
                    border-white/10
                    bg-white/[0.03]
                    px-6
                    text-white
                    hover:bg-white/[0.08]
                  "
                >

                  <FcGoogle className="mr-4 text-xl" />

                  Continue with Google

                </Button>

                {/* APPLE */}

                <Button
                  variant="outline"
                  onClick={signInWithApple}
                  className="
                    mb-4
                    h-15
                    w-full
                    justify-start
                    rounded-2xl
                    border-white/10
                    bg-white/[0.03]
                    px-6
                    text-white
                    hover:bg-white/[0.08]
                  "
                >

                  <FaApple className="mr-4 text-xl" />

Continue with Apple

                </Button>

                {/* PHONE */}

                <Button
                  variant="outline"
                  onClick={handlePhoneLogin}
                  className="
                    mb-4
                    h-15
                    w-full
                    justify-start
                    rounded-2xl
                    border-white/10
                    bg-white/[0.03]
                    px-6
                    text-white
                    hover:bg-white/[0.08]
                  "
                >

                  <Phone className="mr-4 h-5 w-5"/>

                  Continue with Phone

                </Button>

                {/* EMAIL LINK */}

                <Button
                  variant="outline"
                  className="
                    h-15
                    w-full
                    justify-start
                    rounded-2xl
                    border-white/10
                    bg-white/[0.03]
                    px-6
                    text-white
                    hover:bg-white/[0.08]
                  "
                >

                  <Mail className="mr-4 h-5 w-5"/>

                  Continue with Email

                </Button>

                {/* FOOTER */}

                <div className="mt-10 text-center">

                  <span className="text-neutral-500">

                    New to VrushKart?

                  </span>

                  <button
                    onClick={() =>
                      setMode("signup")
                    }
                    className="
                      ml-2
                      font-semibold
                      text-white
                      hover:text-neutral-300
                    "
                  >

                    Create Account

                  </button>

                </div>

              </>

            )}
                        {/* ========================= */}
            {/* SIGNUP FORM */}
            {/* ========================= */}

            {mode === "signup" && (

              <>

                <div className="mb-10">

                  <p className="text-sm uppercase tracking-[8px] text-neutral-500">

                    Join VrushKart

                  </p>

                  <h2 className="mt-3 text-5xl font-black text-white">

                    Create Account

                  </h2>

                  <p className="mt-4 text-neutral-400">

                    Start your premium shopping journey.

                  </p>

                </div>

                {/* NAME */}

                <div className="mb-6">

                  <Label className="mb-3 block text-neutral-300">

                    FULL NAME

                  </Label>

                  <div className="relative">

                    <User
                      className="
                        absolute
                        left-5
                        top-1/2
                        -translate-y-1/2
                        h-5
                        w-5
                        text-neutral-500
                      "
                    />

                    <Input
                      value={fullName}
                      onChange={(e)=>
                        setFullName(e.target.value)
                      }
                      placeholder="John Doe"
                      className="
                        h-16
                        rounded-2xl
                        border-white/10
                        bg-white/[0.04]
                        pl-14
                        text-white
                        placeholder:text-neutral-500
                      "
                    />

                  </div>

                </div>

                {/* EMAIL */}

                <div className="mb-6">

                  <Label className="mb-3 block text-neutral-300">

                    EMAIL ADDRESS

                  </Label>

                  <div className="relative">

                    <Mail
                      className="
                        absolute
                        left-5
                        top-1/2
                        -translate-y-1/2
                        h-5
                        w-5
                        text-neutral-500
                      "
                    />

                    <Input
                      value={email}
                      onChange={(e)=>
                        setEmail(e.target.value)
                      }
                      placeholder="john@gmail.com"
                      className="
                        h-16
                        rounded-2xl
                        border-white/10
                        bg-white/[0.04]
                        pl-14
                        text-white
                      "
                    />

                  </div>

                </div>

                {/* PASSWORD */}

                <div className="mb-6">

                  <Label className="mb-3 block text-neutral-300">

                    PASSWORD

                  </Label>

                  <div className="relative">

                    <Lock
                      className="
                        absolute
                        left-5
                        top-1/2
                        -translate-y-1/2
                        h-5
                        w-5
                        text-neutral-500
                      "
                    />

                    <Input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      value={password}
                      onChange={(e)=>
                        setPassword(e.target.value)
                      }
                      placeholder="Password"
                      className="
                        h-16
                        rounded-2xl
                        border-white/10
                        bg-white/[0.04]
                        pl-14
                        pr-14
                        text-white
                      "
                    />

                    <button
                      type="button"
                      onClick={()=>
                        setShowPassword(!showPassword)
                      }
                      className="
                        absolute
                        right-5
                        top-1/2
                        -translate-y-1/2
                      "
                    >

                      {showPassword ? (

                        <EyeOff className="h-5 w-5 text-neutral-400"/>

                      ) : (

                        <Eye className="h-5 w-5 text-neutral-400"/>

                      )}

                    </button>

                  </div>

                </div>

                {/* CONFIRM PASSWORD */}

                <div className="mb-6">

                  <Label className="mb-3 block text-neutral-300">

                    CONFIRM PASSWORD

                  </Label>

                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e)=>
                      setConfirmPassword(e.target.value)
                    }
                    placeholder="Confirm Password"
                    className="
                      h-16
                      rounded-2xl
                      border-white/10
                      bg-white/[0.04]
                      text-white
                    "
                  />

                </div>
                                {/* SELLER OPTION */}

                <label
                  className="
                    mb-8
                    flex
                    cursor-pointer
                    items-center
                    gap-5
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.03]
                    p-6
                    transition-all
                    duration-300
                    hover:border-white/20
                    hover:bg-white/[0.05]
                  "
                >

                  <input
                    type="checkbox"
                    checked={isSeller}
                    onChange={(e)=>
                      setIsSeller(e.target.checked)
                    }
                    className="h-5 w-5 accent-white"
                  />

                  <div>

                    <h3 className="text-lg font-semibold text-white">

                      Register as Seller

                    </h3>

                    <p className="mt-2 text-sm leading-6 text-neutral-400">

                      Create your own premium store and
                      start selling products across India.

                    </p>

                  </div>

                </label>

                {/* CREATE ACCOUNT */}

                <Button
                  onClick={handleSignup}
                  disabled={loading}
                  className="
                    group
                    h-16
                    w-full
                    rounded-2xl
                    bg-white
                    text-lg
                    font-bold
                    text-black
                    transition-all
                    duration-300
                    hover:scale-[1.02]
                    hover:bg-neutral-200
                  "
                >

                  {loading ? (

                    <Loader2 className="h-6 w-6 animate-spin"/>

                  ) : (

                    <>

                      Create Account

                      <ArrowRight
                        className="
                          ml-3
                          h-5
                          w-5
                          transition-all
                          duration-300
                          group-hover:translate-x-1
                        "
                      />

                    </>

                  )}

                </Button>

                {/* DIVIDER */}

                <div className="relative my-10">

                  <div className="absolute inset-0 flex items-center">

                    <div className="w-full border-t border-white/10"/>

                  </div>

                  <div className="relative flex justify-center">

                    <span
                      className="
                        bg-[#050505]
                        px-5
                        text-xs
                        tracking-[5px]
                        text-neutral-500
                      "
                    >

                      QUICK SIGN UP

                    </span>

                  </div>

                </div>

                {/* GOOGLE */}

                <Button
                  onClick={signInWithGoogle}
                  variant="outline"
                  className="
                    mb-4
                    h-15
                    w-full
                    justify-start
                    rounded-2xl
                    border-white/10
                    bg-white/[0.03]
                    px-6
                    text-white
                    hover:bg-white/[0.08]
                  "
                >

                  <FcGoogle className="mr-4 text-xl" />

                  Continue with Google

                </Button>

                {/* APPLE */}

                <Button
                  onClick={signInWithApple}
                  variant="outline"
                  className="
                    mb-4
                    h-15
                    w-full
                    justify-start
                    rounded-2xl
                    border-white/10
                    bg-white/[0.03]
                    px-6
                    text-white
                    hover:bg-white/[0.08]
                  "
                >

                  <FaApple className="mr-4 text-xl" />

                  Continue with Apple

                </Button>

                {/* PHONE */}

                <Button
                  onClick={()=>{
                    setMode("login");
                  }}
                  variant="outline"
                  className="
                    h-15
                    w-full
                    justify-start
                    rounded-2xl
                    border-white/10
                    bg-white/[0.03]
                    px-6
                    text-white
                    hover:bg-white/[0.08]
                  "
                >

                  <Phone className="mr-4 h-5 w-5"/>

                  Continue with Phone

                </Button>

                {/* LOGIN */}

                <div className="mt-10 text-center">

                  <span className="text-neutral-500">

                    Already have an account?

                  </span>

                  <button
                    onClick={()=>
                      setMode("login")
                    }
                    className="
                      ml-2
                      font-semibold
                      text-white
                      hover:text-neutral-300
                    "
                  >

                    Login

                  </button>

                </div>

              </>

            )}

          </div>

        </div>

      </div>

      {/* TOP SHADOW */}

      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black via-black/80 to-transparent"/>

      {/* BOTTOM SHADOW */}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent"/>

      {/* BACKGROUND ANIMATION */}

      <style>{`

      @keyframes heroZoom{

        from{

          transform:scale(1);

        }

        to{

          transform:scale(1.08);

        }

      }

      .hero-image{

        animation:heroZoom 20s ease-in-out infinite alternate;

      }

      `}</style>

    </div>

  );

}
