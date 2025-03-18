import React from "react";

const TriageInput = ({
  selectedUser,
}: {
  selectedUser: {
    name: string;
    id: number;
    phone: string;
    sex: string;
    dob: string;
    email:string;
    bloodGroup:string;
  } | null;
}) => {
  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex gap-10 w-full">
        <div className="gap-2 flex flex-col w-1/2">
          <label htmlFor="service">Full Names</label>
          <div className="focus-visible:ring-0 focus-visible:ring-offset-0 border p-2 rounded-md">
            {selectedUser?.name || "N/A"}
          </div>
        </div>
        <div className="gap-2 flex flex-col w-1/2">
          <label htmlFor="service">National ID Number</label>
          <div className="focus-visible:ring-0 focus-visible:ring-offset-0 border p-2 rounded-md">
            {selectedUser?.id || "N/A"}
          </div>
        </div>
        <div className="gap-2 flex flex-col w-1/2">
          <label htmlFor="service">Blood Group</label>
          <div className="focus-visible:ring-0 focus-visible:ring-offset-0 border p-2 rounded-md">
            {selectedUser?.bloodGroup || "N/A"}
          </div>
        </div>
      </div>
      <div className="flex gap-10 w-full">
        <div className="gap-2 flex flex-col w-1/2">
          <label htmlFor="service">Phone Number</label>
          <div className="focus-visible:ring-0 focus-visible:ring-offset-0 border p-2 rounded-md">
            {selectedUser?.phone || "N/A"}
          </div>
        </div>
        <div className="gap-2 flex flex-col w-1/2">
          <label htmlFor="service">Sex</label>
          <div className="focus-visible:ring-0 focus-visible:ring-offset-0 border p-2 rounded-md">
            {selectedUser?.sex || "N/A"}
          </div>
        </div>
        <div className="gap-2 flex flex-col w-1/2">
          <label htmlFor="service">Email</label>
          <div className="focus-visible:ring-0 focus-visible:ring-offset-0 border p-2 rounded-md">
            {selectedUser?.email || "N/A"}
          </div>
        </div>
      </div>

    </div>
  );
};

export default TriageInput;
