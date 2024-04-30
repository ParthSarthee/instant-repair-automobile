import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Navgaurd } from "@/components/Navgaurd";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Instant Repair Automobile",
  description: "Instant Repair Automobile",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"></script> */}

      <body className="bg-neutral-50 mt-20">
        <Navbar />
        <Toaster />
        {children}
        <Footer />
        <Navgaurd />
      </body>
    </html>
  );
}