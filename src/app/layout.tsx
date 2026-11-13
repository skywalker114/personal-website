import type { Metadata, Viewport } from "next";
import { profile } from "@/content/site";
import "./globals.css";

export const metadata: Metadata = {
  title: `${profile.fullName} — A personal space`,
  description: profile.introduction,
  openGraph: {
    title: `${profile.fullName} — A life in three dimensions.`,
    description: profile.introduction,
    type: "website",
  },
  robots: { index: false, follow: false }, // Enable once real content and domain are ready.
};

export const viewport: Viewport = { themeColor: "#111513" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
