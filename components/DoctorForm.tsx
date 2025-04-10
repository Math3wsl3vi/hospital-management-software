"use client"

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/configs/firebase.config";
import { useRouter } from "next/navigation";

const initialFormData = {
  // Personal
  firstName: "",
  middleName: "",
  lastName: "",
  dateOfBirth: "",
  email: "",
  nationalId: "",
  phoneNumber:'',
  gender:'',

  // Professional
  medicalLicense: "",
  specialization: "",
  yearsOfExperience: "",
  qualifications: "",
  medicalSchool: "",

  // Work
  department: "",
  officeNumber: "",
};

export default function DoctorForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const docRef = await addDoc(collection(db, "doctors"), formData);
      toast({ title: "Success", description: "Doctor Added Successfully" });
      setFormData(initialFormData);
      console.log(docRef)
      router.back()
    } catch (err) {
      console.error("Error adding document:", err);
      setError("Failed to save doctor details. Please try again.");
      toast({ title: "Error", description: "Failed to save doctor details." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto p-4">
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <h1 className="text-green-1 font-semibold">Personal Details</h1>
          <div className="grid grid-cols-2 gap-4 mb-3">
            <Input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required />
            <Input name="middleName" value={formData.middleName} onChange={handleChange} placeholder="Middle Name" />
            <Input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required />
            <Input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
            <Input name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" required />
            <Input name="nationalId" value={formData.nationalId} onChange={handleChange} placeholder="National ID" required />
            <Input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number" required />
            <select name="gender" value={formData.gender} onChange={handleChange} className="p-2 border rounded" required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          </div>

          <h1 className="text-green-1 font-semibold">Professional Information</h1>
          <div className="grid grid-cols-2 gap-4 mb-3">
            <Input name="medicalLicense" value={formData.medicalLicense} onChange={handleChange} placeholder="Medical License" required />
            <Input name="specialization" value={formData.specialization} onChange={handleChange} placeholder="Specialization" required />
            <Input name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleChange} placeholder="Years of Experience" required />
            <Input name="qualifications" value={formData.qualifications} onChange={handleChange} placeholder="Qualifications" required />
            <Input name="medicalSchool" value={formData.medicalSchool} onChange={handleChange} placeholder="Medical School" required />
          </div>

          <h1 className="text-green-1 font-semibold">Work Information</h1>
          <div className="grid grid-cols-2 gap-4 mb-3">
            <Input name="department" value={formData.department} onChange={handleChange} placeholder="Department" required />
            <Input name="officeNumber" value={formData.officeNumber} onChange={handleChange} placeholder="Office Number" required />
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Submit"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
