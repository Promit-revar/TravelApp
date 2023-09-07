import { cn } from "@/lib/utils";
import "./globals.css";
import "../styles/main.scss";
import { Poppins, Prata, Noto_Serif } from "next/font/google";
import Provider from "@/context/Provider";
// import { Provider } from "react-redux";
// import store from "@/store/configureStore";
import Navbar from "@/components/Navbar";
import { Metadata } from "next";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const prata = Prata({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Quantum Travels: Your Journey Begins Here",
  description:
    "Quantum Travels opens the door to the world. Discover bespoke travel experiences tailored just for you. From family-friendly holiday packages to luxury trips of a lifetime, explore the infinite possibilities of travel with Quantum Travels.",
  keywords:
    "Quantum Travels, Affordable travel packages, Luxury travel experiences, Family holiday packages, Adventure tours, Bespoke travel itineraries, Global destinations, Exclusive travel deals, Sustainable tourism, Cultural immersion trips",
  viewport: {
    userScalable: false,
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(poppins.className, prata.variable)}  style={{backgroundColor:'#F1F5F8'}}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}