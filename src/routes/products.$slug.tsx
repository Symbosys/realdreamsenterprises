import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/products/$slug")({
  component: ProductSlugRedirectPage,
});

function ProductSlugRedirectPage() {
  return <Navigate to="/" replace />;
}
