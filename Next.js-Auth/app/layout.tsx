import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "components/navbar";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "JWT NEXT.JS",
  description: "JWT Implementation using NEXT.JS",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionProvider>
        <body className={inter.className}>
          <Toaster position="bottom-center" />
          <Navbar />
          {children}
        </body>
      </SessionProvider>
    </html>
  );
}
