import type { Metadata } from "next";
import { Fraunces, Space_Grotesk, Caveat } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "700"],
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  title: "Studio Sketchbook — Portrait & Line Artist",
  description:
    "Graphite and charcoal portrait commissions, studies, and sketchbook work.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${spaceGrotesk.variable} ${caveat.variable} font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
