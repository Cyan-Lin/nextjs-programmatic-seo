import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Restaurant Finder", // 未指定title時的預設title
    template: "%s | Restaurant Finder", // %s 是 child page的title
  },
  description: "Find the best restaurants near you", // 會顯示在social media的description
  twitter: {
    card: "summary_large_image", // 指定推特的card顯示樣式
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.className} antialiased`}>{children}</body>
    </html>
  );
}
