import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Phone,
  User,
  Loader2,
  ArrowRight,
  ShieldCheck,
  Award,
  Truck,
  Headphones,
} from "lucide-react";

import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const API = "https://vrushcart.onrender.com";

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

  /* ============================= */
  /* LOGIN */
  /* ============================= */

  const handleLogin = async () => {

    if (!email.trim()) {

      toast.error("Enter your email");

      return;

    }

    if (!password.trim()) {

      toast.error("Enter your password");

      return;

    }

    try {

      setLoading(true);

      const response = await fetch(`${API}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
                body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {

        throw new Error(
          data.message || "Login failed"
        );

      }

      toast.success("Welcome Back");

      localStorage.setItem(
        "vrushkart-user",
        JSON.stringify(data.user)
      );

      localStorage.setItem(
        "vrushkart-token",
        data.token
      );

      navigate("/");

    } catch (error: any) {

      toast.error(
        error.message || "Unable to login."
      );

    } finally {

      setLoading(false);

    }

  };

  /* ============================= */
  /* SIGNUP */
  /* ============================= */

  const handleSignup = async () => {

    if (!fullName.trim()) {

      toast.error("Enter your full name");

      return;

    }

    if (!email.trim()) {

      toast.error("Enter your email");

      return;

    }

    if (!password.trim()) {

      toast.error("Enter your password");

      return;

    }

    if (password !== confirmPassword) {

      toast.error("Passwords do not match");

      return;

    }

    try {

      setLoading(true);

      const response = await fetch(
        `${API}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({

            fullName,

            email,

            password,

            role: isSeller
              ? "seller"
              : "customer",

          }),

        }
      );

      const data = await response.json();

      if (!response.ok) {

        throw new Error(
          data.message || "Signup Failed"
        );

      }

      toast.success(
        "Account Created Successfully"
      );
            localStorage.setItem(
        "vrushkart-user",
        JSON.stringify(data.user)
      );

      localStorage.setItem(
        "vrushkart-token",
        data.token
      );

      setMode("login");

      setFullName("");

      setEmail("");

      setPassword("");

      setConfirmPassword("");

      setPhone("");

      setOtp("");

      setOtpSent(false);

      toast.success(
        "Please login to continue."
      );

    } catch (error: any) {

      toast.error(
        error.message || "Unable to create account."
      );

    } finally {

      setLoading(false);

    }

  };

  /* ============================= */
  /* PHONE LOGIN */
  /* ============================= */

  const handlePhoneLogin = async () => {

    if (!phone.trim()) {

      toast.error("Enter your phone number");

      return;

    }

    try {

      setLoading(true);

      await signInWithPhone(phone);

      setOtpSent(true);

      toast.success(
        "OTP Sent Successfully"
      );

    } catch (error: any) {

      toast.error(
        error.message || "Unable to send OTP."
      );

    } finally {

      setLoading(false);

    }

  };

  /* ============================= */
  /* VERIFY OTP */
  /* ============================= */

  const handleVerifyOtp = async () => {

    if (!otp.trim()) {

      toast.error("Enter OTP");

      return;

    }

    try {

      setLoading(true);

      await verifyPhoneOtp(otp);

      toast.success(
        "Phone Login Successful"
      );

      navigate("/");

    } catch (error: any) {

      toast.error(
        error.message || "Invalid OTP"
      );

    } finally {

      setLoading(false);

    }

  };

  /* ============================= */
  /* UI */
  /* ============================= */

  return (

    <div className="relative h-screen w-screen overflow-hidden bg-black">

      {/* BACKGROUND */}

      <div className="absolute inset-0 bg-black" />

      {/* MAIN GRID */}

      <div className="relative z-10 grid h-full w-full grid-cols-12">
                {/* =============================== */}
        {/* LEFT SIDE */}
        {/* =============================== */}

        <section
          className="
            relative
            col-span-7
            overflow-hidden
          "
        >

          {/* HERO IMAGE */}

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
              brightness-[0.22]
              contrast-125
              scale-105
              select-none
            "
          />

          {/* DARK OVERLAY */}

          <div className="absolute inset-0 bg-black/60"/>

          {/* LEFT GRADIENT */}

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

          {/* CONTENT */}

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

            {/* LOGO */}

            <div>

              <h1
                className="
                  text-[170px]
                  font-extralight
                  leading-none
                  tracking-[-12px]
                  text-white
                "
              >

                VK

              </h1>

              <h2
                className="
                  mt-2
                  text-5xl
                  font-light
                  tracking-[16px]
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

            {/* CENTER CONTENT */}

            <div className="max-w-2xl">

              <p
                className="
                  text-sm
                  uppercase
                  tracking-[12px]
                  text-neutral-400
                "
              >

                PREMIUM MARKETPLACE

              </p>

              <h2
                className="
                  mt-8
                  text-7xl
                  font-black
                  leading-[82px]
                  text-white
                "
              >

                Luxury.

                <br />

                Shopping.

                <br />

                Redefined.

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

                Experience premium fashion,
                electronics, lifestyle products
                and trusted sellers with a
                modern shopping experience.

              </p>

            </div>
                        {/* =============================== */}
            {/* FEATURES */}
            {/* =============================== */}

            <div className="flex items-center gap-12">

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
                    border-white/10
                    bg-white/[0.04]
                    backdrop-blur-md
                  "
                >

                  <ShieldCheck className="h-7 w-7 text-white"/>

                </div>

                <h4
                  className="
                    text-sm
                    font-semibold
                    tracking-[2px]
                    text-white
                  "
                >

                  SECURE

                </h4>

                <p
                  className="
                    mt-2
                    text-xs
                    text-neutral-400
                  "
                >

                  Payments

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
                    border-white/10
                    bg-white/[0.04]
                    backdrop-blur-md
                  "
                >

                  <Award className="h-7 w-7 text-white"/>

                </div>

                <h4
                  className="
                    text-sm
                    font-semibold
                    tracking-[2px]
                    text-white
                  "
                >

                  PREMIUM

                </h4>

                <p
                  className="
                    mt-2
                    text-xs
                    text-neutral-400
                  "
                >

                  Products

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
                    border-white/10
                    bg-white/[0.04]
                    backdrop-blur-md
                  "
                >

                  <Truck className="h-7 w-7 text-white"/>

                </div>

                <h4
                  className="
                    text-sm
                    font-semibold
                    tracking-[2px]
                    text-white
                  "
                >

                  FAST

                </h4>

                <p
                  className="
                    mt-2
                    text-xs
                    text-neutral-400
                  "
                >

                  Delivery

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
                    border-white/10
                    bg-white/[0.04]
                    backdrop-blur-md
                  "
                >

                  <Headphones className="h-7 w-7 text-white"/>

                </div>

                <h4
                  className="
                    text-sm
                    font-semibold
                    tracking-[2px]
                    text-white
                  "
                >

                  SUPPORT

                </h4>

                <p
                  className="
                    mt-2
                    text-xs
                    text-neutral-400
                  "
                >

                  24 × 7

                </p>

              </div>

            </div>

          </div>

        </section>

        {/* =============================== */}
        {/* RIGHT SIDE */}
        {/* =============================== */}

        <section
          className="
            col-span-5
            flex
            items-center
            justify-center
            bg-[#040404]
          "
        >

          {/* GLASS CARD */}

          <div
            className="
              relative
              w-[540px]
              rounded-[36px]
              border
              border-white/10
              bg-white/[0.05]
              p-14
              backdrop-blur-3xl
              shadow-[0_40px_120px_rgba(0,0,0,0.85)]
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

            {/* Logo */}

            <div
              className="
                mb-10
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                border
                border-white/10
                bg-white/[0.05]
              "
            >

              <span
                className="
                  text-3xl
                  font-light
                  text-white
                "
              >

                VK

              </span>

            </div>

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

              Sign in to continue your
              premium shopping experience.

            </p>
                        {/* =============================== */}
            {/* LOGIN / SIGNUP TABS */}
            {/* =============================== */}

            <div
              className="
                mt-12
                mb-10
                grid
                grid-cols-2
                rounded-2xl
                bg-white/[0.04]
                p-1
              "
            >

              <button
                onClick={() => setMode("login")}
                className={`
                  rounded-2xl
                  py-4
                  text-sm
                  font-semibold
                  tracking-[2px]
                  transition-all
                  duration-300

                  ${
                    mode === "login"
                      ? "bg-white text-black shadow-lg"
                      : "text-neutral-400 hover:text-white"
                  }

                `}
              >

                SIGN IN

              </button>

              <button
                onClick={() => setMode("signup")}
                className={`
                  rounded-2xl
                  py-4
                  text-sm
                  font-semibold
                  tracking-[2px]
                  transition-all
                  duration-300

                  ${
                    mode === "signup"
                      ? "bg-white text-black shadow-lg"
                      : "text-neutral-400 hover:text-white"
                  }

                `}
              >

                CREATE ACCOUNT

              </button>

            </div>

            {/* ================================= */}
            {/* LOGIN FORM */}
            {/* ================================= */}

            {mode === "login" && (

              <>

                {/* EMAIL */}

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
                      type="email"
                      onChange={(e)=>
                        setEmail(e.target.value)
                      }
                      placeholder="john@example.com"
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

                {/* PASSWORD */}

                <div className="mb-4">

                  <div className="mb-3 flex items-center justify-between">

                    <Label
                      className="
                        text-sm
                        tracking-[3px]
                        text-neutral-300
                      "
                    >

                      PASSWORD

                    </Label>

                    <button
                      className="
                        text-sm
                        text-neutral-500
                        hover:text-white
                      "
                    >

                      Forgot Password?

                    </button>

                  </div>

                  <div className="relative">
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
                        focus:border-white
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
                        hover:text-white
                        transition-all
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

                {/* REMEMBER */}

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

                {/* SIGN IN */}

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
                        bg-[#040404]
                        px-6
                        text-xs
                        tracking-[6px]
                        text-neutral-500
                      "
                    >

                      OR CONTINUE WITH

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
                    bg-white/[0.04]
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
                    bg-white/[0.04]
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
                  onClick={handlePhoneLogin}
                  className="
                    mb-6
                    h-16
                    w-full
                    justify-start
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.04]
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

                {/* OTP */}

                {otpSent && (

                  <>

                    <div className="mb-4">

                      <Label
                        className="
                          mb-3
                          block
                          text-sm
                          tracking-[3px]
                          text-neutral-300
                        "
                      >

                        ENTER OTP

                      </Label>

                      <Input
                        value={otp}
                        onChange={(e)=>
                          setOtp(e.target.value)
                        }
                        placeholder="123456"
                        className="
                          h-16
                          rounded-2xl
                          border
                          border-white/10
                          bg-white/[0.04]
                          text-center
                          text-xl
                          tracking-[10px]
                          text-white
                        "
                      />

                    </div>

                    <Button
                      onClick={handleVerifyOtp}
                      className="
                        mb-6
                        h-16
                        w-full
                        rounded-2xl
                        bg-white
                        text-black
                        hover:bg-neutral-200
                      "
                    >

                      Verify OTP

                    </Button>

                  </>

                )}

                {/* SIGNUP LINK */}

                <div className="text-center">

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
                      transition-all
                      hover:text-neutral-300
                    "
                  >

                    Create Account

                  </button>

                </div>

              </>

            )}

            {/* ================================= */}
            {/* SIGNUP STARTS HERE */}
            {/* ================================= */}

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
                      leading-8
                      text-neutral-400
                    "
                  >

                    Join India's premium shopping
                    destination today.

                  </p>

                </div>

                {/* FULL NAME */}

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
                        border
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

                  <Label
                    className="
                      mb-3
                      block
                      text-sm
                      tracking-[3px]
                      text-neutral-300
                    "
                  >

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
                      placeholder="john@example.com"
                      className="
                        h-16
                        rounded-2xl
                        border
                        border-white/10
                        bg-white/[0.04]
                        pl-14
                        text-white
                        placeholder:text-neutral-500
                      "
                    />

                  </div>

                </div>

                {/* PASSWORD */}

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
                      placeholder="Create Password"
                      className="
                        h-16
                        rounded-2xl
                        border
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
                        setConfirmPassword(e.target.value)
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
                    gap-5
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.04]
                    p-5
                    transition-all
                    duration-300
                    hover:bg-white/[0.08]
                  "
                >

                  <input
                    type="checkbox"
                    checked={isSeller}
                    onChange={(e)=>
                      setIsSeller(e.target.checked)
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
                        text-lg
                        font-semibold
                        text-white
                      "
                    >

                      Register as Seller

                    </h3>

                    <p
                      className="
                        mt-2
                        text-sm
                        leading-6
                        text-neutral-400
                      "
                    >

                      Open your premium store and
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
                        bg-[#040404]
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
                    bg-white/[0.04]
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
                    bg-white/[0.04]
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
                  onClick={handlePhoneLogin}
                  variant="outline"
                  className="
                    mb-6
                    h-16
                    w-full
                    justify-start
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.04]
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

                {/* LOGIN LINK */}

                <div className="mt-10 text-center">

                  <span className="text-neutral-500">

                    Already have an account?

                  </span>

                  <button
                    onClick={() => setMode("login")}
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

      @keyframes heroZoom {

        0% {
          transform: scale(1);
        }

        100% {
          transform: scale(1.08);
        }

      }

      .hero-image {

        animation: heroZoom 18s ease-in-out infinite alternate;

      }

      `}</style>

    </div>

  );

}
