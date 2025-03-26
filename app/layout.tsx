import { AppConfig } from "@/config/app.config";
import "./globals.css";
import type { Metadata } from "next";
import Footer from "@/components/shared/Footer/Footer";
import Navbar from "@/components/shared/Navbar/Navbar";

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
      <body  cz-shortcut-listen="true">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
