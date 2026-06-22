import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Shop from "./pages/Shop";
import Category from "./pages/Category";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import OrderDetail from "./pages/OrderDetail";
import Wishlist from "./pages/Wishlist";
import Account from "./pages/Account";
import BecomeSeller from "./pages/BecomeSeller";
import SellerDashboard from "./pages/seller/Dashboard";
import SellerProducts from "./pages/seller/Products";
import SellerProductForm from "./pages/seller/ProductForm";
import SellerOrders from "./pages/seller/Orders";
import SellerAnalytics from "./pages/seller/Analytics";
import SellerStore from "./pages/seller/Store";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/help" element={<Account />} />
            <Route path="/category/:slug" element={<Category />} />
            <Route path="/product/:slug" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
            <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
            <Route path="/orders/:id" element={<ProtectedRoute><OrderDetail /></ProtectedRoute>} />
            <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
            <Route path="/become-seller" element={<ProtectedRoute><BecomeSeller /></ProtectedRoute>} />
            <Route path="/seller" element={<ProtectedRoute sellerOnly><SellerDashboard /></ProtectedRoute>} />
            <Route path="/seller/products" element={<ProtectedRoute sellerOnly><SellerProducts /></ProtectedRoute>} />
            <Route path="/seller/products/new" element={<ProtectedRoute sellerOnly><SellerProductForm /></ProtectedRoute>} />
            <Route path="/seller/products/:id" element={<ProtectedRoute sellerOnly><SellerProductForm /></ProtectedRoute>} />
            <Route path="/seller/orders" element={<ProtectedRoute sellerOnly><SellerOrders /></ProtectedRoute>} />
            <Route path="/seller/analytics" element={<ProtectedRoute sellerOnly><SellerAnalytics /></ProtectedRoute>} />
            <Route path="/seller/store" element={<ProtectedRoute sellerOnly><SellerStore /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
