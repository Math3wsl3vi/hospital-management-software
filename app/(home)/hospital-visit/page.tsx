"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/stores/UseStore";
import { collection, getDocs } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/configs/firebase.config";


type PatientData = {
  id: string;
  nationalId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  bloodGroup: string;
  phoneNumber: string;
  name?: string;
  phone?: string;
  sex?: string;
  dob?: string;
  email:string;
  insuranceProvider:string;
  insurancePolicyNumber:string;
};



const HospitalVisit = () => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredResults, setFilteredResults] = useState<PatientData[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null); // Store selected payment method
  const { selectedUser, setSelectedUser } = useUserStore();
  const [patients, setPatients] = useState<PatientData[]>([]);
  // const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();
  // const [error, setError] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "patients"));
        const patientList: PatientData[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          nationalId: doc.data().nationalId || "",
          firstName: doc.data().firstName || "",
          lastName: doc.data().lastName || "",
          dateOfBirth: doc.data().dateOfBirth || "",
          gender: doc.data().gender || "",
          bloodGroup: doc.data().bloodGroup || "",
          phoneNumber: doc.data().phoneNumber || "",
          name: `${doc.data().firstName} ${doc.data().lastName}` || "",
          phone: doc.data().phoneNumber || "",
          sex: doc.data().gender || "",
          dob: doc.data().dateOfBirth || "",
          email:doc.data().email || "",
          insuranceProvider: doc.data().insuranceProvider || "",
          insurancePolicyNumber: doc.data().insurancePolicyNumber || "",
        }));
        
        setPatients(patientList);
      } catch (err) {
        console.error("Error fetching patients:", err);
        toast({ description: "Error fetching patients" });
      }
    };
  
    fetchPatients();
  }, [toast]);
  

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim().toLowerCase();
    setQuery(value);
  
    if (!value) {
      setFilteredResults([]);
      return;
    }
  
    const results = patients.filter(
      (patient) =>
        `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(value) ||
        patient.nationalId.includes(value)
    );
  
    setFilteredResults(results); 
  };
  
  const handleSelect = (user: PatientData) => {
    setQuery(`${user.firstName} ${user.lastName}`);
    setSelectedUser({
      ...user,
      id: Number(user.nationalId), 
      name: `${user.firstName} ${user.lastName}`,
      phone: user.phoneNumber,
      sex: user.gender,
      dob: user.dateOfBirth,
      email: user.email,
      insuranceProvider:user.insuranceProvider,
      insurancePolicyNumber:user.insurancePolicyNumber
    });
    setFilteredResults([]);
  };
  const handleContinue = () => {
    if (!selectedUser) {
      alert("Please select a patient before continuing.");
      return;
    }
    setIsOpen(true);
  };

  return (
    <div className="h-screen w-full font-poppins flex justify-center p-2 overflow-scroll">
      <div className="w-full md:w-1/2">
        <h1 className="text-3xl text-center">
          Welcome to the Hospital
        </h1>
        <p className="text-center text-gray-400 mt-3">
          Enter the {"patient's"} Service Id/Name
        </p>
        <div className="mt-10 flex justify-center items-center gap-10 flex-col">
          {/* Patient Search */}
          <Input
            placeholder="Enter Id Number/ Name"
            value={query}
            onChange={handleSearch}
            className="font-poppins md:text-3xl focus-visible:ring-0 focus-visible:ring-offset-0 p-2 capitalize"
          />
          {filteredResults.length > 0 && (
            <div className="w-full md:w-3/4 bg-white border rounded-md overflow-y-auto">
              {filteredResults.map((user) => (
                <div
                  key={user.id}
                  onClick={() => handleSelect(user)}
                  className="p-2 cursor-pointer flex flex-row gap-2 items-center justify-between"
                >
                  <p>{user.firstName}</p>
                  <p>{user.nationalId}</p>
                </div>
              ))}
            </div>
          )}
          {/* new patient */}
          <div className="w-full flex flex-col gap-5 items-center">
            <h1>New Patient Registration</h1>
            <div className="w-full flex items-center justify-center">
              <Button 
              onClick={()=>router.push('patient-registration')}
              className="bg-green-1 w-1/2">
                Register
              </Button>
            </div>
          </div>

          {/* Payment Method Selection */}
          <h1 className="text-lg font-semibold hidden">Select Payment Method</h1>
          <div className="flex-row gap-2 hidden">
            <button
              className={`p-3 border rounded-md w-full ${
                paymentMethod === "Insurance" ? "bg-green-1 text-white" : "bg-gray-100"
              }`}
              onClick={() => setPaymentMethod("Insurance")}
            >
              Insurance
            </button>
            <button
              className={`p-3 border rounded-md w-full ${
                paymentMethod === "M-Pesa" ? "bg-green-1  text-white" : "bg-gray-100"
              }`}
              onClick={() => setPaymentMethod("M-Pesa")}
            >
              M-Pesa
            </button>
            <button
              className={`p-3 border rounded-md w-full ${
                paymentMethod === "Card" ? "bg-green-1 text-white" : "bg-gray-100"
              }`}
              onClick={() => setPaymentMethod("Card")}
            >
              Card Payment
            </button>
          </div>

          {/* Continue Button */}
          <Button onClick={handleContinue} className="w-1/2 bg-green-1">
            Continue
          </Button>
        </div>

        {/* Dialog Confirmation */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="font-poppins">
            <h1 className="font-poppins text-center mb-5 text-lg">
              Welcome to Lanet Regional Hospital{" "}
              <span className="font-semibold capitalize">
                 {selectedUser?.name}
              </span>
            </h1>
            <div className="flex flex-col gap-5">
              {/* Patient Details */}
              <div className="gap-2 flex flex-col">
                <label>Email</label>
                <div className="border p-2 rounded-md">{selectedUser?.email}</div>
              </div>
              <div className="gap-2 flex flex-col">
                <label>National Id Number</label>
                <div className="border p-2 rounded-md">{selectedUser?.id}</div>
              </div>
              <div className="flex flex-row gap-3 w-full">
                <div className="gap-2 flex flex-col w-1/2">
                  <label>Sex</label>
                  <div className="border p-2 rounded-md">{selectedUser?.sex}</div>
                </div>
                <div className="gap-2 flex flex-col w-1/2">
                  <label>Date of Birth</label>
                  <div className="border p-2 rounded-md">{selectedUser?.dob}</div>
                </div>
              </div>
              {/* Selected Payment Method */}
              {/* <div className="gap-2 flex flex-col">
                <label>Payment Method</label>
                <div className="border p-2 rounded-md">{paymentMethod}</div>
              </div> */}
            </div>

            {/* Continue to Triage */}
            <div className="w-full flex items-center justify-center">
              <Button
                onClick={() =>
                  router.push(
                    `/triage?user=${encodeURIComponent(
                      JSON.stringify(selectedUser)
                    )}&payment=${encodeURIComponent(paymentMethod!)}`
                  )
                }
                className="bg-green-1"
              >
                Continue to Triage
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default HospitalVisit;
