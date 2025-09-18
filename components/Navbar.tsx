"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const router = useRouter();
  const [user, setUser] = useState<{ role: string } | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogoClick = () => {
    const foundUser = JSON.parse(localStorage.getItem("user") || "null");
    if (!foundUser) {
      router.push("/sign-in");
      return;
    }

    switch (foundUser.role) {
      case "doctor":
        router.push("/UserAccounts/Doctor");
        break;
      case "nurse":
        router.push("/UserAccounts/Nurse");
        break;
      case "pharmacy":
        router.push("/UserAccounts/Pharmacy");
        break;
      case "lab":
        router.push("/UserAccounts/Lab");
        break;
      case "admin":
        router.push("/UserAccounts/Admin");
        break;
      case "reception":
        router.push("/UserAccounts/Reception");
        break;
      default:
        router.push("/");
        break;
    }
  };

  return (
    <div className="w-full h-16 bg-[#181c2e] md:bg-slate-50 flex items-center">
      {/* Logo section - always visible */}
      <div className="w-[250px] h-full bg-[#21263c] max-md:w-[200px]">
        <div className="rounded-bl-xl bg-[#181c2e] md:w-[250px] h-full pl-16 md:pl-4 pt-4 max-md:w-[200px]">
          <button 
            onClick={handleLogoClick}
            className="text-2xl font-poppins text-white uppercase max-md:text-lg hover:opacity-80 transition-opacity"
          >
            R I V I A M E D
          </button>
        </div>
      </div>

      {/* Mobile menu button */}
      <button
        className="md:hidden ml-auto mr-4 p-2 text-white bg-[#21263c] rounded-md"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Desktop navigation - hidden on mobile */}
      <div className="flex-1 items-center flex justify-between px-5 gap-10 max-md:hidden">
        <div className="">
          <h1 className="text-xl capitalize">{user?.role || 'User'} Dashboard</h1>
        </div>
        <div className="flex gap-5 flex-row">
          <div className="flex gap-5 flex-row items-center justify-center">
            <div className="flex items-center gap-5">
              <div className="cursor-pointer hover:bg-white hover:border hover:p-2 hover:rounded-full">
                <Image
                  src="/images/user.png"
                  alt="image"
                  width={17}
                  height={17}
                />
              </div>
              <div className="cursor-pointer hover:bg-white hover:border hover:p-2 hover:rounded-full">
                <Image
                  src="/images/bell.png"
                  alt="image"
                  width={17}
                  height={17}
                />
              </div>

              <Link href={'/settings-page'} className="cursor-pointer hover:bg-white hover:border hover:p-2 hover:rounded-full">
                <Image
                  src="/images/settings.png"
                  alt="image"
                  width={17}
                  height={17}
                />
              </Link>

              <Link
                href={'/sign-in'}
                className="border rounded-full p-2 bg-white border-gray-300"
              >
                <Image
                  src="/images/user.png"
                  alt="image"
                  width={25}
                  height={25}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile navigation - appears when menu button is clicked */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-slate-50 shadow-lg z-50 p-4">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-lg capitalize">
                {user?.role || 'User'} Dashboard
              </h1>
            </div>
            <div className="border p-2 rounded-md cursor-pointer">
              <h1>Hospital Name</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link href={'/settings-page'} className="cursor-pointer hover:bg-white hover:border hover:p-2 hover:rounded-full">
                <Image
                  src="/images/settings.png"
                  alt="Settings"
                  width={20}
                  height={20}
                />
              </Link>
              <Link
                href={'/sign-in'}
                className="border rounded-full p-2 bg-white border-gray-300"
              >
                <Image
                  src="/images/user.png"
                  alt="User"
                  width={25}
                  height={25}
                />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;