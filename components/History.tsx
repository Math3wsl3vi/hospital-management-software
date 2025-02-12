import Link from "next/link";
import React from "react";

const History = () => {
  return (
    <div className="grid grid-cols-4 mb-5">
      <Link
        href={"/"}
        className="border p-2 text-center active:bg-green-1 active:text-white cursor-pointer hover:text-white hover:bg-green-1 "
      >
        <h1>Medical Records</h1>
      </Link>
      <Link
        href={"/"}
        className="border p-2 text-center active:bg-green-1 active:text-white cursor-pointer hover:text-white hover:bg-green-1 "
      >
        <h1>Patient Profile</h1>
      </Link>
      <Link
        href={"/"}
        className="border p-2 text-center active:bg-green-1 active:text-white cursor-pointer hover:text-white hover:bg-green-1 "
      >
        <h1>Appointments</h1>
      </Link>
      <Link
        href={"/"}
        className="border p-2 text-center active:bg-green-1 active:text-white cursor-pointer hover:text-white hover:bg-green-1 "
      >
        <h1>Previous Medications</h1>
      </Link>
    </div>
  );
};

export default History;
