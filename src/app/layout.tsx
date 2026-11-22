import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import Script from "next/script";
import { AnalyticsTracker } from "@/components/analytics/AnalyticsTracker";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { StickyMobileBar } from "@/components/layout/StickyMobileBar";
import { siteConfig } from "@/data/site";
import { organizationSchema, websiteSchema } from "@/lib/seo";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const gaId = process.env.NEXT_PUBLIC_GA_ID;
const gscVerification = process.env.NEXT_PUBLIC_GSC_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Home Tuition in Delhi NCR | Verified Home Tutors | RBM Tuition",
    template: "%s | RBM Tuition",
  },
  description: siteConfig.description,
  keywords: [
    "home tuition Delhi NCR",
    "home tutor Delhi",
    "home tuition Noida",
    "home tuition Gurgaon",
    "home tuition Ghaziabad",
    "home tuition Faridabad",
    "private tutor Delhi NCR",
    "online tuition India",
    "JEE tutor at home",
    "NEET home tuition",
  ],
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: siteConfig.name,
    title: "Home Tuition in Delhi NCR | Verified Home Tutors | RBM Tuition",
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Home Tuition in Delhi NCR | Verified Home Tutors | RBM Tuition",
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: gscVerification ? { google: gscVerification } : undefined,
  category: "education",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#061530",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const structuredData = [organizationSchema(), websiteSchema()];

  return (
    <html
      lang="en-IN"
      className={`${manrope.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
        >
          Skip to content
        </a>

        <Header />

        <main id="main-content" className="flex-1">
          {children}
        </main>

        <Footer />
        <div aria-hidden="true" className="h-[4.5rem] md:hidden" />
        <StickyMobileBar />
        <AnalyticsTracker />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
