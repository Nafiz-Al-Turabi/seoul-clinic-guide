import { AppConfig } from "@/config/app.config";
import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "./provider";
import { Toaster } from "sonner";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Seoul Clinic Guide",
  description: "FIND THE BEST SPECIALIZED CLINICS IN KOREA FOR EXPERT CARE",
  icons: {
    icon: "/navlink.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body cz-shortcut-listen="true" no-processed="true">
        <Providers>
          <Suspense fallback={""}>
            {children}
          </Suspense>
        </Providers>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
