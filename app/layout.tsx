import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster"
import { Poppins } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";

<<<<<<< HEAD

=======
>>>>>>> 9b4574d3e881d1e56c88d8cb6d7d82f2bfb09a99

const poppins = Poppins({
  weight: ['400', '600', '700'], // Choose desired weights
  subsets: ['latin'],           // Subsets for language support
});


<<<<<<< HEAD
=======


>>>>>>> 9b4574d3e881d1e56c88d8cb6d7d82f2bfb09a99
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
        className={`${poppins.className} antialiased`}
      >
        <UserProvider >
        {children}
        </UserProvider>
        <Toaster />
      </body>
    </html>
  );
}
