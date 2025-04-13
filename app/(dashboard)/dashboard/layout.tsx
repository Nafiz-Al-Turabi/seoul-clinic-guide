import React from "react";
import ClientLayout from "./ClientLayout";
import ProtectedRoutes from "@/components/private/ProtectedRoutes";

export default function DashboardLayout({ children }) {
  return (
    <ProtectedRoutes>
      <ClientLayout>{children}</ClientLayout>
    </ProtectedRoutes>
  );
}
