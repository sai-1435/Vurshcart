import { Link } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Mic,
} from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-white border-b shadow-sm">
      <div className="container mx-auto px-6 h-20 flex items-center">

        {/* Logo */}
        <Link to="/" className="flex flex-col leading-none mr-8">
          <div
            className="text-4xl uppercase"
            style={{
              fontFamily: "Playfair Display, serif",
              letterSpacing: "0.08em",
              fontWeight: 700,
            }}
          >
            VK
          </div>

          <div
            className="text-[9px] uppercase text-gray-500"
            style={{
              letterSpacing: "0.18em",
            }}
          >
            VRUKART
          </div>
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-6xl mx-4 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />

          <input
            type="text"
            placeholder="Search products, brands and more..."
            className="w-full h-12 pl-12 pr-12 border border-gray-200 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <Mic className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 cursor-pointer hover:text-black" />
        </div>

        {/* Right Menu */}
        <div className="flex items-center gap-8 text-sm ml-6">

          <Link to="/help" className="hover:text-black">
  Help
</Link>

<Link to="/orders" className="hover:text-black">
  Orders
</Link>

<Link to="/shop" className="hover:text-black">
  Offers
</Link>

<Link to="/wishlist">
  <Heart className="h-5 w-5 cursor-pointer hover:scale-110 transition" />
</Link>

<Link to="/cart">
  <ShoppingCart className="h-5 w-5 cursor-pointer hover:scale-110 transition" />
</Link>

<Link to="/account">
  <User className="h-5 w-5 cursor-pointer hover:scale-110 transition" />
</Link>
        </div>
      </div>
    </header>
  );
}