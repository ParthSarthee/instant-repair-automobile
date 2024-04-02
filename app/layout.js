import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Instant Repair Automobile",
  description: "Instant Repair Automobile",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-neutral-50">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
