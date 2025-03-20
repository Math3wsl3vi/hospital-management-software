import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUserStore } from "@/stores/UseStore";
import { Label } from "./ui/label";
import { fetchMedicationsGroupedByVisitId, Medication } from "@/lib/MedicationFetch";


const History = () => {
  const selectedUser = useUserStore((state) => state.selectedUser);
  const [medications, setMedications] = useState<Record<string, Medication[]>>({});
  const [loading, setLoading] = useState(false);

  const fetchMedications = async () => {
    if (!selectedUser?.email) return;
    setLoading(true);
    try {
      const data = await fetchMedicationsGroupedByVisitId(selectedUser.email);
      setMedications(data);
    } catch (error) {
      console.error("Error fetching medications:", error);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="grid grid-cols-3 mb-5">
       
        {/* Patient Profile Dialog */}
        <Dialog>
          <DialogTrigger className="border p-2 text-center active:bg-green-1 active:text-white cursor-pointer hover:text-white hover:bg-green-1">
            {"Patient's"} Records
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="capitalize">Medical Records</DialogTitle>
              <div className="flex flex-col gap-4 mt-10">
                <div>
                  <Label>{"Patient's"} Name</Label>
                  <h1 className="p-1 border border-gray-300 rounded-md">{selectedUser?.name}</h1>
                </div>
                <div>
                  <Label>{"Patient's"} National Id</Label>
                  <h1 className="p-1 border border-gray-300 rounded-md">{selectedUser?.id}</h1>
                </div>
                <div>
                  <Label>{"Patient's"} Date Of Birth</Label>
                  <h1 className="p-1 border border-gray-300 rounded-md">{selectedUser?.dob}</h1>
                </div>
                <div>
                  <Label>{"Patient's"} Gender</Label>
                  <h1 className="p-1 border border-gray-300 rounded-md">{selectedUser?.sex}</h1>
                </div>
                <div>
                  <Label>{"Patient's"} Insurance Provider</Label>
                  <h1 className="p-1 border border-gray-300 rounded-md">{selectedUser?.insuranceProvider || "N/A"}</h1>
                </div>
                <div>
                  <Label>{"Patient's"} Insurance Policy Number</Label>
                  <h1 className="p-1 border border-gray-300 rounded-md">{selectedUser?.insurancePolicyNumber || "N/A"}</h1>
                </div>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>

         {/* Appointments Dialog */}
         <Dialog>
          <DialogTrigger className="border p-2 text-center active:bg-green-1 active:text-white cursor-pointer hover:text-white hover:bg-green-1">
            Appointments
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>NOTICE!</DialogTitle>
              <DialogDescription>
                Appointments not available at the moment.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        {/* Medication History Dialog */}
        <Dialog>
          <DialogTrigger
            className="border p-2 text-center active:bg-green-1 active:text-white cursor-pointer hover:text-white hover:bg-green-1"
            onClick={fetchMedications}
          >
            Medication History
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Medication History</DialogTitle>
              {loading ? (
                <p>Loading medications...</p>
              ) : Object.keys(medications).length > 0 ? (
                Object.entries(medications).map(([visitId, meds]) => (
                  <div key={visitId} className="mt-4 border p-3 rounded-lg shadow-sm">
                    <ul className="mt-2">
                      {meds.map((med) => (
                        <li key={med.id} className="p-2 border-b">
                          <strong>{med.name}</strong> - {med.dosage}, {med.frequency}, {med.duration}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              ) : (
                <p>No medication history found.</p>
              )}
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default History;
