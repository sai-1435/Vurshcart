import { Navigate } from "react-router-dom";

export function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = localStorage.getItem("user");

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
}