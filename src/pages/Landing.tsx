import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  ChevronDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";

const categories = [
  "Electronics",
  "Fashion",
  "Mobiles",
  "Home",
  "Kitchen",
  "Beauty",
  "Sports",
  "Books",
];

const heroSlides = [
  {
    title: "Premium Shopping",
    subtitle: "Everything You Need In One Place",
    button: "Shop Now",
    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&q=80",
  },
  {
    title: "Latest Electronics",
    subtitle: "Discover New Technology",
    button: "Explore",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600&q=80",
  },
  {
    title: "Fashion Collection",
    subtitle: "New Styles Every Week",
    button: "Browse",
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1600&q=80",
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-white text-black">

      {/* ================= NAVBAR ================= */}

      <header className="sticky top-0 z-50 bg-white border-b">

        <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">

          {/* LOGO */}

          <Link
            to="/"
            className="flex items-center gap-3"
          >

            <div className="w-12 h-12 bg-black text-white flex items-center justify-center text-xl font-black rounded-md">

              VK

            </div>

            <div>

              <h1 className="text-xl font-black tracking-wider">

                VRUKART

              </h1>

              <p className="text-xs text-gray-500">

                Premium Shopping

              </p>

            </div>

          </Link>

          {/* SEARCH */}

          <div className="hidden lg:flex flex-1 max-w-2xl mx-10">

            <div className="w-full flex border-2 border-black rounded-md overflow-hidden">

              <input
                type="text"
                placeholder="Search products..."
                className="flex-1 px-5 py-3 outline-none"
              />

              <button className="bg-black text-white px-6">

                <Search size={20} />

              </button>

            </div>

          </div>

          {/* RIGHT MENU */}

          <div className="flex items-center gap-6">

            <Link to="/wishlist">
              <Heart className="h-6 w-6" />
            </Link>

            <Link to="/cart">
              <ShoppingCart className="h-6 w-6" />
            </Link>

            <Link to="/login">
              <User className="h-6 w-6" />
            </Link>

          </div>
                  {/* MOBILE MENU */}

          <button className="lg:hidden">

            <Menu className="h-7 w-7" />

          </button>

        </div>

        {/* CATEGORY NAVIGATION */}

        <div className="border-t border-gray-200">

          <div className="max-w-7xl mx-auto h-14 px-6 flex items-center gap-8 overflow-x-auto whitespace-nowrap">

            <Link
              to="/shop"
              className="font-semibold hover:text-gray-500 transition"
            >
              Shop
            </Link>

            {categories.map((category) => (

              <Link
                key={category}
                to={`/category/${category.toLowerCase()}`}
                className="flex items-center gap-1 hover:text-gray-500 transition"
              >
                {category}
                <ChevronDown className="h-4 w-4" />
              </Link>

            ))}

            <Link
              to="/become-seller"
              className="ml-auto font-semibold hover:text-gray-500"
            >
              Become Seller
            </Link>

          </div>

        </div>

      </header>

      {/* ================= HERO ================= */}

      <section className="relative">

        {heroSlides.map((slide, index) => (

          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === 0 ? 1 : 0 }}
            transition={{ duration: 1 }}
            className={index === 0 ? "block" : "hidden"}
          >

            <div
              className="h-[650px] bg-cover bg-center relative"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >

              <div className="absolute inset-0 bg-black/55" />

              <div className="relative z-10 max-w-7xl mx-auto h-full px-6 flex items-center">

                <div className="max-w-2xl text-white">

                  <motion.h1
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-6xl font-black leading-tight"
                  >

                    {slide.title}

                  </motion.h1>

                  <motion.p
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl mt-6 text-gray-200"
                  >

                    {slide.subtitle}

                  </motion.p>

                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-10 flex gap-5"
                  >

                    <Button
                      size="lg"
                      className="bg-white text-black hover:bg-gray-200 rounded-none px-10"
                    >
                      {slide.button}
                    </Button>

                    <Button
                      variant="outline"
                      size="lg"
                      className="border-white text-white hover:bg-white hover:text-black rounded-none px-10"
                    >
                      View Products
                    </Button>

                  </motion.div>

                </div>

              </div>

            </div>

          </motion.div>

        ))}

      </section>
            {/* ================= TODAY'S DEALS ================= */}

      <section className="py-20 bg-gray-50">

        <div className="max-w-7xl mx-auto px-6">

          <div className="flex items-center justify-between mb-10">

            <div>

              <h2 className="text-4xl font-black">

                Today's Deals

              </h2>

              <p className="text-gray-500 mt-2">

                Hand-picked products at the best prices.

              </p>

            </div>

            <Link
              to="/shop"
              className="font-semibold hover:underline"
            >
              View All →
            </Link>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

            {[
              {
                id: 1,
                name: "Apple iPhone 16 Pro",
                price: "₹1,19,999",
                oldPrice: "₹1,34,999",
                rating: "4.9",
                image:
                  "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&q=80",
              },
              {
                id: 2,
                name: "Sony WH-1000XM5",
                price: "₹27,999",
                oldPrice: "₹34,999",
                rating: "4.8",
                image:
                  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
              },
              {
                id: 3,
                name: "Apple Watch Ultra",
                price: "₹79,999",
                oldPrice: "₹89,999",
                rating: "4.9",
                image:
                  "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80",
              },
              {
                id: 4,
                name: "MacBook Air M4",
                price: "₹99,999",
                oldPrice: "₹1,14,999",
                rating: "5.0",
                image:
                  "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?w=600&q=80",
              },
            ].map((product) => (

              <motion.div
                key={product.id}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-xl"
              >

                <div className="relative">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-72 object-cover"
                  />

                  <button
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center"
                  >

                    <Heart className="w-5 h-5" />

                  </button>

                </div>

                <div className="p-5">

                  <h3 className="font-bold text-lg line-clamp-2">

                    {product.name}

                  </h3>

                  <div className="flex items-center gap-2 mt-3">

                    <span className="text-2xl font-black">

                      {product.price}

                    </span>

                    <span className="line-through text-gray-400">

                      {product.oldPrice}

                    </span>

                  </div>

                  <div className="mt-2 text-sm">

                    ⭐ {product.rating} / 5

                  </div>

                  <Button
                    className="w-full mt-6 bg-black text-white hover:bg-neutral-800 rounded-none"
                  >
                    Add To Cart
                  </Button>

                </div>

              </motion.div>

            ))}

          </div>

        </div>

      </section>
            {/* ================= SHOP BY CATEGORY ================= */}

      <section className="py-20 bg-white">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-14">

            <h2 className="text-4xl font-black">

              Shop By Category

            </h2>

            <p className="text-gray-500 mt-3">

              Discover products from every category.

            </p>

          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">

            {[
              {
                name: "Electronics",
                image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80",
              },
              {
                name: "Fashion",
                image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&q=80",
              },
              {
                name: "Mobiles",
                image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80",
              },
              {
                name: "Home",
                image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&q=80",
              },
              {
                name: "Kitchen",
                image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&q=80",
              },
              {
                name: "Sports",
                image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=500&q=80",
              },
            ].map((category) => (

              <Link
                key={category.name}
                to={`/category/${category.name.toLowerCase()}`}
              >

                <motion.div
                  whileHover={{
                    y: -8,
                    scale: 1.03,
                  }}
                  className="border rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition"
                >

                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-44 w-full object-cover"
                  />

                  <div className="p-4 text-center">

                    <h3 className="font-bold text-lg">

                      {category.name}

                    </h3>

                  </div>

                </motion.div>

              </Link>

            ))}

          </div>

        </div>

      </section>
            {/* ================= FEATURED PRODUCTS ================= */}

      <section className="py-20 bg-gray-100">

        <div className="max-w-7xl mx-auto px-6">

          <div className="flex items-center justify-between mb-12">

            <div>

              <h2 className="text-4xl font-black">

                Featured Products

              </h2>

              <p className="text-gray-500 mt-2">

                Trending products selected for you.

              </p>

            </div>

            <Link
              to="/products"
              className="font-semibold hover:underline"
            >
              View All →
            </Link>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

            {[
              {
                id: 1,
                name: "Apple AirPods Pro",
                price: "₹24,999",
                oldPrice: "₹29,999",
                image:
                  "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=600&q=80",
              },
              {
                id: 2,
                name: "Gaming Laptop",
                price: "₹89,999",
                oldPrice: "₹99,999",
                image:
                  "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80",
              },
              {
                id: 3,
                name: "Canon DSLR Camera",
                price: "₹64,999",
                oldPrice: "₹74,999",
                image:
                  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80",
              },
              {
                id: 4,
                name: "Smart TV",
                price: "₹49,999",
                oldPrice: "₹59,999",
                image:
                  "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&q=80",
              },
            ].map((product) => (

              <motion.div
                key={product.id}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}
                className="bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition"
              >

                <div className="relative">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />

                  <button
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center"
                  >

                    <Heart className="w-5 h-5" />

                  </button>

                </div>

                <div className="p-5">

                  <h3 className="font-bold text-lg">

                    {product.name}

                  </h3>

                  <div className="mt-3 flex gap-2 items-center">

                    <span className="text-2xl font-black">

                      {product.price}

                    </span>

                    <span className="line-through text-gray-400">

                      {product.oldPrice}

                    </span>

                  </div>

                  <Button
                    className="w-full mt-6 bg-black text-white hover:bg-neutral-800 rounded-none"
                  >

                    Add To Cart

                  </Button>

                </div>

              </motion.div>

            ))}

          </div>

        </div>

      </section>
            {/* ================= BEST SELLERS ================= */}

      <section className="py-20 bg-white">

        <div className="max-w-7xl mx-auto px-6">

          <div className="flex justify-between items-center mb-10">

            <div>

              <h2 className="text-4xl font-black">
                Best Sellers
              </h2>

              <p className="text-gray-500 mt-2">
                Most purchased products this week.
              </p>

            </div>

            <Link
              to="/products"
              className="font-semibold hover:underline"
            >
              View All →
            </Link>

          </div>

          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">

            {[
              {
                id: 1,
                name: "Apple Watch",
                price: "₹39,999",
                image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80",
              },
              {
                id: 2,
                name: "Sony Camera",
                price: "₹69,999",
                image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80",
              },
              {
                id: 3,
                name: "Nike Shoes",
                price: "₹7,999",
                image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
              },
              {
                id: 4,
                name: "MacBook Pro",
                price: "₹1,49,999",
                image: "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?w=600&q=80",
              },
              {
                id: 5,
                name: "Headphones",
                price: "₹14,999",
                image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
              },
              {
                id: 6,
                name: "Gaming Mouse",
                price: "₹3,999",
                image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=600&q=80",
              },
            ].map((product) => (

              <motion.div
                key={product.id}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                }}
                className="min-w-[280px] bg-white border rounded-xl overflow-hidden shadow hover:shadow-xl"
              >

                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />

                <div className="p-5">

                  <h3 className="font-bold text-lg">
                    {product.name}
                  </h3>

                  <p className="text-2xl font-black mt-3">
                    {product.price}
                  </p>

                  <Button
                    className="w-full mt-5 bg-black text-white hover:bg-neutral-800 rounded-none"
                  >
                    Buy Now
                  </Button>

                </div>

              </motion.div>

            ))}

          </div>

        </div>

      </section>
            {/* ================= NEW ARRIVALS ================= */}

      <section className="py-20 bg-gray-100">

        <div className="max-w-7xl mx-auto px-6">

          <div className="flex items-center justify-between mb-10">

            <div>

              <h2 className="text-4xl font-black">
                New Arrivals
              </h2>

              <p className="text-gray-500 mt-2">
                Explore our newest collections.
              </p>

            </div>

            <Link
              to="/products"
              className="font-semibold hover:underline"
            >
              View All →
            </Link>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {[
              {
                id: 1,
                name: "Wireless Earbuds",
                price: "₹6,999",
                image:
                  "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&q=80",
              },
              {
                id: 2,
                name: "Gaming Keyboard",
                price: "₹4,999",
                image:
                  "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=600&q=80",
              },
              {
                id: 3,
                name: "Smart Speaker",
                price: "₹8,499",
                image:
                  "https://images.unsplash.com/photo-1543512214-318c7553f230?w=600&q=80",
              },
              {
                id: 4,
                name: "Luxury Backpack",
                price: "₹5,999",
                image:
                  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
              },
            ].map((product) => (

              <motion.div
                key={product.id}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}
                className="bg-white rounded-xl border overflow-hidden shadow hover:shadow-xl"
              >

                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />

                <div className="p-5">

                  <span className="inline-block bg-black text-white text-xs px-3 py-1 rounded-full mb-3">
                    NEW
                  </span>

                  <h3 className="font-bold text-lg">
                    {product.name}
                  </h3>

                  <p className="text-2xl font-black mt-3">
                    {product.price}
                  </p>

                  <Button
                    className="w-full mt-5 bg-black text-white hover:bg-neutral-800 rounded-none"
                  >
                    Shop Now
                  </Button>

                </div>

              </motion.div>

            ))}

          </div>

        </div>

      </section>
            {/* ================= TOP BRANDS ================= */}

      <section className="py-20 bg-white">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-14">

            <h2 className="text-4xl font-black">

              Shop By Brands

            </h2>

            <p className="text-gray-500 mt-3">

              Explore products from your favorite brands.

            </p>

          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

            {[
              "Apple",
              "Samsung",
              "Sony",
              "Nike",
              "Adidas",
              "Dell",
              "HP",
              "Lenovo",
              "LG",
              "Canon",
              "Boat",
              "Puma",
            ].map((brand) => (

              <motion.div
                key={brand}
                whileHover={{
                  y: -6,
                  scale: 1.05,
                }}
                className="border border-gray-200 rounded-xl h-32 flex items-center justify-center bg-white shadow-sm hover:shadow-lg cursor-pointer transition-all"
              >

                <h3 className="text-2xl font-black tracking-wide">

                  {brand}

                </h3>

              </motion.div>

            ))}

          </div>

        </div>

      </section>
            {/* ================= CUSTOMER REVIEWS ================= */}

      <section className="py-20 bg-gray-100">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-14">

            <h2 className="text-4xl font-black">
              What Our Customers Say
            </h2>

            <p className="text-gray-500 mt-3">
              Trusted by thousands of happy shoppers.
            </p>

          </div>

          <div className="grid md:grid-cols-3 gap-8">

            {[
              {
                name: "Rahul Sharma",
                review:
                  "Amazing shopping experience. Fast delivery and excellent product quality.",
                rating: 5,
              },
              {
                name: "Priya Reddy",
                review:
                  "The website is clean, easy to use and customer support is very responsive.",
                rating: 5,
              },
              {
                name: "Arjun Kumar",
                review:
                  "Best prices compared to other marketplaces. Highly recommended.",
                rating: 5,
              },
            ].map((review, index) => (

              <motion.div
                key={index}
                whileHover={{
                  y: -8,
                }}
                className="bg-white rounded-xl p-8 shadow hover:shadow-xl border"
              >

                <div className="text-2xl mb-4">

                  {"⭐".repeat(review.rating)}

                </div>

                <p className="text-gray-700 leading-7">

                  "{review.review}"

                </p>

                <h3 className="mt-8 font-bold text-lg">

                  {review.name}

                </h3>

              </motion.div>

            ))}

          </div>

        </div>

      </section>
            {/* ================= NEWSLETTER ================= */}

      <section className="py-20 bg-white">

        <div className="max-w-4xl mx-auto px-6 text-center">

          <h2 className="text-5xl font-black">

            Stay Updated

          </h2>

          <p className="text-gray-500 mt-5 text-lg">

            Subscribe to receive the latest products, exclusive deals,
            and shopping updates directly to your inbox.

          </p>

          <div className="mt-10 flex flex-col md:flex-row gap-4">

            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 border-2 border-black px-6 py-4 rounded-none outline-none"
            />

            <Button
              className="bg-black text-white rounded-none px-10 hover:bg-neutral-800"
            >
              Subscribe
            </Button>

          </div>

        </div>

      </section>

      {/* ================= FOOTER ================= */}

      <footer className="bg-black text-white">

        <div className="max-w-7xl mx-auto px-6 py-20">

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10">

            {/* Logo */}

            <div>

              <div className="w-14 h-14 bg-white text-black flex items-center justify-center text-2xl font-black rounded-md">

                VK

              </div>

              <h2 className="text-3xl font-black mt-5">

                VRUKART

              </h2>

              <p className="text-gray-400 mt-4 leading-7">

                Premium online shopping platform
                built for speed, quality and trust.

              </p>

            </div>

            {/* Company */}

            <div>

              <h3 className="font-bold text-xl mb-5">

                Company

              </h3>

              <ul className="space-y-3 text-gray-400">

                <li><Link to="/about">About Us</Link></li>

                <li><Link to="/careers">Careers</Link></li>

                <li><Link to="/blog">Blog</Link></li>

                <li><Link to="/contact">Contact</Link></li>

              </ul>

            </div>

            {/* Shop */}

            <div>

              <h3 className="font-bold text-xl mb-5">

                Shop

              </h3>

              <ul className="space-y-3 text-gray-400">

                <li><Link to="/products">Products</Link></li>

                <li><Link to="/categories">Categories</Link></li>

                <li><Link to="/offers">Offers</Link></li>

                <li><Link to="/brands">Brands</Link></li>

              </ul>

            </div>

            {/* Customer */}

            <div>

              <h3 className="font-bold text-xl mb-5">

                Customer

              </h3>

              <ul className="space-y-3 text-gray-400">

                <li><Link to="/orders">Orders</Link></li>

                <li><Link to="/wishlist">Wishlist</Link></li>

                <li><Link to="/returns">Returns</Link></li>

                <li><Link to="/support">Support</Link></li>

              </ul>

            </div>

            {/* Seller */}

            <div>

              <h3 className="font-bold text-xl mb-5">

                Seller

              </h3>

              <ul className="space-y-3 text-gray-400">

                <li><Link to="/become-seller">Become Seller</Link></li>

                <li><Link to="/seller/login">Seller Login</Link></li>

                <li><Link to="/seller/dashboard">Dashboard</Link></li>

                <li><Link to="/seller/help">Help Center</Link></li>

              </ul>

            </div>

          </div>

          <hr className="border-white/20 my-12" />

          <div className="flex flex-col md:flex-row justify-between items-center">

            <p className="text-gray-400">

              © 2026 VRUKART. All Rights Reserved.

            </p>

            <div className="flex gap-8 mt-6 md:mt-0">

              <Link to="/privacy">Privacy Policy</Link>

              <Link to="/terms">Terms & Conditions</Link>

              <Link to="/cookies">Cookies</Link>

            </div>

          </div>

        </div>

      </footer>

    </div>

  );

}