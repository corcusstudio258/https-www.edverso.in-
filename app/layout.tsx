// app/layout.tsx
import type { ReactNode } from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
});

export const metadata = {
  title: "KIVT Internship LMS - Digital Internship Platform",
  description: "Empowering students with mandatory internship certification. Register, learn, and get certified seamlessly.",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Toaster/>
          <Footer/>
        </div>
      </body>
    </html>
  );
}