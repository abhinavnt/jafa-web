import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";

// Auto-copy attached images to the public folder on server render
if (typeof window === 'undefined') {
  try {
    const fs = require('fs');
    const path = require('path');
    const publicImagesDir = path.join(process.cwd(), 'public', 'images');
    if (!fs.existsSync(publicImagesDir)) {
      fs.mkdirSync(publicImagesDir, { recursive: true });
    }
    const heroSrc = 'C:\\Users\\abhin\\.gemini\\antigravity-ide\\brain\\b891b761-ec7e-44a0-8e71-d0dc81bd9edc\\media__1781420578654.jpg';
    const logoSrc = 'C:\\Users\\abhin\\.gemini\\antigravity-ide\\brain\\b891b761-ec7e-44a0-8e71-d0dc81bd9edc\\media__1781420615654.png';
    const heroDest = path.join(publicImagesDir, 'hero.jpg');
    const logoDest = path.join(publicImagesDir, 'logo.png');
    
    if (fs.existsSync(heroSrc)) fs.copyFileSync(heroSrc, heroDest);
    if (fs.existsSync(logoSrc)) fs.copyFileSync(logoSrc, logoDest);
  } catch (e) {
    console.error("Failed to auto-copy images:", e);
  }
}

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jafa | Treasured By Nature",
  description: "Premium dates, nuts & dry fruits",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lora.variable} antialiased h-full`}>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">{children}</body>
    </html>
  );
}
