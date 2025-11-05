import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shorts Architect",
  description: "Generate viral-ready YouTube Shorts scripts, hooks, and editing directives in seconds.",
  openGraph: {
    title: "Shorts Architect — AI Blueprint for YouTube Shorts",
    description:
      "Craft hooks, voiceover beats, editing cues, and captions with an AI-driven generator tuned for Shorts retention.",
    url: "https://agentic-43955662.vercel.app",
    siteName: "Shorts Architect",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shorts Architect — AI Blueprint for YouTube Shorts",
    description:
      "Go from raw idea to shot list, voiceover script, and AI asset prompts for Shorts-ready content.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
