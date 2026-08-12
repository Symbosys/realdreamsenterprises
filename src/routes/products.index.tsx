import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/products/")({
  component: ProductsRedirectPage,
});

function ProductsRedirectPage() {
  // Product pricing and specifications are handled by the Live Pricing Section
  return <Navigate to="/" replace />;
}
