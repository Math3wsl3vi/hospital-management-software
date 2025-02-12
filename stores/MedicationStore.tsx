import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DocNotes {
    symptoms: string;
    medication: string;
    diagnosis:string;
}

interface DocNotesState {
     docNotes:DocNotes;
     setDocNotes :(docNotes :DocNotes) => void;
}

export const useDocNotesStore = create<DocNotesState>()(
    persist(
        (set) => ({
            docNotes: {
                symptoms: '',
                medication: '',
                diagnosis: ''
            },
            setDocNotes: (docNotes) => set({docNotes})
        }),
        {
            name: 'docNotes-storage',
        }
    )
)