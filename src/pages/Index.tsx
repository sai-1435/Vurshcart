import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import Landing from "./Landing";

const Index = () => {
  const { user, loading, isSeller } = useAuth();
  if (loading) return null;
  if (user && isSeller) return <Navigate to="/seller" replace />;
  return <Landing />;
};

export default Index;
