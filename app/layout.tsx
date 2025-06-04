import type React from "react";
import "./globals.css";
import { Poppins } from "next/font/google";
import Header from "./components/Header";
import { ReduxProvider } from "@/redux/provider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  title: "E-com Shopping Cart",
  description:
    "A modern e-commerce shopping cart built with Next.js, Redux, TypeScript, Tailwind CSS, and ShadCN UI. Includes product listing, cart functionality, login/logout flow, and collapsible side menu.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.className}>
      <body>
        <ReduxProvider>
          <Header />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
