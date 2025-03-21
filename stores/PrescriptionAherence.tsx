import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/configs/firebase.config";

// Define adherence tracking types
interface Medication {
  id: string;
  name: string;
  canCheck: boolean;
  schedule?: string[];
}

interface Patient {
  id: string;
  name: string;
  email: string;  // ✅ Add email field
  adherenceList: Medication[];
}

const useAdherenceData = () => {
  const [patients, setPatients] = useState<Patient[]>([]); 

  useEffect(() => {
    const fetchAdherenceData = async () => {
      try {
        const usersRef = collection(db, "users");
        const usersSnap = await getDocs(usersRef);
        const patientData: Patient[] = []; 

        for (const userDoc of usersSnap.docs) {
          const userId = userDoc.id;
          const userData = userDoc.data();
          const userName = userData.name || "Unknown"; 
          const userEmail = userData.email || "No Email"; // ✅ Fetch email

          const medicationsRef = collection(db, "users", userId, "medicines");
          const medicationsSnap = await getDocs(medicationsRef);
          if (medicationsSnap.empty) {
            console.log(`No medications found for user: ${userName}`);
            continue;
          }

          const adherenceList: Medication[] = [];

          medicationsSnap.forEach((medDoc) => {
            const { name, canCheck, schedule } = medDoc.data();
            adherenceList.push({
              id: medDoc.id,
              name: name || "Unknown", 
              canCheck: canCheck ?? false, 
              schedule: schedule || [], 
            });
          });

          patientData.push({
            id: userId,
            name: userName,
            email: userEmail, // ✅ Add email to patient object
            adherenceList,
          });
        }

        setPatients(patientData);
      } catch (error) {
        console.error("Error fetching adherence data:", error);
      }
    };

    fetchAdherenceData();
  }, []);

  return { patients };
};

export default useAdherenceData;
