import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css"; // Using shadcn/ui CSS
import StoreProvider from "../providers/StoreProvider";
import { Toaster } from "../components/ui/toaster";
import ToastNotification from "../components/ui/ToastNotification";
import Cart from "../components/cart/Cart";

// Configure fonts
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Elegance | Women's Fashion & Accessories",
  description: "Discover the latest trends in women's clothing and accessories",
  keywords: "women's fashion, dresses, accessories, clothing, online shopping",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col font-sans">
        <StoreProvider>
          <ToastNotification />
          <Toaster />
          <Cart />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
