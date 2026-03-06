import type { Metadata } from "next";
import "./globals.scss";
import { AuthProvider } from "@/context/AuthContext";
import CookieBanner from "@/components/CookieBanner";

export const metadata: Metadata = {
  title: "X Clone",
  description: "An X Clone Tutorial",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
          <CookieBanner />
        </AuthProvider>

      </body>
    </html>
  );
}
