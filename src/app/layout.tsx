import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://westcoretrainingcentre.com"),
  title: {
    default: "Westcore Training Centre | Semi-Private Personal Training in BC",
    template: "%s | Westcore Training Centre",
  },
  description:
    "Personal training in private workout pods. 5 locations across BC: Victoria, Saanich, Sidney, Surrey, Courtenay. Claim your free intro session today.",
  openGraph: {
    title: "Westcore Training Centre | Personal Training Without the Crowd",
    description:
      "Semi-private personal training in private pods. 5 BC locations. Claim a free intro session.",
    type: "website",
    siteName: "Westcore Training Centre",
  },
  robots: { index: true, follow: true },
};

const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  name: "Westcore Training Centre",
  url: "https://westcoretrainingcentre.com",
  logo: "https://westcoretrainingcentre.com/logo.avif",
  description: "Semi-private personal training in private workout pods across BC.",
  areaServed: "BC, Canada",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_SCHEMA) }}
        />
      </head>
      <body>
        {/* META PIXEL — replace YOUR_PIXEL_ID before launch */}
        <Script id="meta-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          // fbq('init', 'YOUR_PIXEL_ID');
          // fbq('track', 'PageView');
        `}</Script>

        {/* GOOGLE ANALYTICS 4 — replace G-XXXXXXXXXX before launch */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          // gtag('config', 'G-XXXXXXXXXX');
        `}</Script>

        {children}
      </body>
    </html>
  );
}
