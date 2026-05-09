import type { Metadata } from "next";
import {Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Toaster } from "sonner";
import Footer from "@/components/Footer";
import ChatBtn from "@/components/ChatBtn";

export const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-poppin",
  weight: ["300","400", "500", "600","700","800"],
});

export const metadata: Metadata = {
  title: {
    default: "HomeSense | Luxury Furniture & Modern Interior Design Lahore",
    template: "%s | HomeSense Cavalry Ground",
  },
  description: "HomeSense offers premium furniture and bespoke interior design solutions in Cavalry Ground, Lahore. Discover modern sofa sets, dining tables, and home decor crafted for elegance.",
  keywords: ["HomeSense", "Furniture Store Lahore", "Cavalry Ground Interior Design", "Modern Home Decor Pakistan"],
    icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} ${roboto.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <main>
<Header />
<ChatBtn />
        {children}
        <Footer />
        </main>

        <Toaster /> 
        </body>
    </html>
  );
}
