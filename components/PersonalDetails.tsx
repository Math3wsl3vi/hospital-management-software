"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import Image from "next/image";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import Loader from "./Loader";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "./ui/textarea";


const genderEnum = z.enum(["Male", "Female"]);
const maritalStatusEnum = z.enum(["Single", "Married", "Divorced", "Widowed"]);
const bloodGroupEnum = z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]);
const paymentEnum = z.enum(["Cash", "Insurance", "Mobile Money", "Bank Transfer"]);

const personalDetailsSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
  gender: genderEnum,
  maritalStatus: maritalStatusEnum,
  nationalId: z.string().min(1, "National ID is required").max(20),
  phoneNumber: z.string().min(1, "Phone number is required").max(15),
  email: z.string().email().max(100).optional(),
  residentialAddress: z.string().optional(),
  bloodGroup: bloodGroupEnum,
  allergies: z.string().optional(),
  chronicConditions: z.string().optional(),
  currentMedications: z.string().optional(),
  pastMedicalHistory: z.string().optional(),
  familyMedicalHistory: z.string().optional(),
  insuranceProvider: z.string().max(100).optional(),
  insurancePolicyNumber: z.string().max(50).optional(),
  nhifNumber: z.string().max(20).optional(),
  paymentPreference: paymentEnum,
  nextOfKin: z.string().min(1, "Next of kin is required"),
  nextOfKinRelatonship: z.string().min(1, "Next of kin relationship is required"),
  nextOfKinContact: z.string().min(1, "Next of kin contact is required"),
  emergencyName: z.string().min(1, "Emergency contact name is required"),
  emergencyRelatonship: z.string().min(1, "Emergency contact relationship is required"),
  emergencyContact: z.string().min(1, "Emergency contact number is required"),
  registrationDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
});

const PersonalDetails = () => {
  // State for form data
  const [formData, setFormData] = useState({
    firstName: "", 
    middleName: "", 
    lastName: "", 
    dateOfBirth: "", 
    gender: "", 
    maritalStatus: "", 
    nationalId: "", 
    phoneNumber: "", 
    email: "", 
    residentialAddress: "", 
    bloodGroup: "", 
    allergies: "", 
    chronicConditions: "", 
    currentMedications: "", 
    pastMedicalHistory: "", 
    familyMedicalHistory: "", 
    insuranceProvider: "", 
    insurancePolicyNumber: "", 
    nhifNumber: "", 
    paymentPreference: "", 
    nextOfKin: "",
    nextOfKinRelatonship: "",
    nextOfKinContact: "",
    emergencyName: "",
    emergencyRelatonship: "",
    emergencyContact: "",
    registrationDate: new Date().toISOString().split("T")[0],
  });

  const [date, setDate] = useState<Date>();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});// Required, must match paymentEnum values
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    console.log(formData)
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle date selection
  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setFormData((prevData) => ({
      ...prevData,
      dateOfBirth: selectedDate ? selectedDate.toISOString().split("T")[0] : "",
    }));
  };

  // Submit form data
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setErrors({});

    // validation with zod
    const result = personalDetailsSchema.safeParse(formData);
    if (!result.success) {
      const formattedErrors: { [key: string]: string } = {};
      result.error.issues.forEach((issue) => {
        formattedErrors[issue.path[0]] = issue.message;
      });
      setErrors(formattedErrors);
      setLoading(false);
      return;
    }

    try {
      console.log("Submitting form data:", JSON.stringify(formData, null, 2));

      const response = await fetch("/api/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("API response:", response.status, result);

      if (response.ok) {
        toast({
          description: "Patient data saved successfully.",
        });
        console.log("Patient data saved successfully:", result);
      } else {
        toast({
          description: "Failed to save patient data man.",
        });
        throw new Error(result?.message || "Failed to save patient data.");
      }
    } catch (error) {
      toast({
        description: "Error submitting form.",
      });
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <form onSubmit={onSubmit} className="flex flex-col gap-6">
        {/* Personal Details Section */}
        <h1 className="text-xl">Personal Details</h1>
        <div className="flex flex-row gap-5 items-start">
          <div className="w-1/3">
            <div className="flex w-full items-center">
              <label className="w-1/3">First Name</label>
              <div className="flex flex-col w-2/3 gap-1">
                <Input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="mt-2"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">{errors.firstName}</p>
                )}
              </div>
            </div>
            <div className="flex w-full items-center">
              <label className="w-1/3">Middle Name</label>
              <Input
                name="middleName"
                value={formData.middleName}
                onChange={handleInputChange}
                className="mt-2 w-2/3"
              />
            </div>
            <div className="flex w-full items-center">
              <label className="w-1/3">Last Name</label>
              <div className="flex flex-col w-2/3 gap-1">
                <Input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="mt-2"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">{errors.lastName}</p>
                )}
              </div>
            </div>
            <div className="flex w-full items-center">
              <label className="w-1/3">Gender</label>
              <div className="flex flex-col gap-1 w-2/3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Input
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="mt-2 text-left"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="border-none w-[370px] font-poppins ">
                  {["Male", "Female"].map(
                    (gender) => (
                      <DropdownMenuItem
                        key={gender}
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            gender: gender,
                          }))
                        }
                      >
                        {gender}
                      </DropdownMenuItem>
                    )
                  )}
                  </DropdownMenuContent>
                </DropdownMenu>
                {errors.gender && (
                  <p className="text-red-500 text-sm">{errors.gender}</p>
                )}
              </div>
            </div>
          </div>
          <div className="w-1/3">
            <div className="flex w-full items-center">
              <label className="w-1/3">National Id Number</label>
              <div className="flex flex-col w-2/3 gap-1">
                <Input
                  name="nationalId"
                  value={formData.nationalId}
                  onChange={handleInputChange}
                  className="mt-2"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">{errors.lastName}</p>
                )}
              </div>
            </div>
            <div className="flex w-full items-center">
              <label className="w-1/3">Marital Status</label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Input
                    name="maritalStatus"
                    onChange={handleInputChange}
                    value={formData.maritalStatus}
                    className="mt-2 w-2/3 text-left"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="border-none w-[370px] font-poppins ">
                  {["Married", "Single", "Divorced", "Widowed"].map(
                    (status) => (
                      <DropdownMenuItem
                        key={status}
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            maritalStatus: status,
                          }))
                        }
                      >
                        {status}
                      </DropdownMenuItem>
                    )
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex w-full items-center">
              <label className="w-1/3">Date of Birth</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-2/3 justify-start text-left mt-2 font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateSelect}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="w-1/3 flex items-center justify-center gap-5">
            <h1>Upload Image</h1>
            <div className="border p-10 w-44 h-44 cursor-pointer flex items-center justify-center rounded-md">
              <Image src="/images/user.png" alt="user" width={50} height={50} />
            </div>
          </div>
        </div>
        <hr className="mt-7" />

        {/* Home Address Section */}
        <h1 className="text-xl">Contact Information</h1>
        <div className="flex flex-row gap-5 items-start">
          <div className="w-1/3">
            <div className="flex w-full items-center">
              <label className="w-1/3">Email</label>
              <div className="flex flex-col w-2/3">
                <Input
                  name="email"
                  onChange={handleInputChange}
                  value={formData.email}
                  className="mt-2"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>
            </div>
            <div className="flex w-full items-center">
              <label className="w-1/3">Emergency Contact</label>
              <Input
                name="emergencyName"
                onChange={handleInputChange}
                value={formData.emergencyName}
                className="mt-2 w-2/3"
              />
            </div>
          </div>
          <div className="w-1/3">
            <div className="flex w-full items-center">
              <label className="w-1/3">Phone Number</label>
              <Input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="mt-2 w-2/3"
              />
            </div>
            <div className="flex w-full items-center">
              <label className="w-1/3">Emergency Contact Relation</label>
              <Input
                name="emergencyRelatonship"
                value={formData.emergencyRelatonship}
                onChange={handleInputChange}
                className="mt-2 w-2/3"
              />
            </div>
          </div>
          <div className="w-1/3">
            <div className="flex w-full items-center">
              <label className="w-1/3">Home Address</label>
              <Input
                name="residentialAddress"
                value={formData.residentialAddress}
                onChange={handleInputChange}
                className="mt-2 w-2/3"
              />
            </div>
            <div className="flex w-full items-center">
              <label className="w-1/3">Emergency Contact Phone</label>
              <Input
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleInputChange}
                className="mt-2 w-2/3"
              />
            </div>
          </div>
        </div>
        <hr className="mt-7" />

        {/* Emergency Contact Section */}
        <h1 className="text-xl">Medical Information</h1>
        <div className="flex flex-row gap-5 items-start">
          <div className="w-1/3">
            <div className="flex w-full items-center">
              <label className="w-1/3">Blood Type</label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Input
                    name="bloodGroup"
                    onChange={handleInputChange}
                    value={formData.bloodGroup}
                    className="mt-2 w-2/3 text-left"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="border-none w-[370px] font-poppins ">
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                    (blood) => (
                      <DropdownMenuItem
                        key={blood}
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            bloodGroup: blood,
                          }))
                        }
                      >
                        {blood}
                      </DropdownMenuItem>
                    )
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex w-full items-center">
              <label className="w-1/3">Allergies</label>
              <Textarea
                name="allergies"
                value={formData.allergies}
                onChange={handleInputChange}
                placeholder="e.g. medication, food, environment"
                className="mt-2 w-2/3 min-h-20"
              />
            </div>
          </div>
          <div className="w-1/3">
            <div className="flex w-full items-center">
              <label className="w-1/3">Chronic Conditions</label>
              <div className="flex flex-col w-2/3 gap-1">
                <Textarea
                  name="chronicConditions"
                  value={formData.chronicConditions}
                  onChange={handleInputChange}
                  placeholder="e.g. diabetes, hypertension"
                  className="mt-2 min-h-20"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone}</p>
                )}
              </div>
            </div>
            <div className="flex w-full items-center">
              <label className="w-1/3">Past Medical History</label>
              <Textarea
                name="pastMedicalHistory"
                onChange={handleInputChange}
                value={formData.pastMedicalHistory}
                placeholder="surgeries, previous hospitalizations"
                className="mt-2 w-2/3 min-h-20"
              />
            </div>
          </div>
          <div className="w-1/3">
            <div className="flex w-full items-center">
              <label className="w-1/3">Family Medical History</label>
              <div className="flex flex-col gap-1 w-2/3">
                <Textarea
                  placeholder="e.g. hereditary diseases"
                  value={formData.familyMedicalHistory}
                  onChange={handleInputChange}
                  name="familyMedicalHistory"
                  className="mt-2 min-h-20"
                />
                {errors.emergencyEmail && (
                  <p className="text-red-500 text-sm">
                    {errors.emergencyEmail}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <hr className="mt-7" />

        {/* Insurance Section */}
        <h1 className="text-xl">Insurance Provider</h1>
        <div className="flex flex-row gap-5 items-start">
          <div className="w-1/3">
            <div className="flex w-full items-center">
              <label className="w-1/3">Insurance Provider</label>
              <Input
                name="insuranceProvider"
                value={formData.insuranceProvider}
                onChange={handleInputChange}
                className="mt-2 w-2/3"
              />
            </div>
            <div className="flex w-full items-center">
              <label className="w-1/3">Payment Preference </label>
              <Input
                name="paymentPreference"
                placeholder="Cash, Insurance, Mobile Money, etc."
                onChange={handleInputChange}
                className="mt-2 w-2/3"
                value={formData.paymentPreference}
              />
            </div>
          </div>
          <div className="w-1/3">
            <div className="flex w-full items-center">
              <label className="w-1/3">Insurance Provider Number</label>
              <Input
                name="insurancePolicyNumber"
                value={formData.insurancePolicyNumber}
                onChange={handleInputChange}
                className="mt-2 w-2/3"
              />
            </div>
          </div>
          <div className="w-1/3">
            <div className="flex w-full items-center">
              <label className="w-1/3">NHIF Number</label>
              <Input
                name="insuranceNumber"
                value={formData.nhifNumber}
                onChange={handleInputChange}
                className="mt-2 w-2/3"
              />
            </div>
          </div>
        </div>
        <hr className="mt-7"/>
        {/* Next of kin Section */}
        <h1 className="text-xl">Next of Kin</h1>
        <div className="flex flex-row gap-5 items-start">
          <div className="w-1/3">
            <div className="flex w-full items-center">
              <label className="w-1/3">Full Name</label>
              <Input
                name="nextOfKin"
                value={formData.nextOfKin}
                onChange={handleInputChange}
                className="mt-2 w-2/3"
              />
            </div>
          </div>
          <div className="w-1/3">
            <div className="flex w-full items-center">
              <label className="w-1/3">Relationship to Patient</label>
              <Input
                name="nextOfKinRelatonship"
                value={formData.nextOfKinRelatonship}
                onChange={handleInputChange}
                className="mt-2 w-2/3"
              />
            </div>
          </div>
          <div className="w-1/3">
            <div className="flex w-full items-center">
              <label className="w-1/3">Contact Information</label>
              <Input
                name="nextOfKinContact"
                value={formData.nextOfKinContact}
                onChange={handleInputChange}
                className="mt-2 w-2/3"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button type="submit" className="w-[200px] bg-green-1">
            {(loading && <Loader />) || "Save Patient"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetails;
