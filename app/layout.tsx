import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://mission-control-snowy-beta.vercel.app"),
  title: "Flight Ops — Tobias Norman · AI Product",
  description:
    "From enterprise customer success to shipping four AI products end-to-end. A mission-control portfolio.",
  openGraph: {
    title: "Flight Ops — Tobias Norman · AI Product",
    description:
      "From enterprise customer success to shipping four AI products end-to-end. A mission-control portfolio.",
    url: "/",
    siteName: "Flight Ops — Mission Control",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flight Ops — Tobias Norman · AI Product",
    description:
      "From enterprise customer success to shipping four AI products end-to-end. A mission-control portfolio.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#05070D",
};

const FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Archivo+Black&family=Archivo:wght@400;600;700&family=Martian+Mono:wght@400;600&family=Instrument+Serif:ital@1&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;600&family=Bricolage+Grotesque:wght@700;800&display=swap";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link href={FONT_HREF} rel="stylesheet" />
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
