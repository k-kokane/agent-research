import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RCB IPL 2025 Season Report",
  description: "Royal Challengers Bengaluru — IPL 2025 Champions. Full season stats, match results, batting & bowling analysis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col overflow-x-hidden">{children}</body>
    </html>
  );
}
