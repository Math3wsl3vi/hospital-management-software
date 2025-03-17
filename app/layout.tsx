import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster"
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ['400', '600', '700'], // Choose desired weights
  subsets: ['latin'],           // Subsets for language support
});


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MediSync",
  description: "Hospital Management System and Smart Health Reminder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.className} antialiased`}
      >
        <UserProvider >
        {children}
        </UserProvider>
        <Toaster />
      </body>
    </html>
  );
}
