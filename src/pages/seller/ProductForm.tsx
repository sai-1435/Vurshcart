import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SellerLayout } from "@/components/SellerLayout";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, X } from "lucide-react";
import { slugify } from "@/lib/format";

export default function SellerProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [cats, setCats] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const [imgInput, setImgInput] = useState("");
  const [form, setForm] = useState({
    title: "", description: "", brand: "", price: "", compare_price: "", stock: "10",
    category_id: "", status: "active", images: [] as string[],
  });

  useEffect(() => {
    supabase.from("categories").select("id, name").then(({ data }) => setCats(data ?? []));
    if (id) {
      supabase.from("products").select("*").eq("id", id).maybeSingle().then(({ data }) => {
        if (data) setForm({
          title: data.title, description: data.description ?? "", brand: data.brand ?? "",
          price: String(data.price), compare_price: data.compare_price ? String(data.compare_price) : "",
          stock: String(data.stock), category_id: data.category_id ?? "", status: data.status,
          images: Array.isArray(data.images) ? data.images as string[] : [],
        });
      });
    }
  }, [id]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    const payload = {
      title: form.title, description: form.description, brand: form.brand || null,
      price: Number(form.price), compare_price: form.compare_price ? Number(form.compare_price) : null,
      stock: Number(form.stock), category_id: form.category_id || null, status: form.status,
      images: form.images, seller_id: user.id,
      slug: slugify(form.title) + "-" + Math.random().toString(36).slice(2, 7),
    };
    const { error } = id
      ? await supabase.from("products").update(payload).eq("id", id)
      : await supabase.from("products").insert(payload);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success(id ? "Updated" : "Product added");
    navigate("/seller/products");
  };

  const addImg = () => {
    if (!imgInput.trim()) return;
    setForm({ ...form, images: [...form.images, imgInput.trim()] });
    setImgInput("");
  };

  return (
    <SellerLayout>
      <h1 className="text-2xl font-bold mb-6">{id ? "Edit Product" : "Add Product"}</h1>
      <form onSubmit={submit} className="grid lg:grid-cols-3 gap-4 max-w-5xl">
        <div className="lg:col-span-2 space-y-4">
          <section className="bg-card border border-border rounded-xl p-5 space-y-3">
            <div><Label>Title *</Label><Input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}/></div>
            <div><Label>Description</Label><Textarea rows={5} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}/></div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div><Label>Brand</Label><Input value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })}/></div>
              <div><Label>Category</Label>
                <Select value={form.category_id} onValueChange={v => setForm({ ...form, category_id: v })}>
                  <SelectTrigger><SelectValue placeholder="Select category"/></SelectTrigger>
                  <SelectContent>{cats.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
          </section>
          <section className="bg-card border border-border rounded-xl p-5 space-y-3">
            <h3 className="font-semibold">Images</h3>
            <div className="flex gap-2"><Input placeholder="Paste image URL (https://...)" value={imgInput} onChange={e => setImgInput(e.target.value)} onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addImg())} /><Button type="button" onClick={addImg}>Add</Button></div>
            <div className="flex flex-wrap gap-2">
              {form.images.map((img, i) => (
                <div key={i} className="relative h-20 w-20 rounded-lg overflow-hidden border border-border">
                  <img src={img} alt="" className="h-full w-full object-cover"/>
                  <button type="button" onClick={() => setForm({ ...form, images: form.images.filter((_, x) => x !== i) })} className="absolute top-0.5 right-0.5 bg-destructive text-destructive-foreground rounded-full p-0.5"><X className="h-3 w-3"/></button>
                </div>
              ))}
            </div>
          </section>
        </div>
        <aside className="space-y-4">
          <section className="bg-card border border-border rounded-xl p-5 space-y-3">
            <div><Label>Price (₹) *</Label><Input required type="number" min="0" step="0.01" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })}/></div>
            <div><Label>Compare-at price</Label><Input type="number" min="0" step="0.01" value={form.compare_price} onChange={e => setForm({ ...form, compare_price: e.target.value })}/></div>
            <div><Label>Stock *</Label><Input required type="number" min="0" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })}/></div>
            <div><Label>Status</Label>
              <Select value={form.status} onValueChange={v => setForm({ ...form, status: v })}>
                <SelectTrigger><SelectValue/></SelectTrigger>
                <SelectContent><SelectItem value="active">Active</SelectItem><SelectItem value="draft">Draft</SelectItem></SelectContent>
              </Select>
            </div>
          </section>
          <Button type="submit" disabled={saving} className="w-full bg-gradient-hero text-white border-0">
            {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin"/>}
            {id ? "Save changes" : "Publish product"}
          </Button>
        </aside>
      </form>
    </SellerLayout>
  );
}
