import type { Metadata } from "next";
import { Montserrat, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Preloader } from "@/components/ui/Preloader";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pulau Penyengat - Enterprise Tourism Platform",
  description: "The official digital ecosystem of Pulau Penyengat. Discover History, Culture, Architecture, Local Community, and Authentic Experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${inter.variable} ${jetbrains.variable} antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground font-sans">
        <Preloader />
        {children}
      </body>
    </html>
  );
}
