import React, { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PrescriptionForm = () => {
  const [medications, setMedications] = useState<any[]>([]);
  const [selectedMedication, setSelectedMedication] = useState<string>('');

  // Fetch medication data when the component mounts
  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const response = await fetch(
          'https://api.fda.gov/drug/label.json?search=active_ingredient:"acetaminophen"&limit=10'
        );
        const data = await response.json();
        setMedications(data.results); // Save results to state
      } catch (error) {
        console.error('Error fetching medications:', error);
      }
    };

    fetchMedications();
  }, []); // Empty array means it runs only once when the component mounts

  // Handle selection of a medication
  const handleMedicationChange = (value: string) => {
    setSelectedMedication(value);
  };

  return (
    <div>
      <h1>Select Medication</h1>
      <form>
        <Select onValueChange={handleMedicationChange} value={selectedMedication}>
          <SelectTrigger id="medication">
            <SelectValue placeholder="Select a medication" />
          </SelectTrigger>
          <SelectContent className='focus-visible:ring-0 focus-visible:ring-offset-0'>
            {medications.map((med, index) => {
              // Check if openfda exists and has brand_name and generic_name
              const brandName = med.openfda?.brand_name?.[0] || 'Unknown Brand';
              const genericName = med.openfda?.generic_name?.[0] || med.substance_name?.[0] || 'Unknown Generic';

              return (
                <SelectItem key={index} value={brandName}>
                  {brandName} - {genericName}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </form>
    </div>
  );
};

export default PrescriptionForm;