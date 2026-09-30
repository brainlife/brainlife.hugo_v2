import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://brainlife.io'),
  title: "Brainlife.io Open, Cloud-based Neuroimaging Analysis Platform",
  description: "A free and open-source cloud platform for secure, reproducible neuroimaging research and high-performance computing.",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    siteName: 'Brainlife.io',
    title: 'Brainlife.io',
    description: 'A free and open-source cloud computing platform for reproducible neuroscience.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Brainlife.io',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brainlife.io',
    description: 'A free and open-source cloud computing platform for reproducible neuroscience.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>{children}</body>
    </html>
  );
}
