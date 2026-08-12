import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/admin/dashboard")({
  component: AdminDashboardRedirect,
});

function AdminDashboardRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate({ to: "/admin", replace: true });
  }, [navigate]);

  return (
    <div className="flex items-center justify-center p-12 text-muted-foreground text-sm">
      Redirecting to Admin Dashboard...
    </div>
  );
}
