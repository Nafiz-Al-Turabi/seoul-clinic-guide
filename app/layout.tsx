import { AppConfig } from "@/config/app.config";
import "./globals.css";
import type { Metadata } from "next";
import Footer from "@/components/shared/Footer/Footer";

export const metadata: Metadata = {
  title: AppConfig().app.name,
  description: AppConfig().app.slogan,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
