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
    email: string;
    bloodGroup: string;
  } | null;
}) => {
  const fields = [
    { label: "Full Names", value: selectedUser?.name, isCapitalize: true },
    { label: "National ID Number", value: selectedUser?.id },
    { label: "Blood Group", value: selectedUser?.bloodGroup },
    { label: "Phone Number", value: selectedUser?.phone },
    { label: "Sex", value: selectedUser?.sex, isCapitalize: true },
    { label: "Email", value: selectedUser?.email },
  ];

  return (
    <div className="flex flex-wrap gap-6 w-full">
      {fields.map((field, index) => (
        <div
          key={index}
          className="flex flex-col gap-2 w-full sm:w-[48%] md:w-[30%] min-w-[200px]"
        >
          <label htmlFor={field.label} className="text-sm font-medium">
            {field.label}
          </label>
          <div
            className={`border p-2 rounded-md text-gray-800 bg-white shadow-sm ${
              field.isCapitalize ? "capitalize" : ""
            }`}
          >
            {field.value ?? "N/A"}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TriageInput;
