"use client";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X } from "lucide-react";

const SideBar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-3 left-4 z-50 bg-[#21263c] p-2 rounded-md text-white"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={cn(
          "bg-[#21263c] w-[250px] h-screen fixed lg:sticky left-0 top-0 text-white p-2 transition-all duration-300 z-40",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex gap-5 flex-col mt-10">
          {sidebarLinks.map((item) => {
            const isActive =
              pathname === item.route || pathname.startsWith(`${item.route}/`);

            if (item.label === "Hospital Visit") {
              return (
                <DropdownMenu key={item.route}>
                  <DropdownMenuTrigger asChild>
                    <div
                      className={cn(
                        "flex items-center gap-6 justify-start p-3 rounded-xl cursor-pointer",
                        { "bg-green-1 text-white": isActive }
                      )}
                    >
                      <Image
                        src={item.imgUrl}
                        alt="image"
                        width={20}
                        height={20}
                        style={{
                          filter:
                            "invert(1) sepia(1) saturate(10) hue-rotate(200deg)",
                        }}
                      />
                      <p className="font-poppins text-sm">{item.label}</p>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-[#21263c] text-white border-none w-[250px] font-poppins">
                    <DropdownMenuItem className="w-full cursor-pointer hover:bg-green-1 text-sm mb-2">
                      <Link href={'/hospital-visit'} onClick={() => setIsOpen(false)}>Reception</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="w-full cursor-pointer hover:bg-green-1 text-sm mb-2">
                      <Link href={'/triage'} onClick={() => setIsOpen(false)}>Triage</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="w-full cursor-pointer hover:bg-green-1 text-sm mb-2">
                      <Link href={'/consultation'} onClick={() => setIsOpen(false)}>Consultation</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="w-full cursor-pointer hover:bg-green-1 text-sm mb-2">
                      <Link href={'/lab'} onClick={() => setIsOpen(false)}>Lab</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="w-full cursor-pointer hover:bg-green-1 text-sm mb-2">
                      <Link href={'/'} onClick={() => setIsOpen(false)}>Pharmacy</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            }
            return (
              <Link
                href={item.route}
                key={item.route}
                className={cn(
                  "flex gap-6 items-center justify-start p-3 rounded-xl",
                  { "bg-green-1 text-white": isActive }
                )}
                onClick={() => setIsOpen(false)}
              >
                <Image
                  src={item.imgUrl}
                  alt="image"
                  width={20}
                  height={20}
                  style={{
                    filter: "invert(1) sepia(1) saturate(10) hue-rotate(200deg)",
                  }}
                />
                <p className="font-poppins text-sm">{item.label}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SideBar;