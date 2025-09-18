"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);
  console.log(userRole);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    setUserRole(user?.role || null);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-gray-100 flex flex-col overflow-hidden">
      {/* Header with Animated Logo */}
      <header className="bg-emerald-50 w-full py-6 px-6 shadow-lg flex transition-all duration-300 hover:shadow-xl">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo3.png"
            alt="Riviamed Logo"
            width={120}
            height={120}
            className="transition-transform duration-300 hover:scale-105"
          />
          <h1 className="md:text-4xl font-semibold">R I V I A M E D</h1>
        </Link>
      </header>

      {/* Main Section with Hero Animation */}
      <main className="flex-1 container mx-auto px-4 py-16 flex flex-col items-center relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Ccircle cx=\'50\' cy=\'50\' r=\'40\' fill=\'none\' stroke=\'%23d1fae5\' stroke-width=\'1\'/%3E%3C/svg%3E')] opacity-10 pointer-events-none" />
        <section className="text-center max-w-4xl mb-16 z-10">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6 animate-fade-in">
            Welcome to Riviamed Systems
          </h1>
          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            Revolutionize your healthcare experience with our advanced hospital management system. Log in to explore a world of seamless operations.
          </p>
        </section>

        {/* Login Card with Hover Effects */}
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-emerald-200 mb-12 transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
          <div className="flex flex-col items-center text-center">
            <div className="bg-emerald-100 p-5 rounded-full mb-6 animate-pulse">
              <Image src="/images/doctor.png" alt="Doctor Icon" width={50} height={50} />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Secure Login</h2>
            <p className="text-md text-gray-600 mb-6">Access the system with your registered credentials for a secure experience.</p>
            <Button
              onClick={() => router.push("/sign-in")}
              className="w-full bg-emerald-600 text-white hover:bg-emerald-700 py-6 text-lg font-medium transition-colors duration-300"
            >
              Continue to Login
            </Button>
          </div>
        </div>

        {/* Registration Card with Dual Buttons */}
        <div className="w-full max-w-2xl bg-white p-10 rounded-2xl shadow-lg text-center transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
          <h3 className="text-3xl font-bold text-gray-800 mb-6">New to Riviamed?</h3>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Join our community or reach out to our administration for personalized support.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Button
              onClick={() => router.push("/sign-up")}
              className="bg-emerald-600 text-white px-10 py-5 text-lg font-medium hover:bg-emerald-700 transition-colors duration-300"
            >
              Register New Account
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/contact")}
              className="border-emerald-600 text-emerald-600 px-10 py-5 text-lg font-medium hover:bg-emerald-50 transition-colors duration-300"
            >
              Contact Administration
            </Button>
          </div>
        </div>
      </main>

      {/* Footer with Enhanced Design */}
      <footer className="bg-emerald-50 border-t border-emerald-200 mt-12">
        <div className="container mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center text-base text-gray-700">
          <p className="mb-4 md:mb-0">© {new Date().getFullYear()} Powered by MantleAfya. All rights reserved.</p>
          <div className="flex space-x-8">
            <a href="#" className="hover:text-emerald-700 transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-emerald-700 transition-colors duration-300">Terms of Service</a>
            <a href="#" className="hover:text-emerald-700 transition-colors duration-300">Help Center</a>
          </div>
        </div>
      </footer>
    </div>
  );
}