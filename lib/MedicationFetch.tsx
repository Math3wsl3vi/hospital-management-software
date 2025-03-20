import { db } from "@/configs/firebase.config";
import { collection, getDocs } from "firebase/firestore";

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  amount: number;
  frequency: string;
  duration: string;
  quantity: string;
  date: string; // Formatted date
}

export const fetchMedicationsGroupedByVisitId = async (email: string) => {
  try {
    console.log(`Fetching medications for email: ${email}`);

    const emailKey = email.replace(/[@.]/g, "_");
    const visitsCollectionRef = collection(db, "patient-medication", emailKey, "visits");

    // Fetch all visit documents
    const visitSnapshots = await getDocs(visitsCollectionRef);
    console.log(`Found ${visitSnapshots.docs.length} visits`);

    if (visitSnapshots.empty) {
      console.warn("No visits found.");
      return {};
    }

    const groupedMedications: Record<string, Medication[]> = {};

    for (const visitDoc of visitSnapshots.docs) {
      const visitId = visitDoc.id;
      console.log(`Processing visit ID: ${visitId}`);

      const medicationsCollectionRef = collection(visitDoc.ref, "medications");
      const medicationsSnapshot = await getDocs(medicationsCollectionRef);

      console.log(`Found ${medicationsSnapshot.docs.length} items for visit ${visitId}`);

      if (!medicationsSnapshot.empty) {
        groupedMedications[visitId] = medicationsSnapshot.docs.map((doc) => {
          const data = doc.data();
          console.log(`Fetched item data:`, data);

          // Format date if available
          const date = data.date?.toDate ? data.date.toDate().toLocaleDateString("en-GB") : "Unknown";

          return {
            id: doc.id,
            name: data.name || "Unknown",
            dosage: data.dosage || "N/A",
            amount: data.amount || 0,
            frequency: data.frequency || "N/A",
            duration: data.duration || "N/A",
            quantity: data.quantity || "N/A",
            date, // Formatted date
          };
        });
      } else {
        console.warn(`No medications found for visit ID ${visitId}`);
      }
    }

    console.log("Final grouped medications:", groupedMedications);
    return groupedMedications;
  } catch (error) {
    console.error("Error fetching medications:", error);
    return {};
  }
};
