import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import ModalProvider from "../providers/ModalProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Casual Pro",
  description: "Platform for finding casual jobs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>
        <AuthProvider>
          <ModalProvider />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
