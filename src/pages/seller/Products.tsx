import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SellerLayout } from "@/components/SellerLayout";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { formatINR, productImage } from "@/lib/format";
import { Plus, Pencil, Trash2, Package } from "lucide-react";
import { toast } from "sonner";

export default function SellerProducts() {
  const { user } = useAuth();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    if (!user) return;
    supabase.from("products").select("*").eq("seller_id", user.id).order("created_at", { ascending: false })
      .then(({ data }) => { setProducts(data ?? []); setLoading(false); });
  };
  useEffect(load, [user]);

  const del = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) toast.error(error.message); else { toast.success("Deleted"); load(); }
  };

  return (
    <SellerLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link to="/seller/products/new"><Button className="bg-gradient-hero text-white border-0"><Plus className="h-4 w-4 mr-1"/>Add Product</Button></Link>
      </div>
      {loading ? <p>Loading…</p> : products.length === 0 ? (
        <div className="text-center py-16 bg-card rounded-2xl border border-border">
          <Package className="h-16 w-16 mx-auto text-muted-foreground mb-3"/>
          <p className="text-muted-foreground">No products yet.</p>
          <Link to="/seller/products/new" className="text-primary mt-2 inline-block">Add your first product →</Link>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-secondary text-xs uppercase text-muted-foreground">
              <tr><th className="text-left p-3">Product</th><th className="text-left p-3 hidden sm:table-cell">Price</th><th className="text-left p-3 hidden sm:table-cell">Stock</th><th className="text-left p-3 hidden md:table-cell">Status</th><th className="p-3"></th></tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} className="border-t border-border">
                  <td className="p-3 flex items-center gap-3 min-w-0"><img src={productImage(p.images)} alt="" className="h-12 w-12 rounded object-cover bg-secondary"/><span className="font-medium truncate">{p.title}</span></td>
                  <td className="p-3 hidden sm:table-cell">{formatINR(p.price)}</td>
                  <td className="p-3 hidden sm:table-cell">{p.stock}</td>
                  <td className="p-3 hidden md:table-cell"><span className="px-2 py-0.5 text-xs rounded-full bg-success/10 text-success capitalize">{p.status}</span></td>
                  <td className="p-3 text-right whitespace-nowrap">
                    <Link to={`/seller/products/${p.id}`}><Button variant="ghost" size="icon"><Pencil className="h-4 w-4"/></Button></Link>
                    <Button variant="ghost" size="icon" onClick={() => del(p.id)}><Trash2 className="h-4 w-4 text-destructive"/></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </SellerLayout>
  );
}
