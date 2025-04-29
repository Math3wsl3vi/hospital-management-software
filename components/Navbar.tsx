"use client"
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [user, setUser] = useState<{ role: string } | null>(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []); 
  return (
    <div className="w-full h-14 bg-slate-50 flex items-center ">
      <div className="w-[250px] h-full bg-[#21263c]">
        <div className="rounded-bl-xl bg-[#181c2e] w-[250px] h-full pl-4 pt-4">
          <Link href={'/'} className="text-xl font-poppins text-white uppercase">N o v a M e d</Link>
        </div>
      </div>
      <div className="flex-1 items-center flex justify-between px-5 gap-10">
        <div>
          <h1 className="text-xl capitalize">{user?.role || 'User'} Dashboard</h1>
        </div>
        <div className="flex gap-5 flex-row">
          <div className="items-center border p-2 rounded-md cursor-pointer">
            <h1>Hospital Name</h1>
          </div>
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
            className="border rounded-full p-2 bg-white border-gray-300">
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
  );
};

export default Navbar;
