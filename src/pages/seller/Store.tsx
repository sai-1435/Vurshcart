import { useEffect, useState } from "react";
import { SellerLayout } from "@/components/SellerLayout";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function SellerStore() {
  const { user } = useAuth();
  const [form, setForm] = useState({ store_name: "", description: "", logo_url: "", banner_url: "", gst_number: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase.from("seller_profiles").select("*").eq("user_id", user.id).maybeSingle().then(({ data }) => {
      if (data) setForm({
        store_name: data.store_name, description: data.description ?? "", logo_url: data.logo_url ?? "",
        banner_url: data.banner_url ?? "", gst_number: data.gst_number ?? "",
      });
    });
  }, [user]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from("seller_profiles").update(form).eq("user_id", user.id);
    setSaving(false);
    if (error) toast.error(error.message); else toast.success("Store updated");
  };

  return (
    <SellerLayout>
      <h1 className="text-2xl font-bold mb-6">Store Profile</h1>
      <form onSubmit={submit} className="bg-card border border-border rounded-xl p-6 space-y-4 max-w-2xl">
        <div><Label>Store name</Label><Input value={form.store_name} onChange={e => setForm({ ...form, store_name: e.target.value })} required/></div>
        <div><Label>Description</Label><Textarea rows={4} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}/></div>
        <div className="grid sm:grid-cols-2 gap-3">
          <div><Label>Logo URL</Label><Input value={form.logo_url} onChange={e => setForm({ ...form, logo_url: e.target.value })} placeholder="https://..."/></div>
          <div><Label>Banner URL</Label><Input value={form.banner_url} onChange={e => setForm({ ...form, banner_url: e.target.value })} placeholder="https://..."/></div>
        </div>
        <div><Label>GST number</Label><Input value={form.gst_number} onChange={e => setForm({ ...form, gst_number: e.target.value })}/></div>
        <Button type="submit" disabled={saving} className="bg-gradient-hero text-white border-0">
          {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin"/>} Save
        </Button>
      </form>
    </SellerLayout>
  );
}
