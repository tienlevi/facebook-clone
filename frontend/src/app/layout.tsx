import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import QueryContext from "@/context/QueryContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Facebook clone",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryContext>
          <ToastContainer />
          {children}
        </QueryContext>
      </body>
    </html>
  );
}
