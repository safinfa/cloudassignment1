import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Student Web App",
  description: "Next.js Assignment Project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow p-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
