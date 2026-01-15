import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Syed Zahaab Hussain - Full Stack Developer",
  description: "Enhancing digital experiences that are smooth, scalable, and made to impress. Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies.",
  keywords: ["Full Stack Developer", "React", "Next.js", "Node.js", "Web Development", "TypeScript", "PostgreSQL", "MongoDB"],
  authors: [{ name: "Syed Zahaab Hussain" }],
  creator: "Syed Zahaab Hussain",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourportfolio.com",
    title: "Syed Zahaab Hussain - Full Stack Developer",
    description: "Full Stack Developer specializing in building scalable web applications",
    siteName: "Syed Zahaab Hussain Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Syed Zahaab Hussain - Full Stack Developer",
    description: "Full Stack Developer specializing in building scalable web applications",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
