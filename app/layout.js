import { DM_Sans, Teko } from "next/font/google";
import Protection from "@/components/Protection";
import Navbar from "@/components/Navbar";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const teko = Teko({
  variable: "--font-teko",
  subsets: ["latin"],
});

export const metadata = {
  title: "NGON Studios",
  description: "NGON Studios is a creative agency specializing in 3D animation, motion graphics, and visual effects. We bring ideas to life with stunning visuals and innovative storytelling.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${teko.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col select-none">
        <Protection />
        <Navbar />
        {children}
      </body>
    </html>
  );
}

