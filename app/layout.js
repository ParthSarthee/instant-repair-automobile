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
      <head>
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css"
        />
      </head>
      <body className="mt-20 bg-neutral-100">
        {/* <div className="area h-screen w-full fixed top-0 -z-10">
          <ul class="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div> */}
        <Navbar />
        <Toaster />
        {children}
        <Footer />
        <Navgaurd />
      </body>
    </html>
  );
}