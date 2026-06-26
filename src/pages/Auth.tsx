import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  Shield,
  Check,
  ArrowRight,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

type AuthMode = "login" | "signup";
type SignupStep = 1 | 2 | 3;
type ForgotStep = 0 | 1 | 2 | 3;

export default function Auth() {
  const navigate = useNavigate();

  const {
    signInWithGoogle,
    signInWithApple,
    signInWithPhone,
    verifyPhoneOtp,
  } = useAuth();

  /* -------------------------------- */
  /* Authentication State             */
  /* -------------------------------- */

  const [mode, setMode] =
    useState<AuthMode>("login");

  const [signupStep, setSignupStep] =
    useState<SignupStep>(1);

  const [forgotStep, setForgotStep] =
    useState<ForgotStep>(0);

  const [loading, setLoading] =
    useState(false);

  /* -------------------------------- */
  /* Form Data                        */
  /* -------------------------------- */

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

  const [emailOtp, setEmailOtp] =
    useState(["", "", "", "", "", ""]);

  const [otpSent, setOtpSent] =
    useState(false);

  const [emailVerified, setEmailVerified] =
    useState(false);

  const [sellerAccount, setSellerAccount] =
    useState(false);

  /* -------------------------------- */
  /* Password                         */
  /* -------------------------------- */

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const passwordStrength = () => {
    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password))
      score++;

    return score;
  };

  const otpCode = emailOtp.join("");
    /* -------------------------------- */
  /* Email OTP                        */
  /* -------------------------------- */

  const sendEmailOtp = async () => {
    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    try {
      setLoading(true);

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
        setOtpSent(true);
        toast.success("OTP sent successfully");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Server Error");
    } finally {
      setLoading(false);
    }
  };

  /* -------------------------------- */
  /* Verify Email OTP                 */
  /* -------------------------------- */

  const verifyEmailOtp = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "https://vurshcart.onrender.com/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            otp: otpCode,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setEmailVerified(true);
        setSignupStep(2);

        toast.success("Email Verified");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Verification Failed");
    } finally {
      setLoading(false);
    }
  };

  /* -------------------------------- */
  /* Login                            */
  /* -------------------------------- */

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
    } catch (err) {
      console.error(err);
      toast.error("Login Failed");
    } finally {
      setLoading(false);
    }
  };
    /* -------------------------------- */
  /* Register                         */
  /* -------------------------------- */

  const handleRegister = async () => {
    if (!emailVerified) {
      toast.error("Verify your email first");
      return;
    }

    if (!fullName.trim()) {
      toast.error("Enter your full name");
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
            full_name: fullName,
            email,
            password,
            role: sellerAccount
              ? "seller"
              : "user",
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success(
          "Account created successfully"
        );

        setMode("login");

        setSignupStep(1);

        setPassword("");

        setConfirmPassword("");

        setFullName("");

        setOtpSent(false);

        setEmailVerified(false);

        setEmailOtp([
          "",
          "",
          "",
          "",
          "",
          "",
        ]);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);

      toast.error("Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  /* -------------------------------- */
  /* Phone Login                      */
  /* -------------------------------- */

  const handlePhoneLogin = async () => {
    try {
      setLoading(true);

      if (!otpSent) {
        await signInWithPhone(phone);

        setOtpSent(true);

        toast.success("OTP Sent");
      } else {
        await verifyPhoneOtp(
          phone,
          otp
        );

        toast.success(
          "Login Successful"
        );

        navigate("/");
      }
    } catch (err: any) {
      toast.error(
        err.message ||
          "Phone Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  /* -------------------------------- */
  /* Forgot Password                  */
  /* -------------------------------- */

  const handleForgotPassword =
    async () => {
      try {
        setLoading(true);

        if (forgotStep === 1) {
          await fetch(
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

          toast.success(
            "OTP Sent"
          );

          setForgotStep(2);
        } else if (
          forgotStep === 2
        ) {
          const response =
            await fetch(
              "https://vurshcart.onrender.com/verify-otp",
              {
                method: "POST",
                headers: {
                  "Content-Type":
                    "application/json",
                },
                body: JSON.stringify({
                  email,
                  otp: otpCode,
                }),
              }
            );

          const data =
            await response.json();

          if (data.success) {
            toast.success(
              "OTP Verified"
            );

            setForgotStep(3);
          } else {
            toast.error(
              "Invalid OTP"
            );
          }
        } else {
          toast.success(
            "Password Reset Successful"
          );

          setForgotStep(0);
        }
      } catch (err) {
        console.error(err);

        toast.error(
          "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

  /* -------------------------------- */
  /* OAuth Login                      */
  /* -------------------------------- */

  const handleOAuth = async (
    provider: () => Promise<void>
  ) => {
    try {
      setLoading(true);

      await provider();
    } catch (err: any) {
      toast.error(
        err.message ||
          "Authentication Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  /* -------------------------------- */
  /* UI                              */
  /* -------------------------------- */

  return (
        <div className="min-h-screen bg-[#f8f9fb]">

      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-12">

        <div className="w-full max-w-[560px] rounded-[28px] border border-neutral-200 bg-white shadow-[0_25px_80px_rgba(0,0,0,0.08)]">

          {/* Logo */}

          <div className="flex flex-col items-center px-10 pt-12">

            <Logo />

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-neutral-900">

              Welcome to VrushKart

            </h1>

            <p className="mt-3 text-center text-neutral-500">

              India's Premium AI Marketplace

            </p>

          </div>

          {/* Login Signup Toggle */}

          <div className="mt-10 px-10">

            <div className="grid grid-cols-2 rounded-xl bg-neutral-100 p-1">

              <button
                onClick={() => {
                  setMode("login");
                  setForgotStep(0);
                }}
                className={`h-12 rounded-lg text-sm font-semibold transition-all ${
                  mode === "login"
                    ? "bg-black text-white shadow-lg"
                    : "text-neutral-600"
                }`}
              >
                Login
              </button>

              <button
                onClick={() => {
                  setMode("signup");
                  setSignupStep(1);
                  setForgotStep(0);
                }}
                className={`h-12 rounded-lg text-sm font-semibold transition-all ${
                  mode === "signup"
                    ? "bg-black text-white shadow-lg"
                    : "text-neutral-600"
                }`}
              >
                Create Account
              </button>

            </div>

          </div>

          {/* Signup Progress */}

          {mode === "signup" && (

            <div className="mt-10 flex items-center justify-center">

              {[1, 2, 3].map((item) => (

                <div
                  key={item}
                  className="flex items-center"
                >

                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all ${
                      signupStep >= item
                        ? "bg-black text-white"
                        : "border border-neutral-300 bg-white text-neutral-500"
                    }`}
                  >

                    {signupStep > item ? (
                      <Check size={18} />
                    ) : (
                      item
                    )}

                  </div>

                  {item !== 3 && (

                    <div
                      className={`mx-3 h-[2px] w-12 ${
                        signupStep > item
                          ? "bg-black"
                          : "bg-neutral-300"
                      }`}
                    />

                  )}

                </div>

              ))}

            </div>

          )}

          {/* Body */}

          <div className="px-10 py-10">
          {/* ================= LOGIN ================= */}

{mode === "login" && forgotStep === 0 && (

  <>

    <h2 className="text-3xl font-bold text-center">

      Welcome Back

    </h2>

    <p className="mt-2 mb-8 text-center text-neutral-500">

      Login to your VrushKart account

    </p>

    {/* Email */}

    <div className="space-y-2">

      <Label>Email Address</Label>

      <div className="relative">

        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />

        <Input
          type="email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          placeholder="Enter your email"
          className="h-12 rounded-xl pl-12"
        />

      </div>

    </div>

    {/* Password */}

    <div className="mt-6 space-y-2">

      <div className="flex items-center justify-between">

        <Label>Password</Label>

        <button
          onClick={() =>
            setForgotStep(1)
          }
          className="text-sm text-black hover:underline"
        >
          Forgot Password?
        </button>

      </div>

      <div className="relative">

        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />

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
          className="h-12 rounded-xl pl-12 pr-12"
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

            <EyeOff className="h-5 w-5 text-neutral-400" />

          ) : (

            <Eye className="h-5 w-5 text-neutral-400" />

          )}

        </button>

      </div>

    </div>

    {/* Remember */}

    <div className="mt-5 flex items-center justify-between">

      <label className="flex items-center gap-2 text-sm">

        <input
          type="checkbox"
          className="rounded"
        />

        Remember me

      </label>

      <span className="text-sm text-neutral-500">

        Secure Login

      </span>

    </div>

    {/* Login Button */}

    <Button
      onClick={handleLogin}
      disabled={loading}
      className="mt-8 h-12 w-full rounded-xl bg-black"
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

    <div className="relative my-8">

      <div className="absolute inset-0 flex items-center">

        <div className="w-full border-t border-neutral-200" />

      </div>

      <div className="relative flex justify-center">

        <span className="bg-white px-4 text-sm text-neutral-400">

          OR CONTINUE WITH

        </span>

      </div>

    </div>

    {/* OAuth */}

    <div className="grid grid-cols-2 gap-4">

      <Button
        variant="outline"
        onClick={() =>
          handleOAuth(signInWithGoogle)
        }
        className="h-12 rounded-xl"
      >
        Google
      </Button>

      <Button
        variant="outline"
        onClick={() =>
          handleOAuth(signInWithApple)
        }
        className="h-12 rounded-xl"
      >
        Apple
      </Button>

    </div>
    {/* Phone Login */}

    <div className="mt-8">

      <div className="flex items-center gap-2 mb-4">

        <Phone className="h-5 w-5 text-neutral-500" />

        <span className="font-medium">

          Login with Phone

        </span>

      </div>

      <div className="relative">

        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />

        <Input
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
          placeholder="Enter mobile number"
          className="h-12 rounded-xl pl-12"
        />

      </div>

      {otpSent && (

        <Input
          value={otp}
          onChange={(e) =>
            setOtp(e.target.value)
          }
          placeholder="Enter OTP"
          className="mt-4 h-12 rounded-xl"
        />

      )}

      <Button
        onClick={handlePhoneLogin}
        disabled={loading}
        className="mt-4 h-12 w-full rounded-xl bg-black"
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

    {/* Footer */}

    <div className="mt-10 text-center text-sm text-neutral-600">

      Don't have an account?

      <button
        onClick={() => {
          setMode("signup");
          setSignupStep(1);
          setForgotStep(0);
        }}
        className="ml-2 font-semibold text-black hover:underline"
      >
        Create Account
      </button>

    </div>

  </>

)}

{/* ================= SIGNUP STEP 1 ================= */}

{mode === "signup" &&
 signupStep === 1 && (

  <>

    <h2 className="text-3xl font-bold text-center">

      Create Account

    </h2>

    <p className="mt-2 mb-8 text-center text-neutral-500">

      Verify your email to continue

    </p>

    <div className="space-y-2">

      <Label>Email Address</Label>

      <div className="relative">

        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />

        <Input
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          placeholder="Enter your email"
          className="h-12 rounded-xl pl-12"
        />

      </div>

    </div>

    {!otpSent ? (

      <Button
        onClick={sendEmailOtp}
        disabled={loading}
        className="mt-8 h-12 w-full rounded-xl bg-black"
      >

        {loading ? (

          <Loader2 className="h-5 w-5 animate-spin" />

        ) : (

          <>
            Continue

            <ArrowRight className="ml-2 h-5 w-5" />

          </>

        )}

      </Button>

    ) : (

      <>
              <div className="mt-8">

          <Label className="mb-4 block">

            Verification Code

          </Label>

          <div className="flex justify-between gap-2">

            {emailOtp.map((digit, index) => (

              <Input
                key={index}
                maxLength={1}
                value={digit}
                onChange={(e) => {
                  const value = e.target.value;

                  if (!/^[0-9]?$/.test(value))
                    return;

                  const updated = [...emailOtp];

                  updated[index] = value;

                  setEmailOtp(updated);

                  if (value && index < 5) {
                    (
                      document.querySelectorAll(
                        ".otp-input"
                      )[index + 1] as HTMLInputElement
                    )?.focus();
                  }
                }}
                onKeyDown={(e) => {
                  if (
                    e.key === "Backspace" &&
                    !emailOtp[index] &&
                    index > 0
                  ) {
                    (
                      document.querySelectorAll(
                        ".otp-input"
                      )[index - 1] as HTMLInputElement
                    )?.focus();
                  }
                }}
                className="otp-input h-14 w-14 rounded-xl text-center text-lg font-bold"
              />

            ))}

          </div>

          <button
            type="button"
            onClick={sendEmailOtp}
            className="mt-4 text-sm font-medium text-black hover:underline"
          >
            Resend Code
          </button>

        </div>

        <Button
          onClick={verifyEmailOtp}
          disabled={loading}
          className="mt-8 h-12 w-full rounded-xl bg-black"
        >

          {loading ? (

            <Loader2 className="h-5 w-5 animate-spin" />

          ) : (

            <>
              Verify Email

              <ArrowRight className="ml-2 h-5 w-5" />

            </>

          )}

        </Button>

      </>

    )}

    <div className="mt-10 text-center text-sm text-neutral-600">

      Already have an account?

      <button
        onClick={() => {
          setMode("login");
          setForgotStep(0);
        }}
        className="ml-2 font-semibold text-black hover:underline"
      >
        Login
      </button>

    </div>

  </>

)}

{/* ================= SIGNUP STEP 2 ================= */}

{mode === "signup" &&
 signupStep === 2 && (

<>
      <h2 className="text-3xl font-bold text-center">

        Complete Profile

      </h2>

      <p className="mt-2 mb-8 text-center text-neutral-500">

        Just one more step to create your account

      </p>

      {/* Full Name */}

      <div className="space-y-2">

        <Label>Full Name</Label>

        <div className="relative">

          <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />

          <Input
            value={fullName}
            onChange={(e) =>
              setFullName(e.target.value)
            }
            placeholder="Enter your full name"
            className="h-12 rounded-xl pl-12"
          />

        </div>

      </div>

      {/* Password */}

      <div className="mt-6 space-y-2">

        <Label>Password</Label>

        <div className="relative">

          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />

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
            placeholder="Create password"
            className="h-12 rounded-xl pl-12 pr-12"
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

              <EyeOff className="h-5 w-5 text-neutral-400" />

            ) : (

              <Eye className="h-5 w-5 text-neutral-400" />

            )}

          </button>

        </div>

      </div>

      {/* Confirm Password */}

      <div className="mt-6 space-y-2">

        <Label>

          Confirm Password

        </Label>

        <div className="relative">

          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />

          <Input
            type={
              showConfirmPassword
                ? "text"
                : "password"
            }
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
            placeholder="Confirm password"
            className="h-12 rounded-xl pl-12 pr-12"
          />

          <button
            type="button"
            onClick={() =>
              setShowConfirmPassword(
                !showConfirmPassword
              )
            }
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >

            {showConfirmPassword ? (

              <EyeOff className="h-5 w-5 text-neutral-400" />

            ) : (

              <Eye className="h-5 w-5 text-neutral-400" />

            )}

          </button>

        </div>

      </div>

      {/* Password Strength */}

      <div className="mt-6">

        <div className="flex justify-between text-sm">

          <span className="text-neutral-500">

            Password Strength

          </span>

          <span className="font-medium">

            {passwordStrength() === 1 && "Weak"}
            {passwordStrength() === 2 && "Medium"}
            {passwordStrength() === 3 && "Strong"}
            {passwordStrength() >= 4 && "Excellent"}

          </span>

        </div>

        <div className="mt-2 h-2 overflow-hidden rounded-full bg-neutral-200">

          <div
            className="h-full rounded-full bg-black transition-all"
            style={{
              width: `${passwordStrength() * 25}%`,
            }}
          />

        </div>

      </div>

      {/* Seller */}

      <label className="mt-6 flex items-center gap-3">

        <input
          type="checkbox"
          checked={sellerAccount}
          onChange={(e) =>
            setSellerAccount(
              e.target.checked
            )
          }
        />

        Register as Seller

      </label>

      <Button
        onClick={handleRegister}
        disabled={loading}
        className="mt-8 h-12 w-full rounded-xl bg-black"
      >

        {loading ? (

          <Loader2 className="h-5 w-5 animate-spin" />

        ) : (

          <>
            Create Account

            <ArrowRight className="ml-2 h-5 w-5" />

          </>

        )}

      </Button>

    </>

)}

{/* Forgot Password starts here */}
{/* ================= FORGOT PASSWORD ================= */}

{forgotStep > 0 && (

  <>

    <h2 className="text-3xl font-bold text-center">

      Reset Password

    </h2>

    <p className="mt-2 mb-8 text-center text-neutral-500">

      Recover your account securely

    </p>

    {forgotStep === 1 && (

      <>

        <div className="space-y-2">

          <Label>Email Address</Label>

          <div className="relative">

            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />

            <Input
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Enter your email"
              className="h-12 rounded-xl pl-12"
            />

          </div>

        </div>

        <Button
          onClick={handleForgotPassword}
          className="mt-8 h-12 w-full rounded-xl bg-black"
        >
          Send OTP
        </Button>

      </>

    )}

    {forgotStep === 2 && (

      <>

        <Label className="mb-4 block">

          Enter OTP

        </Label>

        <div className="flex justify-between gap-2">

          {emailOtp.map((digit, index) => (

            <Input
              key={index}
              maxLength={1}
              value={digit}
              onChange={(e) => {

                const updated = [...emailOtp];

                updated[index] = e.target.value;

                setEmailOtp(updated);

              }}
              className="h-14 w-14 rounded-xl text-center text-lg font-bold"
            />

          ))}

        </div>

        <Button
          onClick={handleForgotPassword}
          className="mt-8 h-12 w-full rounded-xl bg-black"
        >
          Verify OTP
        </Button>

      </>

    )}

    {forgotStep === 3 && (

      <>

        <div className="space-y-2">

          <Label>

            New Password

          </Label>

          <Input
            type="password"
            placeholder="New Password"
            className="h-12 rounded-xl"
          />

        </div>

        <div className="mt-6 space-y-2">

          <Label>

            Confirm Password

          </Label>

          <Input
            type="password"
            placeholder="Confirm Password"
            className="h-12 rounded-xl"
          />

        </div>

        <Button
          onClick={handleForgotPassword}
          className="mt-8 h-12 w-full rounded-xl bg-black"
        >
          Reset Password
        </Button>

      </>

    )}

  </>

)}

{/* Footer */}

<div className="mt-12 border-t border-neutral-200 pt-8">

  <div className="grid grid-cols-3 gap-6 text-center">

    <div>

      <Shield className="mx-auto h-7 w-7 text-black" />

      <p className="mt-3 text-sm font-semibold">

        Secure

      </p>

      <p className="text-xs text-neutral-500">

        End-to-End Encryption

      </p>

    </div>

    <div>

      <Check className="mx-auto h-7 w-7 text-black" />

      <p className="mt-3 text-sm font-semibold">

        Trusted

      </p>

      <p className="text-xs text-neutral-500">

        Verified Marketplace

      </p>

    </div>

    <div>

      <Lock className="mx-auto h-7 w-7 text-black" />

      <p className="mt-3 text-sm font-semibold">

        Protected

      </p>

      <p className="text-xs text-neutral-500">

        Safe Payments

      </p>

    </div>

  </div>

  <p className="mt-10 text-center text-xs text-neutral-400">

    © {new Date().getFullYear()} VrushKart. All rights reserved.

  </p>

</div>

        </div>

      </div>

    </div>

  </div>

);
}