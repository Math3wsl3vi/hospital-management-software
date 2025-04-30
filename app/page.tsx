"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    setUserRole(user?.role || null);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex flex-col">
      {/* Header */}
      <header className="bg-slate-50 w-full py-4 px-6 shadow-sm">
        <Link href="/" className="text-2xl font-bold tracking-widest text-black uppercase font-poppins">
          NovaMed
        </Link>
      </header>

      {/* Main Section */}
      <main className="flex-1 container mx-auto px-4 py-12 flex flex-col items-center">
        <section className="text-center max-w-3xl mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to NovaMed Systems</h1>
          <p className="text-lg text-gray-600">Please log in to access the hospital management system.</p>
        </section>

        {/* Login Card */}
        <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md border border-gray-100 mb-8">
          <div className="flex flex-col items-center text-center">
            <div className="bg-green-100 p-4 rounded-full mb-4">
              <Image src="/images/doctor.png" alt="Doctor Icon" width={40} height={40} />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Secure Login</h2>
            <p className="text-sm text-gray-500 mb-4">Use your registered credentials to access the system.</p>
            <Button onClick={() => router.push("/sign-in")} className="w-full bg-green-1">
              Continue to Login
            </Button>
          </div>
        </div>

        {/* Registration Card */}
        <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-md text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">New to NovaMed?</h3>
          <p className="text-gray-600 mb-6">Create a new account or contact the administration for assistance.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button onClick={() => router.push("/sign-up")} className="bg-green-1 px-8 py-4 text-lg">
              Register New Account
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/contact")}
              className="border-green-1 text-green-1 px-8 py-4 text-lg"
            >
              Contact Administration
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t mt-12">
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Powered by MantleAfya. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-green-600">Privacy Policy</a>
            <a href="#" className="hover:text-green-600">Terms of Service</a>
            <a href="#" className="hover:text-green-600">Help Center</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
