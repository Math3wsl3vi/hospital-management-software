"use client";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const SideBar = () => {
  const pathname = usePathname();
  return (
    <div className="bg-[#21263c] w-[250px] h-screen sticky left-0 top-0 text-white p-2">
      <div className="flex gap-5 flex-col mt-10">
        {sidebarLinks.map((item) => {
          const isActive =
            pathname === item.route || pathname.startsWith(`${item.route}/`);

          if (item.label === "Hospital Visit") {
            return (
              <DropdownMenu key={item.route}>
                <DropdownMenuTrigger asChild>
                  <div className={cn('flex items-center gap-6 justify-start p-3 rounded-xl cursor-pointer',{'bg-green-1 text-white':isActive})}>
                  <Image
                src={item.imgUrl}
                alt="image"
                width={20}
                height={20}
                style={{
                  filter: "invert(1) sepia(1) saturate(10) hue-rotate(200deg)",
                }}
              />
              <p className="font-poppins text-sm max-lg:hidden">{item.label}</p>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#21263c] text-white border-none w-[250px] font-poppins">
                <DropdownMenuItem className="w-full cursor-pointer hover:bg-green-1 text-sm mb-2">
                  </DropdownMenuItem>
                  <DropdownMenuItem className="w-full cursor-pointer hover:bg-green-1 text-sm mb-2">
                    <Link href={'/'}>Triage</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="w-full cursor-pointer hover:bg-green-1 text-sm mb-2">
                    <Link href={'/'}>Consultation</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="w-full cursor-pointer hover:bg-green-1 text-sm mb-2">
                    <Link href={'/'}>Lab</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="w-full cursor-pointer hover:bg-green-1 text-sm mb-2">
                    <Link href={'/'}>Pharmacy</Link>
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
              <p className="font-poppins text-sm max-lg:hidden">{item.label}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SideBar;
