import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EduSchool Staff Profiles",
  description: "Shared staff and administrator profile workspace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full font-sans antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
