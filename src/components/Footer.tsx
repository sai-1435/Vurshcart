import { Link } from "react-router-dom";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/50 mt-16">
      <div className="container mx-auto px-4 py-12 grid gap-8 md:grid-cols-4">
        <div>
          <Logo />
          <p className="text-sm text-muted-foreground mt-3 max-w-xs">
            India's most advanced AI-powered marketplace. Buy, sell, and grow.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm">Shop</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/shop" className="hover:text-foreground">All Products</Link></li>
            <li><Link to="/category/electronics" className="hover:text-foreground">Electronics</Link></li>
            <li><Link to="/category/fashion" className="hover:text-foreground">Fashion</Link></li>
            <li><Link to="/category/home-kitchen" className="hover:text-foreground">Home & Kitchen</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm">Sell</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/become-seller" className="hover:text-foreground">Become a Seller</Link></li>
            <li><Link to="/seller" className="hover:text-foreground">Seller Dashboard</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-foreground">About</Link></li>
            <li><Link to="/" className="hover:text-foreground">Contact</Link></li>
            <li><Link to="/" className="hover:text-foreground">Privacy</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} VrushCart. All rights reserved.
      </div>
    </footer>
  );
}
