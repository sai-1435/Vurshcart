import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, Sparkles, Truck, Shield, Zap, Mic, Camera, Brain, Globe, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";


const categories = [
  { name: "Electronics", slug: "electronics", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80" },
  { name: "Fashion", slug: "fashion", img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&q=80" },
  { name: "Home & Kitchen", slug: "home-kitchen", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&q=80" },
  { name: "Beauty", slug: "beauty", img: "https://images.unsplash.com/photo-1522335789203-aaa1f3b3a6f1?w=500&q=80" },
  { name: "Sports", slug: "sports", img: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=500&q=80" },
  { name: "Books", slug: "books", img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&q=80" },
];

const features = [
  { icon: Brain, title: "AI Shopping Assistant", desc: "Personal stylist & deal finder, 24/7." },
  { icon: Mic, title: "Voice & Visual Search", desc: "Snap, speak, or scan to find anything." },
  { icon: Truck, title: "Same-Day Delivery", desc: "Hyperlocal logistics across India." },
  { icon: Shield, title: "Buyer Protection", desc: "100% safe payments & easy returns." },
  { icon: Sparkles, title: "VrushCart Prime", desc: "Free shipping, OTT perks, cashback." },
  { icon: Globe, title: "Global Marketplace", desc: "100+ countries, 50+ languages." },
];

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* HERO */}
      <section
  className="relative overflow-hidden"
  style={{
    backgroundImage:
      "url('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=2000&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
          <div className="absolute inset-0 bg-white/75 backdrop-blur-md" />      
          <div className="container mx-auto px-4 py-16 md:py-24 grid lg:grid-cols-2 gap-12 items-center relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium mb-5">
              <Sparkles className="h-3.5 w-3.5" /> AI-Powered Global Marketplace
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight">
              Buy, sell, and grow with <span className="text-gradient">intelligent commerce</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-xl">
              VrushCart blends AI, social commerce, and lightning-fast logistics into one beautiful marketplace.
              500M+ products. 100M+ shoppers. Built for India, made for the world.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/shop"><Button size="lg" className="bg-gradient-hero text-white border-0 shadow-glow">
                Start shopping <ArrowRight className="h-4 w-4 ml-1" />
              </Button></Link>
              <Link to="/become-seller"><Button size="lg" variant="outline">Sell on VrushCart</Button></Link>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1"><Star className="h-4 w-4 fill-warning text-warning" /><span>4.8 / 5 · 2M+ reviews</span></div>
              <div className="hidden sm:flex items-center gap-1"><Zap className="h-4 w-4 text-primary" /><span>99.99% uptime</span></div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }} className="relative">
            <div className="grid grid-cols-2 gap-4">
              {[
                "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
                "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
                "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
                "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80",
              ].map((src, i) => (
                <motion.div key={i}
                  initial={{ y: i % 2 ? 30 : -30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                  className={`rounded-2xl overflow-hidden shadow-card ${i % 2 ? 'mt-8' : ''}`}>
                  <img src={src} alt="" className="w-full h-48 md:h-56 object-cover" loading="lazy" />
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}
              className="absolute -left-4 bottom-8 bg-card rounded-xl p-4 shadow-card border border-border hidden md:block">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-hero grid place-items-center"><Brain className="h-5 w-5 text-white"/></div>
                <div>
                  <p className="text-xs text-muted-foreground">AI Assistant</p>
                  <p className="text-sm font-medium">Found 12 deals for you</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">Shop by category</h2>
            <p className="text-muted-foreground mt-1">From electronics to fashion — millions of products.</p>
          </div>
          <Link to="/shop" className="text-sm text-primary hover:underline hidden sm:flex items-center gap-1">View all <ArrowRight className="h-3 w-3"/></Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((c, i) => (
            <motion.div key={c.slug}
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}>
              <Link to={`/category/${c.slug}`} className="group block rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/40 hover:shadow-card transition-all">
                <div className="aspect-square overflow-hidden">
                  <img src={c.img} alt={c.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-3 text-center">
                  <p className="font-medium text-sm">{c.name}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-secondary/40 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Built for next-generation commerce</h2>
            <p className="text-muted-foreground mt-3">Every part of the journey — search, checkout, delivery, support — powered by AI.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div key={f.title}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-card rounded-2xl p-6 border border-border hover:shadow-card transition-shadow">
                <div className="h-11 w-11 rounded-xl bg-gradient-hero grid place-items-center shadow-glow">
                  <f.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="mt-4 font-semibold text-lg">{f.title}</h3>
                <p className="text-sm text-muted-foreground mt-1.5">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SELLER CTA */}
      <section className="container mx-auto px-4 py-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-10 md:p-16 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(255,255,255,0.15),transparent_60%)]" />
          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <ShoppingCart className="h-10 w-10 mb-4 opacity-90" />
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">Launch your store in minutes</h2>
              <p className="mt-3 text-white/85 text-lg max-w-md">Reach 100M+ customers. AI product listings, smart pricing, instant payouts. Zero setup fees.</p>
              <Link to="/become-seller" className="inline-block mt-6">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">Become a Seller</Button>
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              {[{ n: "100M+", l: "Active buyers" }, { n: "₹2L cr", l: "GMV / yr" }, { n: "100+", l: "Countries" }, { n: "50+", l: "Languages" }, { n: "10M+", l: "Daily orders" }, { n: "AI", l: "Powered" }].map(s => (
                <div key={s.l} className="rounded-xl bg-white/10 backdrop-blur p-4">
                  <div className="text-2xl font-bold">{s.n}</div>
                  <div className="text-xs text-white/80 mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* PRODUCTS */}
<section className="container mx-auto px-4 py-16">
  <h2 className="text-3xl font-bold mb-8">
    Featured Products
  </h2>

  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
    <div className="bg-card rounded-xl border p-4">
      <img
        src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab"
        alt="iPhone"
        className="w-full h-56 object-cover rounded-lg"
      />
      <h3 className="font-semibold mt-3">
        Apple iPhone 16
      </h3>
      <p className="text-primary font-bold">
        ₹79,999
      </p>
    </div>

    <div className="bg-card rounded-xl border p-4">
      <img
        src="https://images.unsplash.com/photo-1610945265064-0e34e5519bbf"
        alt="Samsung"
        className="w-full h-56 object-cover rounded-lg"
      />
      <h3 className="font-semibold mt-3">
        Samsung Galaxy S25
      </h3>
      <p className="text-primary font-bold">
        ₹69,999
      </p>
    </div>
  </div>
</section>

      <Footer />
    </div>
  );
}
