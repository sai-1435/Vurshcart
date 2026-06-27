import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  Phone,
  User,
  ShieldCheck,
  Truck,
  Headphones,
  Award,
} from "lucide-react";

import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

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

  const [mode, setMode] = useState<AuthMode>("login");

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [fullName, setFullName] = useState("");

  const [phone, setPhone] = useState("");

  const [otp, setOtp] = useState("");

  const [otpSent, setOtpSent] = useState(false);

  const [isSeller, setIsSeller] = useState(false);

  const handleLogin = async () => {

    if (!email || !password) {

      toast.error("Please enter email and password.");

      return;

    }

    try {

      setLoading(true);

      // TODO:
      // Replace with your backend API.

      console.log({
        email,
        password,
      });

      toast.success("Login Successful");

      navigate("/");

    } catch (error) {

      toast.error("Unable to login.");

    } finally {

      setLoading(false);

    }

  };
    return (

    <div className="relative h-screen w-screen overflow-hidden bg-black">

      {/* ========================= */}
      {/* BACKGROUND */}
      {/* ========================= */}

      <div className="absolute inset-0 bg-black" />

      {/* ========================= */}
      {/* MAIN GRID */}
      {/* ========================= */}

      <div className="relative z-10 grid h-full w-full grid-cols-12">

        {/* ===================================== */}
        {/* LEFT HERO */}
        {/* ===================================== */}

        <section className="relative col-span-7 overflow-hidden">

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
              brightness-[0.30]
              contrast-125
              select-none
            "
          />

          {/* Dark Overlay */}

          <div className="absolute inset-0 bg-black/55" />

          {/* Gradient */}

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-r
              from-black
              via-black/60
              to-transparent
            "
          />

          {/* Content */}

          <div
            className="
              relative
              z-20
              flex
              h-full
              flex-col
              justify-between
              px-24
              py-20
            "
          >

            {/* ================= */}
            {/* LOGO */}
            {/* ================= */}

            <div>

              <h1
                className="
                  text-[140px]
                  font-thin
                  tracking-[-10px]
                  text-white
                  leading-none
                "
              >

                VK

              </h1>

              <h2
                className="
                  mt-4
                  text-5xl
                  font-light
                  tracking-[12px]
                  text-white
                "
              >

                VRUSHKART

              </h2>

              <div
                className="
                  mt-8
                  h-[2px]
                  w-28
                  rounded-full
                  bg-white
                "
              />

            </div>
                        {/* ========================== */}
            {/* HERO CONTENT */}
            {/* ========================== */}

            <div className="max-w-2xl">

              <p
                className="
                  text-sm
                  uppercase
                  tracking-[12px]
                  text-neutral-400
                "
              >

                PREMIUM SHOPPING EXPERIENCE

              </p>

              <h2
                className="
                  mt-8
                  text-7xl
                  font-black
                  leading-[86px]
                  tracking-tight
                  text-white
                "
              >

                SHOP.

                <br />

                STYLE.

                <br />

                SAVE.

              </h2>

              <p
                className="
                  mt-10
                  max-w-xl
                  text-xl
                  leading-10
                  text-neutral-300
                "
              >

                Experience India's premium marketplace
                where quality products, trusted sellers,
                lightning-fast delivery and secure payments
                come together in one elegant destination.

              </p>

            </div>

            {/* ========================== */}
            {/* FEATURES */}
            {/* ========================== */}

            <div className="flex items-center gap-14">

              <div className="flex flex-col items-center">

                <div
                  className="
                    mb-5
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/15
                    bg-white/[0.03]
                  "
                >

                  <ShieldCheck className="h-7 w-7 text-white"/>

                </div>

                <p className="text-sm tracking-wide text-neutral-300">

                  SECURE

                </p>

                <p className="text-sm tracking-wide text-neutral-300">

                  PAYMENTS

                </p>

              </div>

              <div className="flex flex-col items-center">

                <div
                  className="
                    mb-5
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/15
                    bg-white/[0.03]
                  "
                >

                  <Award className="h-7 w-7 text-white"/>

                </div>

                <p className="text-sm tracking-wide text-neutral-300">

                  PREMIUM

                </p>

                <p className="text-sm tracking-wide text-neutral-300">

                  QUALITY

                </p>

              </div>

              <div className="flex flex-col items-center">

                <div
                  className="
                    mb-5
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/15
                    bg-white/[0.03]
                  "
                >

                  <Truck className="h-7 w-7 text-white"/>

                </div>

                <p className="text-sm tracking-wide text-neutral-300">

                  FAST

                </p>

                <p className="text-sm tracking-wide text-neutral-300">

                  DELIVERY

                </p>

              </div>

              <div className="flex flex-col items-center">

                <div
                  className="
                    mb-5
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/15
                    bg-white/[0.03]
                  "
                >

                  <Headphones className="h-7 w-7 text-white"/>

                </div>

                <p className="text-sm tracking-wide text-neutral-300">

                  24/7

                </p>

                <p className="text-sm tracking-wide text-neutral-300">

                  SUPPORT

                </p>

              </div>

            </div>

          </div>

        </section>

        {/* ===================================== */}
        {/* RIGHT LOGIN PANEL STARTS HERE */}
        {/* ===================================== */}

        <section
          className="
            col-span-5
            flex
            items-center
            justify-center
            bg-[#050505]
          "
        >
                    {/* =============================== */}
          {/* PREMIUM GLASS LOGIN CARD */}
          {/* =============================== */}

          <div
            className="
              relative
              w-[540px]
              rounded-[34px]
              border
              border-white/10
              bg-white/[0.045]
              p-14
              backdrop-blur-3xl
              shadow-[0_30px_120px_rgba(0,0,0,0.85)]
            "
          >

            {/* White Glow */}

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                rounded-[34px]
                border
                border-white/5
              "
            />

            {/* Small Blur */}

            <div
              className="
                absolute
                -right-20
                -top-20
                h-44
                w-44
                rounded-full
                bg-white/5
                blur-[90px]
              "
            />

            {/* ===================== */}
            {/* LOGO */}
            {/* ===================== */}

            <div className="mb-10">

              <div
                className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                "
              >

                <span
                  className="
                    text-3xl
                    font-light
                    tracking-tight
                    text-white
                  "
                >

                  VK

                </span>

              </div>

            </div>

            {/* ===================== */}
            {/* TITLE */}
            {/* ===================== */}

            <h2
              className="
                text-5xl
                font-black
                tracking-tight
                text-white
              "
            >

              Welcome Back

            </h2>

            <p
              className="
                mt-4
                text-lg
                leading-8
                text-neutral-400
              "
            >

              Sign in to continue your premium
              shopping experience.

            </p>

            {/* ===================== */}
            {/* TABS */}
            {/* ===================== */}

            <div
              className="
                mt-12
                mb-10
                grid
                grid-cols-2
                rounded-2xl
                bg-white/[0.05]
                p-1
              "
            >

              <button
                onClick={() => setMode("login")}
                className={`
                  rounded-xl
                  py-4
                  text-sm
                  font-semibold
                  transition-all
                  duration-300

                  ${
                    mode === "login"
                      ? "bg-white text-black"
                      : "text-neutral-400 hover:text-white"
                  }
                `}
              >

                SIGN IN

              </button>

              <button
                onClick={() => setMode("signup")}
                className={`
                  rounded-xl
                  py-4
                  text-sm
                  font-semibold
                  transition-all
                  duration-300

                  ${
                    mode === "signup"
                      ? "bg-white text-black"
                      : "text-neutral-400 hover:text-white"
                  }
                `}
              >

                CREATE ACCOUNT

              </button>

            </div>

            {/* ===================== */}
            {/* LOGIN FORM */}
            {/* ===================== */}

            {mode === "login" && (

              <>
                              {/* ========================= */}
                {/* EMAIL */}
                {/* ========================= */}

                <div className="mb-7">

                  <Label className="mb-3 block text-sm tracking-[3px] text-neutral-300">

                    EMAIL ADDRESS

                  </Label>

                  <div className="group relative">

                    <Mail
                      className="
                        absolute
                        left-5
                        top-1/2
                        -translate-y-1/2
                        h-5
                        w-5
                        text-neutral-500
                        transition-all
                        group-focus-within:text-white
                      "
                    />

                    <Input
                      type="email"
                      value={email}
                      onChange={(e)=>setEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="
                        h-16
                        rounded-2xl
                        border
                        border-white/10
                        bg-white/[0.04]
                        pl-14
                        pr-5
                        text-base
                        text-white
                        placeholder:text-neutral-500
                        transition-all
                        duration-300
                        focus:border-white
                        focus:bg-white/[0.06]
                        focus:ring-0
                      "
                    />

                  </div>

                </div>

                {/* ========================= */}
                {/* PASSWORD */}
                {/* ========================= */}

                <div className="mb-5">

                  <div className="mb-3 flex items-center justify-between">

                    <Label className="text-sm tracking-[3px] text-neutral-300">

                      PASSWORD

                    </Label>

                    <button
                      className="
                        text-sm
                        text-neutral-500
                        transition-all
                        hover:text-white
                      "
                    >

                      Forgot Password?

                    </button>

                  </div>

                  <div className="group relative">

                    <Lock
                      className="
                        absolute
                        left-5
                        top-1/2
                        -translate-y-1/2
                        h-5
                        w-5
                        text-neutral-500
                        transition-all
                        group-focus-within:text-white
                      "
                    />

                    <Input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      value={password}
                      onChange={(e)=>setPassword(e.target.value)}
                      placeholder="Enter Password"
                      className="
                        h-16
                        rounded-2xl
                        border
                        border-white/10
                        bg-white/[0.04]
                        pl-14
                        pr-14
                        text-white
                        placeholder:text-neutral-500
                        transition-all
                        duration-300
                        focus:border-white
                        focus:bg-white/[0.06]
                        focus:ring-0
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
                        text-neutral-500
                        transition-all
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

                {/* ========================= */}
                {/* REMEMBER */}
                {/* ========================= */}

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

                </div>
                                {/* ========================= */}
                {/* SIGN IN BUTTON */}
                {/* ========================= */}

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
                    font-semibold
                    text-black
                    transition-all
                    duration-300
                    hover:scale-[1.02]
                    hover:bg-neutral-200
                    active:scale-[0.99]
                  "
                >

                  {loading ? (

                    <Loader2 className="h-6 w-6 animate-spin"/>

                  ) : (

                    <>

                      Sign In

                      <ArrowRight
                        className="
                          ml-3
                          h-5
                          w-5
                          transition-transform
                          duration-300
                          group-hover:translate-x-1
                        "
                      />

                    </>

                  )}

                </Button>

                {/* ========================= */}
                {/* DIVIDER */}
                {/* ========================= */}

                <div className="relative my-10">

                  <div className="absolute inset-0 flex items-center">

                    <div className="w-full border-t border-white/10"/>

                  </div>

                  <div className="relative flex justify-center">

                    <span
                      className="
                        bg-[#050505]
                        px-6
                        text-xs
                        tracking-[6px]
                        text-neutral-500
                      "
                    >

                      CONTINUE WITH

                    </span>

                  </div>

                </div>

                {/* ========================= */}
                {/* GOOGLE */}
                {/* ========================= */}

                <Button
                  onClick={signInWithGoogle}
                  variant="outline"
                  className="
                    mb-4
                    h-16
                    w-full
                    justify-start
                    rounded-2xl
                    border-white/10
                    bg-white/[0.03]
                    px-6
                    text-white
                    transition-all
                    duration-300
                    hover:border-white/20
                    hover:bg-white/[0.08]
                  "
                >

                  <FcGoogle className="mr-4 text-2xl"/>

                  Continue with Google

                </Button>

                {/* ========================= */}
                {/* APPLE */}
                {/* ========================= */}

                <Button
                  onClick={signInWithApple}
                  variant="outline"
                  className="
                    mb-4
                    h-16
                    w-full
                    justify-start
                    rounded-2xl
                    border-white/10
                    bg-white/[0.03]
                    px-6
                    text-white
                    transition-all
                    duration-300
                    hover:border-white/20
                    hover:bg-white/[0.08]
                  "
                >

                  <FaApple className="mr-4 text-xl"/>

                  Continue with Apple

                </Button>

                {/* ========================= */}
                {/* PHONE */}
                {/* ========================= */}

                <Button
                  onClick={()=>{
                    setPhone("");
                    setOtp("");
                    setOtpSent(false);
                  }}
                  variant="outline"
                  className="
                    mb-4
                    h-16
                    w-full
                    justify-start
                    rounded-2xl
                    border-white/10
                    bg-white/[0.03]
                    px-6
                    text-white
                    transition-all
                    duration-300
                    hover:border-white/20
                    hover:bg-white/[0.08]
                  "
                >

                  <Phone className="mr-4 h-5 w-5"/>

                  Continue with Phone

                </Button>

                {/* ========================= */}
                {/* SIGNUP LINK */}
                {/* ========================= */}

                <div className="mt-10 text-center">

                  <span className="text-neutral-500">

                    New to VrushKart?

                  </span>

                  <button
                    onClick={() => setMode("signup")}
                    className="
                      ml-2
                      font-semibold
                      text-white
                      transition-all
                      hover:text-neutral-300
                    "
                  >

                    Create Account

                  </button>

                </div>

              </>

            )}
                        {/* ========================================= */}
            {/* SIGNUP FORM */}
            {/* ========================================= */}

            {mode === "signup" && (

              <>

                <div className="mb-10">

                  <h2
                    className="
                      text-5xl
                      font-black
                      tracking-tight
                      text-white
                    "
                  >

                    Create Account

                  </h2>

                  <p
                    className="
                      mt-4
                      text-lg
                      text-neutral-400
                    "
                  >

                    Join VrushKart and start shopping.

                  </p>

                </div>

                {/* FULL NAME */}

                <div className="mb-6">

                  <Label className="mb-3 block text-sm tracking-[3px] text-neutral-300">

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
                      onChange={(e)=>setFullName(e.target.value)}
                      placeholder="John Doe"
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

                {/* EMAIL */}

                <div className="mb-6">

                  <Label className="mb-3 block text-sm tracking-[3px] text-neutral-300">

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
                      onChange={(e)=>setEmail(e.target.value)}
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

                  <Label className="mb-3 block text-sm tracking-[3px] text-neutral-300">

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
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e)=>setPassword(e.target.value)}
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
                      onClick={()=>setShowPassword(!showPassword)}
                      className="
                        absolute
                        right-5
                        top-1/2
                        -translate-y-1/2
                        text-neutral-500
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
                                {/* CONFIRM PASSWORD */}

                <div className="mb-6">

                  <Label
                    className="
                      mb-3
                      block
                      text-sm
                      tracking-[3px]
                      text-neutral-300
                    "
                  >

                    CONFIRM PASSWORD

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
                      value={confirmPassword}
                      onChange={(e)=>
                        setConfirmPassword(
                          e.target.value
                        )
                      }
                      placeholder="Confirm Password"
                      className="
                        h-16
                        rounded-2xl
                        border
                        border-white/10
                        bg-white/[0.04]
                        pl-14
                        pr-5
                        text-white
                        placeholder:text-neutral-500
                        focus:border-white
                        focus:ring-0
                      "
                    />

                  </div>

                </div>

                {/* SELLER */}

                <div className="mb-8">

                  <label
                    className="
                      flex
                      cursor-pointer
                      items-center
                      gap-4
                      rounded-2xl
                      border
                      border-white/10
                      bg-white/[0.03]
                      p-5
                      transition-all
                      duration-300
                      hover:bg-white/[0.06]
                    "
                  >

                    <input
                      type="checkbox"
                      checked={isSeller}
                      onChange={(e)=>
                        setIsSeller(
                          e.target.checked
                        )
                      }
                      className="
                        h-5
                        w-5
                        accent-white
                      "
                    />

                    <div>

                      <h3
                        className="
                          text-base
                          font-semibold
                          text-white
                        "
                      >

                        Register as Seller

                      </h3>

                      <p
                        className="
                          mt-1
                          text-sm
                          leading-6
                          text-neutral-400
                        "
                      >

                        Open your own premium
                        VrushKart store and
                        start selling online.

                      </p>

                    </div>

                  </label>

                </div>

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
                    font-semibold
                    text-black
                    transition-all
                    duration-300
                    hover:scale-[1.02]
                    hover:bg-neutral-200
                  "
                >

                  {loading ? (

                    <Loader2
                      className="
                        h-6
                        w-6
                        animate-spin
                      "
                    />

                  ) : (

                    <>

                      Create Account

                      <ArrowRight
                        className="
                          ml-3
                          h-5
                          w-5
                          transition-transform
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
                        px-6
                        text-xs
                        tracking-[6px]
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
                    h-16
                    w-full
                    justify-start
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.03]
                    px-6
                    text-white
                    transition-all
                    duration-300
                    hover:border-white/20
                    hover:bg-white/[0.08]
                  "
                >

                  <FcGoogle className="mr-4 text-2xl"/>

                  Continue with Google

                </Button>

                {/* APPLE */}

                <Button
                  onClick={signInWithApple}
                  variant="outline"
                  className="
                    mb-4
                    h-16
                    w-full
                    justify-start
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.03]
                    px-6
                    text-white
                    transition-all
                    duration-300
                    hover:border-white/20
                    hover:bg-white/[0.08]
                  "
                >

                  <FaApple className="mr-4 text-2xl"/>

                  Continue with Apple

                </Button>

                {/* PHONE */}

                <Button
                  variant="outline"
                  className="
                    mb-4
                    h-16
                    w-full
                    justify-start
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.03]
                    px-6
                    text-white
                    transition-all
                    duration-300
                    hover:border-white/20
                    hover:bg-white/[0.08]
                  "
                  onClick={()=>{
                    setMode("login");
                    setPhone("");
                    setOtp("");
                    setOtpSent(false);
                  }}
                >

                  <Phone className="mr-4 h-5 w-5"/>

                  Continue with Phone

                </Button>

                {/* LOGIN LINK */}

                <div className="mt-10 text-center">

                  <span className="text-neutral-500">

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
                      transition-all
                      duration-300
                      hover:text-neutral-300
                    "
                  >

                    Sign In

                  </button>

                </div>

              </>

            )}

          </div>

        </section>

      </div>

      {/* TOP SHADOW */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-40
          bg-gradient-to-b
          from-black
          via-black/80
          to-transparent
        "
      />

      {/* BOTTOM SHADOW */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          h-40
          bg-gradient-to-t
          from-black
          via-black/80
          to-transparent
        "
      />

      {/* BACKGROUND ANIMATION */}

      <style>{`

      @keyframes heroZoom{

        0%{
          transform:scale(1);
        }

        100%{
          transform:scale(1.08);
        }

      }

      .hero-image{

        animation:heroZoom 18s ease-in-out infinite alternate;

      }

      `}</style>

    </div>

  );

}
