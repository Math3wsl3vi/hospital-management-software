import { create } from "zustand";

// In MedicationStore.ts
interface PrescribedMedication {
  id: string;
  medicationId: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
  available: boolean;
  quantityAvailable: number;
  quantityPrescribed: number;
}

interface DocNotes {
  symptoms: string;
  diagnosis: string;
  medication: string;
  prescribedMedications: PrescribedMedication[];
  buddyData: { name: string; buddy: string; remarks: string }[];
  aiRecommendation?: string;
}

interface DocNotesStore {
  docNotes: DocNotes | null;
  setDocNotes: (notes: DocNotes | null) => void;
}

export const useDocNotesStore = create<DocNotesStore>((set) => ({
  docNotes: null,
  setDocNotes: (notes) => set({ docNotes: notes }),
}));