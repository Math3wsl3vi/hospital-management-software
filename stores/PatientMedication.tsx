import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/configs/firebase.config";

interface Medication {
  id: string;
  name: string;
  dosage: string;
  amount: number;
  frequency: string;
  duration: string;
  quantity: string;
}

interface PatientWithMedications {
  id: string;
  name: string;
  email: string;
  medicationsByVisit: {
    visitId: string;
    medications: Medication[];
  }[];
}

const usePatientsWithMedications = () => {
  const [patientsWithMedications, setPatientsWithMedications] = useState<PatientWithMedications[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatientsAndMedications = async () => {
      try {
        setLoading(true);
        setError(null);

        // Step 1: Fetch all patients
        const patientsRef = collection(db, "patients");
        const patientsSnap = await getDocs(patientsRef);

        if (patientsSnap.empty) {
          console.warn("No patients found.");
          setPatientsWithMedications([]);
          return;
        }

        const patientsData: PatientWithMedications[] = [];

        // Step 2: Loop through patients and fetch medications
        for (const patientDoc of patientsSnap.docs) {
          const patientId = patientDoc.id;
          const patientName = patientDoc.data().name || "Unknown";
          const patientEmail = patientDoc.data().email || "Unknown";

          // Format email to match Firestore document IDs
          const emailKey = patientEmail.replace(/[@.]/g, "_");

          // Step 3: Fetch visits for this patient
          const visitsCollectionRef = collection(db, "patient-medication", emailKey, "visits");
          const visitsSnap = await getDocs(visitsCollectionRef);

          const medicationsByVisit = [];

          for (const visitDoc of visitsSnap.docs) {
            const visitId = visitDoc.id;

            // Step 4: Fetch medications for this visit
            const medicationsCollectionRef = collection(visitDoc.ref, "medications");
            const medicationsSnap = await getDocs(medicationsCollectionRef);

            const medications = medicationsSnap.docs.map((medDoc) => ({
              id: medDoc.id,
              name: medDoc.data().name || "Unknown",
              dosage: medDoc.data().dosage || "N/A",
              amount: medDoc.data().amount || 0,
              frequency: medDoc.data().frequency || "N/A",
              duration: medDoc.data().duration || "N/A",
              quantity: medDoc.data().quantity || "N/A",
            }));

            if (medications.length > 0) {
              medicationsByVisit.push({ visitId, medications });
            }
          }

          // Step 5: Store the patient with their medications
          patientsData.push({
            id: patientId,
            name: patientName,
            email: patientEmail,
            medicationsByVisit,
          });
        }

        setPatientsWithMedications(patientsData);
      } catch (err) {
        console.error("Error fetching patient medications:", err);
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatientsAndMedications();
  }, []);

  return { patientsWithMedications, loading, error };
};

export default usePatientsWithMedications;
