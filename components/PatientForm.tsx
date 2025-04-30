"use client"
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/configs/firebase.config";
import { useRouter } from "next/navigation";

// Define the initial state for the form
const initialFormData = {
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
  nextOfKinRelationship: "",
  nextOfKinContact: "",
  emergencyName: "",
  emergencyRelationship: "",
  emergencyContact: "",
  registrationDate: new Date().toISOString().split("T")[0], // Default to today
};

export default function PatientForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false); // ✅ Loading state
  const [error, setError] = useState<string | null>(null); // ✅ Error state
  const router = useRouter()

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const docRef = await addDoc(collection(db, "patients"), formData);
      toast({ title: "Success", description: "Patient Added Successfully" });
      console.log(docRef)
      setFormData(initialFormData); // Reset form
      router.push('/hospital-visit')
    } catch (err) {
      console.error("Error adding document:", err);
      setError("Failed to save patient details. Please try again.");
      toast({ title: "Error", description: "Failed to save patient details." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto p-4 mt-5">
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required/>
            <Input name="middleName" value={formData.middleName} onChange={handleChange} placeholder="Middle Name" required/>
            <Input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name"required />
            <Input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} placeholder="Date of Birth"required />
          </div>

          <select name="gender" value={formData.gender} onChange={handleChange} className="p-2 border rounded" required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} className="p-2 border rounded" required>
            <option value="">Marital Status</option>
            <option value="male">Single</option>
            <option value="female">Married</option>
            <option value="other">Divorced</option>
          </select>
          <Input name="nationalId" value={formData.nationalId} onChange={handleChange} placeholder="National ID" />
          <Input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number" />
          <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
          <Input name="residentialAddress" value={formData.residentialAddress} onChange={handleChange} placeholder="Residential Address" />
          
          <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="p-2 border rounded">           
            <option value="">Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>

          <Textarea name="allergies" value={formData.allergies} onChange={handleChange} placeholder="Allergies" />
          <Textarea name="chronicConditions" value={formData.chronicConditions} onChange={handleChange} placeholder="Chronic Conditions" />
          <Textarea name="currentMedications" value={formData.currentMedications} onChange={handleChange} placeholder="Current Medications" />
          <Textarea name="pastMedicalHistory" value={formData.pastMedicalHistory} onChange={handleChange} placeholder="Past Medical History" />
          <Textarea name="familyMedicalHistory" value={formData.familyMedicalHistory} onChange={handleChange} placeholder="Family Medical History" />

          <Input name="insuranceProvider" value={formData.insuranceProvider} onChange={handleChange} placeholder="Insurance Provider" required/>
          <Input name="insurancePolicyNumber" value={formData.insurancePolicyNumber} onChange={handleChange} placeholder="Insurance Policy Number" required/>
          <Input name="nhifNumber" value={formData.nhifNumber} onChange={handleChange} placeholder="NHIF Number" />
          <Input name="paymentPreference" value={formData.paymentPreference} onChange={handleChange} placeholder="Payment Preference" />

          <Label>Next of Kin</Label>
          <Input name="nextOfKin" value={formData.nextOfKin} onChange={handleChange} placeholder="Full Name" />
          <Input name="nextOfKinRelationship" value={formData.nextOfKinRelationship} onChange={handleChange} placeholder="Relationship" />
          <Input type="tel" name="nextOfKinContact" value={formData.nextOfKinContact} onChange={handleChange} placeholder="Contact" />

          <Label>Emergency Contact</Label>
          <Input name="emergencyName" value={formData.emergencyName} onChange={handleChange} placeholder="Full Name" />
          <Input name="emergencyRelationship" value={formData.emergencyRelationship} onChange={handleChange} placeholder="Relationship" />
          <Input type="tel" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} placeholder="Contact" />
          {error && <p className="text-red-500">{error}</p>}

          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Submit"}</Button>
        </form>
      </CardContent>
    </Card>
  );
}
