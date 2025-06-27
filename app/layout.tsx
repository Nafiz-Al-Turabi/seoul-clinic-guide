import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "./provider";
import { Toaster } from "sonner";
import { Suspense } from "react";
import Head from "next/head";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Seoul Clinic Guide",
  description: "FIND THE BEST SPECIALIZED CLINICS IN KOREA FOR EXPERT CARE",
  icons: {
    icon: [
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", rel: "shortcut icon" }, // or sizes: 'any'
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "-mGs0PoEfV2HCfL_7TjU8K0ZINkDdZTzG7qqwDRXe5c",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <meta
          name="google-site-verification"
          content="-mGs0PoEfV2HCfL_7TjU8K0ZINkDdZTzG7qqwDRXe5c"
        />

        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-YWKVCZY0LG`}
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YWKVCZY0LG');
          `}
        </Script>
      </Head>
  {/* <head>
    <meta name="google-site-verification" content="-mGs0PoEfV2HCfL_7TjU8K0ZINkDdZTzG7qqwDRXe5c" />
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-YWKVCZY0LG"></script>
    <script dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-YWKVCZY0LG');
            `
    }} />
  </head> */}

      <body cz-shortcut-listen="true" no-processed="true">
        <Providers>
          <Suspense fallback={""}>{children}</Suspense>
        </Providers>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
