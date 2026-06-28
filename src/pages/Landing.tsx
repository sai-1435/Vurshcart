import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  ShoppingCart,
  Heart,
  User,
  Menu,
  Bell,
  ArrowRight,
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
  "Books",
  "Sports",
  "Groceries",
  "Toys",
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-white text-black">

      {/* TOP BAR */}

      <div className="bg-black text-white text-center py-2 text-sm tracking-wide">
        FREE DELIVERY ON ORDERS ABOVE ₹499 • EASY RETURNS • 24×7 SUPPORT
      </div>

      {/* NAVBAR */}

      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">

        <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">

          {/* Logo */}

          <Link
            to="/"
            className="text-3xl font-black tracking-widest"
          >
            VRUKART
          </Link>

          {/* Search */}

          <div className="hidden lg:flex flex-1 mx-10">

            <div className="flex w-full border-2 border-black rounded-md overflow-hidden">

              <input
                type="text"
                placeholder="Search products, brands and more..."
                className="flex-1 px-5 py-3 outline-none"
              />

              <button className="bg-black text-white px-6 flex items-center justify-center hover:bg-neutral-800 transition">

                <Search size={20} />

              </button>

            </div>

          </div>

          {/* Right */}

          <div className="flex items-center gap-6">

            <button>
              <MapPin size={22} />
            </button>

            <button>
              <Heart size={22} />
            </button>

            <button>
              <Bell size={22} />
            </button>

            <button>
              <User size={22} />
            </button>

            <button className="relative">

              <ShoppingCart size={24} />

              <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                2
              </span>

            </button>

          </div>

        </div>

        {/* CATEGORY NAVIGATION */}

        <div className="border-t border-gray-200 bg-white">

          <div className="max-w-7xl mx-auto px-6 h-14 flex items-center gap-8 overflow-x-auto whitespace-nowrap">

            <button className="flex items-center gap-2 font-semibold">
              <Menu size={18} />
              All
            </button>

            {categories.map((item) => (
              <button
                key={item}
                className="text-sm font-medium hover:text-gray-500 transition"
              >
                {item}
              </button>
            ))}

          </div>

        </div>

      </header>

      {/* HERO SECTION STARTS BELOW */}
            <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-black text-white"
      >
        <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-14 items-center">

          {/* LEFT */}

          <div>

            <p className="uppercase tracking-[0.4em] text-gray-400 text-sm mb-5">
              Premium Marketplace
            </p>

            <h1 className="text-5xl lg:text-7xl font-black leading-tight">

              SHOP
              <br />
              SMARTER
              <br />
              WITH
              <br />
              VRUKART

            </h1>

            <p className="mt-8 text-lg text-gray-300 leading-8 max-w-xl">
              Discover premium products, unbeatable offers,
              intelligent shopping experiences, and AI-powered
              recommendations—all in one place.
            </p>

            <div className="flex gap-5 mt-10">

              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-200 rounded-none px-8"
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-black rounded-none px-8"
              >
                Explore Deals
              </Button>

            </div>

          </div>

          {/* RIGHT */}

          <div className="grid grid-cols-2 gap-5">

            {[
              {
                title: "Today's Deals",
                value: "70% OFF",
              },
              {
                title: "Products",
                value: "15,000+",
              },
              {
                title: "Happy Customers",
                value: "250K+",
              },
              {
                title: "Orders Today",
                value: "12,584",
              },
            ].map((card) => (

              <motion.div
                key={card.title}
                whileHover={{ y: -8 }}
                className="border border-white/20 bg-white/5 p-8 backdrop-blur-sm"
              >

                <p className="text-gray-400 text-sm uppercase">

                  {card.title}

                </p>

                <h2 className="text-4xl font-black mt-4">

                  {card.value}

                </h2>

              </motion.div>

            ))}

          </div>

        </div>
      </motion.section>

      {/* TODAY'S DEALS */}

      <section className="py-16 bg-white">

        <div className="max-w-7xl mx-auto px-6">

          <div className="flex justify-between items-center mb-10">

            <h2 className="text-4xl font-black">

              Today's Deals

            </h2>

            <Link
              to="/products"
              className="font-semibold hover:underline"
            >
              View All →
            </Link>

          </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

            {Array.from({ length: 8 }).map((_, index) => (

              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.25 }}
                className="border border-black bg-white group cursor-pointer"
              >

                {/* Product Image */}

                <div className="h-64 bg-gray-100 flex items-center justify-center overflow-hidden">

                  <img
                    src={`https://picsum.photos/400/400?random=${index + 1}`}
                    alt="product"
                    className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
                  />

                </div>

                {/* Product Details */}

                <div className="p-5">

                  <p className="text-xs tracking-[0.25em] uppercase text-gray-500">

                    Electronics

                  </p>

                  <h3 className="font-bold text-xl mt-2">

                    Premium Wireless Headphones

                  </h3>

                  <div className="flex items-center gap-3 mt-4">

                    <span className="text-2xl font-black">

                      ₹2,999

                    </span>

                    <span className="line-through text-gray-400">

                      ₹4,999

                    </span>

                  </div>

                  <div className="mt-2 text-sm">

                    ★★★★★ (248 Reviews)

                  </div>

                  <Button
                    className="w-full mt-6 rounded-none bg-black text-white hover:bg-neutral-800"
                  >
                    Add To Cart
                  </Button>

                </div>

              </motion.div>

            ))}

          </div>

        </div>

      </section>

      {/* ================================================= */}

      {/* OPERATIONS DASHBOARD */}

      <section className="bg-black text-white py-20">

        <div className="max-w-7xl mx-auto px-6">

          <div className="flex justify-between items-center mb-12">

            <div>

              <p className="uppercase tracking-[0.4em] text-gray-400 text-sm">

                Operations

              </p>

              <h2 className="text-5xl font-black mt-3">

                Live Business Dashboard

              </h2>

            </div>

            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black rounded-none"
            >
              View Reports
            </Button>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {[
              {
                title: "Orders Today",
                value: "12,584",
              },
              {
                title: "Revenue",
                value: "₹18.7L",
              },
              {
                title: "Inventory",
                value: "98,245",
              },
              {
                title: "Active Sellers",
                value: "1,248",
              },
              {
                title: "Customers",
                value: "54,822",
              },
              {
                title: "Products Sold",
                value: "8,542",
              },
              {
                title: "Pending Orders",
                value: "246",
              },
              {
                title: "Warehouse Status",
                value: "Healthy",
              },
            ].map((item) => (

              <motion.div
                key={item.title}
                whileHover={{ scale: 1.03 }}
                className="border border-white/20 p-8 bg-white/5"
              >

                <p className="uppercase text-gray-400 text-sm">

                  {item.title}

                </p>

                <h3 className="text-4xl font-black mt-4">

                  {item.value}

                </h3>

              </motion.div>

            ))}

          </div>

        </div>

      </section>
            {/* ================================================= */}
      {/* ANALYTICS DASHBOARD */}
      {/* ================================================= */}

      <section className="bg-white py-20">

        <div className="max-w-7xl mx-auto px-6">

          <div className="mb-12">

            <p className="uppercase tracking-[0.4em] text-gray-500 text-sm">
              Analytics
            </p>

            <h2 className="text-5xl font-black mt-3">
              AI Business Analytics
            </h2>

            <p className="text-gray-600 mt-5 max-w-2xl">
              Monitor sales performance, customer growth, inventory,
              demand forecasting and business intelligence in real time.
            </p>

          </div>

          {/* KPI CARDS */}

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-12">

            {[
              {
                title: "Monthly Revenue",
                value: "₹52.4L",
                change: "+18%",
              },
              {
                title: "Conversion Rate",
                value: "12.8%",
                change: "+2.1%",
              },
              {
                title: "Returning Customers",
                value: "68%",
                change: "+9%",
              },
              {
                title: "Growth Rate",
                value: "24%",
                change: "+4%",
              },
            ].map((item) => (

              <motion.div
                key={item.title}
                whileHover={{ y: -6 }}
                className="border-2 border-black p-6"
              >

                <p className="text-sm uppercase tracking-widest text-gray-500">
                  {item.title}
                </p>

                <h3 className="text-4xl font-black mt-4">
                  {item.value}
                </h3>

                <p className="mt-3 font-semibold">
                  {item.change} this month
                </p>

              </motion.div>

            ))}

          </div>

          {/* CHART PLACEHOLDERS */}

          <div className="grid lg:grid-cols-2 gap-8">

            <div className="border-2 border-black p-8">

              <h3 className="text-2xl font-black mb-6">
                Sales Analytics
              </h3>

              <div className="h-80 bg-gray-100 flex items-center justify-center">

                <p className="text-gray-500 text-lg">
                  Sales Chart (Recharts)
                </p>

              </div>

            </div>

            <div className="border-2 border-black p-8">

              <h3 className="text-2xl font-black mb-6">
                Revenue Analytics
              </h3>

              <div className="h-80 bg-gray-100 flex items-center justify-center">

                <p className="text-gray-500 text-lg">
                  Revenue Chart (Recharts)
                </p>

              </div>

            </div>

          </div>

          {/* AI INSIGHTS */}

          <div className="grid lg:grid-cols-3 gap-8 mt-14">

            {[
              "Electronics demand expected to increase by 18% next week.",
              "Fashion category shows the highest repeat purchases.",
              "Inventory levels are healthy across all warehouses.",
            ].map((insight, index) => (

              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="bg-black text-white p-8"
              >

                <h4 className="text-xl font-bold mb-4">
                  AI Insight #{index + 1}
                </h4>

                <p className="leading-7 text-gray-300">
                  {insight}
                </p>

              </motion.div>

            ))}

          </div>

        </div>

      </section>

      {/* ================================================= */}
      {/* WHY CHOOSE VRUKART */}
      {/* ================================================= */}

      <section className="bg-black text-white py-20">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-center text-5xl font-black mb-16">

            Why Choose Vrukart

          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {[
              {
                title: "Fast Delivery",
                desc: "Nationwide shipping with real-time tracking.",
              },
              {
                title: "Secure Payments",
                desc: "Safe and encrypted payment gateway.",
              },
              {
                title: "Easy Returns",
                desc: "7-day hassle-free return policy.",
              },
              {
                title: "24×7 Support",
                desc: "Dedicated customer assistance anytime.",
              },
            ].map((item) => (

              <div
                key={item.title}
                className="border border-white/20 p-8"
              >

                <h3 className="text-2xl font-bold mb-4">
                  {item.title}
                </h3>

                <p className="text-gray-400 leading-7">
                  {item.desc}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* ================================================= */}
      {/* NEWSLETTER */}
      {/* ================================================= */}

      <section className="py-20 bg-white">

        <div className="max-w-4xl mx-auto px-6 text-center">

          <h2 className="text-5xl font-black">

            Stay Updated

          </h2>

          <p className="text-gray-600 mt-6">

            Subscribe to receive exclusive offers,
            product launches and AI shopping recommendations.

          </p>

          <div className="flex flex-col md:flex-row gap-4 mt-10">

            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 border-2 border-black px-5 py-4 outline-none"
            />

            <Button
              className="rounded-none bg-black text-white hover:bg-neutral-800 px-10"
            >
              Subscribe
            </Button>

          </div>

        </div>

      </section>

      <Footer />

    </div>

  );

}