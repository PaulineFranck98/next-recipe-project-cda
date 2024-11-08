import type { Metadata } from "next";
import "./globals.css";
import { Merriweather } from 'next/font/google'
import NavBar from "@/components/NavBar";
import { Providers } from './providers'

const merriweather = Merriweather({
  weight: ['300', '400', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      
      <body className={`${merriweather.className} antialiased bg-background dark:bg-dark-background`}>
        <Providers>
          <NavBar />
          <main className="min-h-screen px-6 md:px-20">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
