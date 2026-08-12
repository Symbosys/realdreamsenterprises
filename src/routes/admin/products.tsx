import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/products")({
  component: AdminProductsRedirectPage,
});

function AdminProductsRedirectPage() {
  // Product catalog and steel brand rate cards are managed in Live Pricing
  return <Navigate to="/admin/pricing" replace />;
}
