"use client";
import React, { useEffect, useState } from "react";

const HomeCalendar = () => {
  const [user, setUser] = useState<{ role: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const now = new Date();
  const time = now.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(
    now
  );

  return (
    <div className="w-full min-h-[220px] sm:min-h-[280px] md:min-h-[320px] rounded-2xl bg-hero bg-cover bg-center">
      <div className="flex h-full flex-col justify-between p-4 sm:p-6 md:p-8 lg:p-10 text-white">
        {/* Welcome Message */}
        <h2 className="glassmorphism w-fit max-w-[90%] sm:max-w-[320px] text-xs sm:text-sm md:text-base lg:text-lg rounded-md px-3 py-2 text-center font-medium capitalize">
          Welcome {user?.role || "User"}
        </h2>

        {/* Date + Time */}
        <div className="flex flex-col gap-1 sm:gap-3 md:gap-4 mt-6 sm:mt-10">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            {time}
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-sky-200">
            {date}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeCalendar;
