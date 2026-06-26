import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Phone,
  Eye,
  EyeOff,
  Loader2,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Lock,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

type AuthMode = "signin" | "signup";
type SignupStep = 1 | 2 | 3;
type ForgotStep = 1 | 2 | 3;

export default function Auth() {
  const navigate = useNavigate();

  const {
    signInWithGoogle,
    signInWithApple,
    signInWithPhone,
    verifyPhoneOtp,
  } = useAuth();

  const [mode, setMode] = useState<AuthMode>("signin");

  const [signupStep, setSignupStep] =
    useState<SignupStep>(1);

  const [forgotStep, setForgotStep] =
    useState<ForgotStep>(1);

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [fullName, setFullName] = useState("");

  const [phone, setPhone] = useState("");

  const [otp, setOtp] = useState("");

  const [emailOtp, setEmailOtp] = useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [otpSent, setOtpSent] =
    useState(false);

  const [emailVerified, setEmailVerified] =
    useState(false);

  const [asSeller, setAsSeller] =
    useState(false);

  const passwordStrength = () => {
    let score = 0;

    if (password.length >= 8) score++;

    if (/[A-Z]/.test(password)) score++;

    if (/[0-9]/.test(password)) score++;

    if (/[^A-Za-z0-9]/.test(password)) score++;

    return score;
  };

  const strengthText = () => {
    const score = passwordStrength();

    if (score <= 1) return "Weak";

    if (score === 2) return "Medium";

    if (score === 3) return "Strong";

    return "Excellent";
  };

  const sendEmailOtp = async () => {
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
        toast.success("Verification code sent");
      } else {
        toast.error(data.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server Error");
    } finally {
      setLoading(false);
    }
  };

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
            otp: emailOtp,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setEmailVerified(true);
        setSignupStep(2);

        toast.success("Email Verified Successfully");
      } else {
        toast.error(data.message || "Invalid OTP");
      }
    } catch (error) {
      console.error(error);
      toast.error("Verification Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!emailVerified) {
      toast.error("Verify your email first");
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
            role: asSeller ? "seller" : "user",
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success("Account Created Successfully");
        setSignupStep(3);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Registration Failed");
    } finally {
      setLoading(false);
    }
  };

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

        toast.success("Welcome Back!");

        navigate("/");
      } else {
        toast.error(data.message || "Login Failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server Error");
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneLogin = async () => {
    try {
      setLoading(true);

      if (!otpSent) {
        await signInWithPhone(phone);

        setOtpSent(true);

        toast.success("OTP Sent Successfully");
      } else {
        await verifyPhoneOtp(phone, otp);

        toast.success("Login Successful");

        navigate("/");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
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
          "OTP Sent To Your Email"
        );

        setForgotStep(2);
      } else if (forgotStep === 2) {
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
          toast.success("OTP Verified");

          setForgotStep(3);
        } else {
          toast.error("Invalid OTP");
        }
      } else {
        toast.success(
          "Password Reset Successfully"
        );

        setForgotStep(1);
      }
    } catch (error) {
      console.error(error);

      toast.error("Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (
    provider: () => Promise<void>
  ) => {
    try {
      setLoading(true);

      await provider();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
        <div className="min-h-screen bg-black text-white overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-white/10 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-gray-500/10 blur-[150px]" />
      </div>

      <div className="relative z-10 grid min-h-screen lg:grid-cols-2">

        {/* Left Side */}

        <div className="hidden lg:flex flex-col justify-between p-14">

          <div>
            <Link to="/">
              <Logo />
            </Link>
          </div>

          <div className="space-y-8">

            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2 bg-white/5 backdrop-blur-xl">

              <ShieldCheck className="h-5 w-5 text-green-400" />

              <span className="text-sm text-white/80">
                India's Trusted AI Marketplace
              </span>

            </div>

            <h1 className="text-6xl font-black leading-tight tracking-tight">

              Shop.

              <br />

              Sell.

              <br />

              Grow.

            </h1>

            <p className="max-w-lg text-lg leading-8 text-gray-300">

              VrushCart combines AI recommendations,
              secure payments, verified sellers and
              lightning-fast shopping into one premium
              marketplace experience.

            </p>

            <div className="grid grid-cols-3 gap-6 pt-10">

              <div>

                <h2 className="text-4xl font-bold">
                  25M+
                </h2>

                <p className="mt-2 text-gray-400">
                  Customers
                </p>

              </div>

              <div>

                <h2 className="text-4xl font-bold">
                  300K+
                </h2>

                <p className="mt-2 text-gray-400">
                  Sellers
                </p>

              </div>

              <div>

                <h2 className="text-4xl font-bold">
                  99.9%
                </h2>

                <p className="mt-2 text-gray-400">
                  Secure Payments
                </p>

              </div>

            </div>

          </div>

          <div className="text-sm text-gray-500">

            © {new Date().getFullYear()} VrushCart.
            Crafted with AI.

          </div>

        </div>

        {/* Right Side */}

        <div className="flex items-center justify-center p-6 lg:p-16">

          <div className="w-full max-w-lg rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-3xl shadow-[0_0_80px_rgba(255,255,255,0.06)] p-10">

            <div className="flex justify-between items-center">

              <div>

                <h2 className="text-4xl font-bold">

                  {mode === "signin"
                    ? "Welcome Back"
                    : "Create Account"}

                </h2>

                <p className="mt-2 text-gray-400">

                  Continue to your VrushCart account

                </p>

              </div>

              <Lock className="h-10 w-10 text-gray-400" />

            </div>

            <div className="mt-8 flex rounded-full bg-white/5 p-1">

  <button
    onClick={() => setMode("signin")}
    className={`flex-1 rounded-full py-3 text-sm font-semibold transition-all duration-300 ${
      mode === "signin"
        ? "bg-white text-black shadow-lg"
        : "text-gray-400 hover:text-white"
    }`}
  >
    Sign In
  </button>

  <button
    onClick={() => setMode("signup")}
    className={`flex-1 rounded-full py-3 text-sm font-semibold transition-all duration-300 ${
      mode === "signup"
        ? "bg-white text-black shadow-lg"
        : "text-gray-400 hover:text-white"
    }`}
  >
    Sign Up
  </button>

</div>

            <div className="mt-8 space-y-5">

              {mode === "signup" && signupStep === 1 && (

                <>

                  <div>

                    <Label className="mb-2 block">
                      Email Address
                    </Label>

                    <Input
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      className="h-12 rounded-xl bg-white/5 border-white/10"
                    />

                  </div>

                  {!otpSent ? (

                    <Button
                      onClick={sendEmailOtp}
                      disabled={loading}
                      className="h-12 w-full rounded-xl"
                    >
                      {loading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        "Send Verification Code"
                      )}
                    </Button>

                  ) : (

                    <>

                      <Input
                        placeholder="Enter 6 Digit OTP"
                        value={emailOtp}
                        onChange={(e) =>
                          setEmailOtp(e.target.value)
                        }
                        className="h-12 rounded-xl bg-white/5 border-white/10"
                      />

                      <Button
                        onClick={verifyEmailOtp}
                        disabled={loading}
                        className="h-12 w-full rounded-xl"
                      >
                        Verify Email
                      </Button>

                    </>

                  )}

                </>

              )}

              {mode === "signup" &&
                signupStep === 2 && (

                <>

                  <div>

                    <Label className="mb-2 block">
                      Full Name
                    </Label>

                    <Input
                      value={fullName}
                      onChange={(e) =>
                        setFullName(e.target.value)
                      }
                      placeholder="Enter your full name"
                      className="h-12 rounded-xl bg-white/5 border-white/10"
                    />

                  </div>

                  <div>

                    <Label className="mb-2 block">
                      Password
                    </Label>

                    <div className="relative">
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
                        className="h-12 rounded-xl bg-white/5 border-white/10 pr-12"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword(
                            !showPassword
                          )
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>

                    </div>
                    </div>

                  <div>

                    <Label className="mb-2 block">
                      Confirm Password
                    </Label>

                    <div className="relative">

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
                        placeholder="Confirm Password"
                        className="h-12 rounded-xl bg-white/5 border-white/10 pr-12"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(
                            !showConfirmPassword
                          )
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>

                    </div>

                  </div>

                  <div>

                    <div className="flex justify-between text-xs text-gray-400">

                      <span>Password Strength</span>

                      <span>
                        {strengthText()}
                      </span>

                    </div>

                    <div className="mt-2 h-2 rounded-full bg-white/10 overflow-hidden">

                      <div
                        className="h-full rounded-full bg-green-500 transition-all duration-500"
                        style={{
                          width: `${
                            passwordStrength() * 25
                          }%`,
                        }}
                      />

                    </div>

                  </div>

                  <label className="flex items-center gap-3 text-sm text-gray-300">

                    <input
                      type="checkbox"
                      checked={asSeller}
                      onChange={(e) =>
                        setAsSeller(
                          e.target.checked
                        )
                      }
                      className="h-4 w-4 rounded"
                    />

                    Register as Seller

                  </label>

                  <Button
                    onClick={handleRegister}
                    disabled={loading}
                    className="h-12 w-full rounded-xl text-base font-semibold"
                  >
                    {loading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      "Create Account"
                    )}
                  </Button>

                </>

              )}

              {mode === "signup" &&
                signupStep === 3 && (
                                  <div className="py-12 text-center">

                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-500/20">

                    <CheckCircle2 className="h-14 w-14 text-green-400" />

                  </div>

                  <h3 className="mt-8 text-3xl font-bold">

                    Account Created!

                  </h3>

                  <p className="mt-3 text-gray-400">

                    Your account has been created successfully.
                    Click below to continue to login.

                  </p>

                  <Button
                    className="mt-8 h-12 w-full rounded-xl"
                    onClick={() => {
                      setMode("signin");
                      setSignupStep(1);
                    }}
                  >
                    Continue To Login
                  </Button>

                </div>

              )}

              {mode === "signin" && (

                <>

                  <div>

                    <Label className="mb-2 block">
                      Email Address
                    </Label>

                    <Input
                      type="email"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      placeholder="Enter your email"
                      className="h-12 rounded-xl bg-white/5 border-white/10"
                    />

                  </div>

                  <div>

                    <Label className="mb-2 block">
                      Password
                    </Label>

                    <div className="relative">

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
                        className="h-12 rounded-xl bg-white/5 border-white/10 pr-12"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword(
                            !showPassword
                          )
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>

                    </div>

                  </div>

                  <div className="flex items-center justify-between">

                    <label className="flex items-center gap-2 text-sm text-gray-300">

                      <input
                        type="checkbox"
                        className="rounded"
                      />

                      Remember me

                    </label>

                    <button
                      type="button"
                      onClick={() => setForgotStep(1)}
                      className="text-sm text-white hover:underline"
                    >
                      Forgot Password?
                    </button>

                  </div>

                  <Button
                    onClick={handleLogin}
                    disabled={loading}
                    className="h-12 w-full rounded-xl text-base font-semibold"
                  >
                    {loading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      "Sign In"
                    )}
                  </Button>

                </>

              )}

              <div className="relative py-4">

                <div className="absolute inset-0 flex items-center">

                  <div className="w-full border-t border-white/10" />

                </div>

                <div className="relative flex justify-center">
                                  <span className="bg-black px-4 text-sm text-gray-400">
                    OR CONTINUE WITH
                  </span>

                </div>

              </div>

              <div className="grid grid-cols-2 gap-4">

                <Button
                  variant="outline"
                  className="h-12 rounded-xl border-white/10 bg-white/5 hover:bg-white hover:text-black"
                  onClick={() =>
                    handleOAuth(signInWithGoogle)
                  }
                >
                  Google
                </Button>

                <Button
                  variant="outline"
                  className="h-12 rounded-xl border-white/10 bg-white/5 hover:bg-white hover:text-black"
                  onClick={() =>
                    handleOAuth(signInWithApple)
                  }
                >
                  Apple
                </Button>

              </div>

              <div className="pt-6">

                <div className="flex items-center gap-3 mb-4">

                  <Phone className="h-5 w-5 text-gray-400" />

                  <span className="text-sm font-medium text-gray-300">
                    Login using Phone OTP
                  </span>

                </div>

                <Input
                  placeholder="Enter Mobile Number"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                  className="h-12 rounded-xl bg-white/5 border-white/10"
                />

                {otpSent && (

                  <Input
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value)
                    }
                    className="mt-4 h-12 rounded-xl bg-white/5 border-white/10"
                  />

                )}

                <Button
                  onClick={handlePhoneLogin}
                  disabled={loading}
                  className="mt-4 h-12 w-full rounded-xl"
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

              <div className="pt-8 text-center text-sm text-gray-400">

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
                  className="ml-2 font-semibold text-white hover:underline"
                >
                  {mode === "signin"
                    ? "Create One"
                    : "Sign In"}
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}