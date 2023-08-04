// These styles apply to every route in the application
import "@/styles/globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import AuthStatus from "@/components/auth-status";
import { Suspense } from "react";
import AuthSession from "@/components/AuthSession";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const title = "Trello Like App";
const description = "Trello Like DnD App by ChangSungBum";

export const metadata = {
  title,
  description,
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  themeColor: "#FFF",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <AuthSession>
          <Toaster />
          <Suspense fallback="Loading...">
            <AuthStatus />
          </Suspense>
          {children}
        </AuthSession>
      </body>
    </html>
  );
}
