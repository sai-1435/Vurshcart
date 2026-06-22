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
  
const { signInWithGoogle, signInWithApple, signInWithPhone, verifyPhoneOtp } = useAuth();
const sendEmailOtp = async () => {
  try {
    const response = await fetch(
      "http://127.0.0.1:5000/send-otp",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    const data = await response.json();

    if (data.success) {
      setEmailOtpSent(true);
      toast.success("OTP sent");
    }
  } catch {
    toast.error("Failed to send OTP");
  }
};

const verifyEmailOtp = async () => {
  try {
    const response = await fetch(
      "http://127.0.0.1:5000/verify-otp",
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
      toast.success("Email verified");
    } else {
      toast.error("Invalid OTP");
    }
  } catch {
    toast.error("Verification failed");
  }
};

  const onSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    const url =
      mode === "signin"
        ? "http://127.0.0.1:5000/login"
        : "http://127.0.0.1:5000/register";

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
    try { await fn(); } catch (e: any) { toast.error(e.message); setLoading(false); }
  };

  const onPhone = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!otpSent) { await signInWithPhone(phone); setOtpSent(true); toast.success("OTP sent"); }
      else { await verifyPhoneOtp(phone, otp); toast.success("Welcome!"); navigate("/"); }
    } catch (e: any) { toast.error(e.message); }
    setLoading(false);
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-gradient-soft">
      <div className="hidden md:flex flex-col justify-between p-12 bg-gradient-hero text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_60%)]" />
        <div className="relative">
          <Link to="/" className="text-white"><Logo /></Link>
        </div>
        <div className="relative">
          <h2 className="text-3xl font-bold leading-tight">The future of commerce is intelligent.</h2>
          <p className="mt-3 text-white/85">Join 100M+ shoppers and sellers on India's most advanced AI marketplace.</p>
        </div>
        <div className="relative text-sm text-white/70">© {new Date().getFullYear()} VrushCart</div>
      </div>

      <div className="flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          <div className="md:hidden mb-6"><Link to="/"><Logo /></Link></div>
          <h1 className="text-2xl font-bold">{mode === "signin" ? "Welcome back" : "Create your account"}</h1>
          <p className="text-sm text-muted-foreground mt-1">Shop or sell on VrushCart</p>

          <Tabs defaultValue="email" className="mt-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="email"><Mail className="h-4 w-4 mr-2" />Email</TabsTrigger>
              <TabsTrigger value="phone"><Phone className="h-4 w-4 mr-2" />Phone</TabsTrigger>
            </TabsList>

            <TabsContent value="email" className="mt-4 space-y-4">
              <form onSubmit={onSubmit} className="space-y-3">
                {mode === "signup" && (
                  <div>
                    <Label htmlFor="name">Full name</Label>
                    <Input id="name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                  </div>
                )}
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="pwd">Password</Label>
                  <Input id="pwd" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
                </div>
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
          placeholder="Enter OTP"
          value={emailOtp}
          onChange={(e) => setEmailOtp(e.target.value)}
        />

        <Button
          type="button"
          onClick={verifyEmailOtp}
          className="w-full"
        >
          Verify OTP
        </Button>
      </>
    )}

    {emailVerified && (
      <p className="text-green-600">
        ✅ Email Verified
      </p>
    )}
  </>
)}
                {mode === "signup" && (
                  <label className="flex items-start gap-2 text-sm">
                    <input type="checkbox" checked={asSeller} onChange={(e) => setAsSeller(e.target.checked)} className="mt-0.5" />
                    <span>I want to sell on VrushCart</span>
                  </label>
                )}
                <Button
  type="submit"
  className="w-full bg-gradient-hero text-white border-0"
  disabled={
    loading ||
    (mode === "signup" && !emailVerified)
  }
>
  {loading && (
    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
  )}
  {mode === "signin"
    ? "Sign in"
    : "Create account"}
</Button>
              </form>

              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">or continue with</span></div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button type="button" variant="outline" onClick={() => onOAuth(signInWithGoogle)} disabled={loading}>
                  <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/></svg>
                  Google
                </Button>
                <Button type="button" variant="outline" onClick={() => onOAuth(signInWithApple)} disabled={loading}>
                  <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                  Apple
                </Button>
              </div>

              <p className="text-center text-sm text-muted-foreground">
                {mode === "signin" ? (
                  <>New here? <button type="button" className="text-primary hover:underline" onClick={() => setMode("signup")}>Create account</button></>
                ) : (
                  <>Already have one? <button type="button" className="text-primary hover:underline" onClick={() => setMode("signin")}>Sign in</button></>
                )}
              </p>
            </TabsContent>

            <TabsContent value="phone" className="mt-4">
              <form onSubmit={onPhone} className="space-y-3">
                <div>
                  <Label htmlFor="phone">Phone (with country code)</Label>
                  <Input id="phone" placeholder="+919876543210" value={phone} onChange={(e) => setPhone(e.target.value)} required disabled={otpSent} />
                </div>
                {otpSent && (
                  <div>
                    <Label htmlFor="otp">OTP</Label>
                    <Input id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} required />
                  </div>
                )}
                <Button type="submit" className="w-full bg-gradient-hero text-white border-0" disabled={loading}>
                  {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  {otpSent ? "Verify OTP" : "Send OTP"}
                </Button>
                <p className="text-xs text-muted-foreground text-center">Phone sign-in requires SMS provider configuration in backend settings.</p>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
