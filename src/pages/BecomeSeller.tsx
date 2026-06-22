import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShopLayout } from "@/components/ShopLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Store, TrendingUp, Globe, Zap } from "lucide-react";
import { toast } from "sonner";

export default function BecomeSeller() {
  const { becomeSeller, isSeller } = useAuth();
  const [storeName, setStoreName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (isSeller) { navigate("/seller"); return null; }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try { await becomeSeller(storeName); toast.success("Welcome, seller!"); navigate("/seller"); }
    catch (e: any) { toast.error(e.message); }
    setLoading(false);
  };

  return (
    <ShopLayout>
      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <div className="text-center mb-10">
          <div className="inline-flex h-14 w-14 rounded-2xl bg-gradient-hero text-white items-center justify-center mb-4 shadow-glow">
            <Store className="h-7 w-7"/>
          </div>
          <h1 className="text-4xl font-bold">Sell on VrushCart</h1>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">Reach 100M+ buyers in minutes. Zero setup fees, AI-powered listings, instant payouts.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {[
            { icon: TrendingUp, t: "Grow fast", d: "Average +40% revenue in 90 days." },
            { icon: Zap, t: "AI listings", d: "Generate titles, descriptions, SEO automatically." },
            { icon: Globe, t: "Global reach", d: "Sell across 100+ countries." },
          ].map(f => (
            <div key={f.t} className="bg-card border border-border rounded-xl p-5">
              <f.icon className="h-5 w-5 text-primary mb-2"/>
              <p className="font-semibold">{f.t}</p>
              <p className="text-sm text-muted-foreground">{f.d}</p>
            </div>
          ))}
        </div>
        <form onSubmit={submit} className="bg-card border border-border rounded-xl p-6 space-y-4 max-w-lg mx-auto">
          <div>
            <Label htmlFor="sn">Your store name</Label>
            <Input id="sn" required value={storeName} onChange={e => setStoreName(e.target.value)} placeholder="e.g. Ravi Electronics"/>
          </div>
          <Button type="submit" disabled={loading || !storeName} className="w-full bg-gradient-hero text-white border-0">
            {loading ? "Setting up..." : "Open my store"}
          </Button>
        </form>
      </div>
    </ShopLayout>
  );
}
