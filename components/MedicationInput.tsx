import React, { useState, useEffect, useRef } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { 
  Search, 
  Plus, 
  X, 
  CheckCircle, 
  AlertCircle, 
  Package
} from "lucide-react";

interface MedicationItem {
  id: string;
  name?: string;
  quantity?: number;
  description?: string;
  category?: string;
  manufacturer?: string;
  dosageForm?: string;
}

export interface PrescribedMedication {
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

interface MedicationInputProps {
  inventory: MedicationItem[];
  onMedicationChange: (medications: PrescribedMedication[]) => void;
  initialMedications?: PrescribedMedication[];
}

const MedicationInput: React.FC<MedicationInputProps> = ({ 
  inventory, 
  onMedicationChange, 
  initialMedications = [] 
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMedications, setSelectedMedications] = useState<PrescribedMedication[]>(initialMedications);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentMedication, setCurrentMedication] = useState<Partial<PrescribedMedication>>({});
  const [isAddingMedication, setIsAddingMedication] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredInventory = inventory.filter(item =>
    item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedMedications.find(med => med.medicationId === item.id)
  );

  useEffect(() => {
    onMedicationChange(selectedMedications);
  }, [selectedMedications, onMedicationChange]);

  const handleMedicationSelect = (medication: MedicationItem) => {
    setCurrentMedication({
      medicationId: medication.id,
      name: medication.name || 'Unknown Medication',
      available: (medication.quantity || 0) > 0,
      quantityAvailable: medication.quantity || 0,
      quantityPrescribed: 1,
      dosage: "",
      frequency: "",
      duration: "",
      instructions: ""
    });
    setSearchTerm("");
    setShowSuggestions(false);
    setIsAddingMedication(true);
  };

  const handleAddMedication = () => {
    if (!currentMedication.medicationId || !currentMedication.dosage || !currentMedication.frequency) {
      return;
    }

    const newMedication: PrescribedMedication = {
      id: Date.now().toString(),
      medicationId: currentMedication.medicationId!,
      name: currentMedication.name!,
      dosage: currentMedication.dosage!,
      frequency: currentMedication.frequency!,
      duration: currentMedication.duration || "",
      instructions: currentMedication.instructions || "",
      available: currentMedication.available!,
      quantityAvailable: currentMedication.quantityAvailable!,
      quantityPrescribed: currentMedication.quantityPrescribed || 1,
    };

    setSelectedMedications(prev => [...prev, newMedication]);
    setCurrentMedication({});
    setIsAddingMedication(false);
  };

  const handleRemoveMedication = (medicationId: string) => {
    setSelectedMedications(prev => prev.filter(med => med.id !== medicationId));
  };

  const handleCancelAdd = () => {
    setCurrentMedication({});
    setIsAddingMedication(false);
    setSearchTerm("");
  };

  const handleQuantityChange = (medicationId: string, quantity: number) => {
    setSelectedMedications(prev =>
      prev.map(med =>
        med.id === medicationId
          ? { ...med, quantityPrescribed: Math.max(1, Math.min(quantity, med.quantityAvailable)) }
          : med
      )
    );
  };

  const getAvailabilityStatus = (medication: PrescribedMedication) => {
    if (!medication.available) {
      return { status: "unavailable", color: "bg-red-100 text-red-800", icon: AlertCircle };
    }
    if (medication.quantityPrescribed > medication.quantityAvailable) {
      return { status: "insufficient", color: "bg-yellow-100 text-yellow-800", icon: AlertCircle };
    }
    return { status: "available", color: "bg-green-100 text-green-800", icon: CheckCircle };
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              ref={searchInputRef}
              type="text"
              placeholder="Search medications..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowSuggestions(e.target.value.length > 0);
              }}
              onFocus={() => setShowSuggestions(searchTerm.length > 0)}
              className="pl-10"
              disabled={isAddingMedication}
            />
          </div>
        </div>

        {showSuggestions && filteredInventory.length > 0 && (
          <Card className="absolute z-10 w-full mt-1 max-h-60 overflow-y-auto bg-white shadow-lg">
            <div className="p-2">
              {filteredInventory.map((medication) => (
                <div
                  key={medication.id}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer rounded"
                  onClick={() => handleMedicationSelect(medication)}
                >
                  <div className="flex-1">
                    <div className="font-medium">{medication.name || 'Unknown Medication'}</div>
                    <div className="text-sm text-gray-500">
                      {medication.description && `${medication.description} • `}
                      {medication.dosageForm && `${medication.dosageForm} • `}
                      Stock: {medication.quantity || 0}
                    </div>
                  </div>
                  <Badge 
                    variant={(medication.quantity || 0) > 0 ? "default" : "destructive"}
                    className="text-xs"
                  >
                    {(medication.quantity || 0) > 0 ? "Available" : "Out of Stock"}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>

      {/* Add Medication Form */}
      {isAddingMedication && currentMedication.medicationId && (
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-lg">{currentMedication.name}</h4>
              <div className="flex items-center gap-2">
                <Badge 
                  className={getAvailabilityStatus({
                    ...currentMedication as PrescribedMedication
                  }).color}
                >
                  {currentMedication.available ? "Available" : "Out of Stock"}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              <div>
                <label className="text-sm font-medium">Dosage</label>
                <Input
                  placeholder="e.g., 500mg"
                  value={currentMedication.dosage || ""}
                  onChange={(e) => setCurrentMedication(prev => ({...prev, dosage: e.target.value}))}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Frequency</label>
                <Input
                  placeholder="e.g., 3 times daily"
                  value={currentMedication.frequency || ""}
                  onChange={(e) => setCurrentMedication(prev => ({...prev, frequency: e.target.value}))}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Duration</label>
                <Input
                  placeholder="e.g., 7 days"
                  value={currentMedication.duration || ""}
                  onChange={(e) => setCurrentMedication(prev => ({...prev, duration: e.target.value}))}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Quantity</label>
                <Input
                  type="number"
                  min="1"
                  max={currentMedication.quantityAvailable}
                  value={currentMedication.quantityPrescribed || 1}
                  onChange={(e) => setCurrentMedication(prev => ({
                    ...prev, 
                    quantityPrescribed: parseInt(e.target.value) || 1
                  }))}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Instructions</label>
              <Input
                placeholder="e.g., Take with food"
                value={currentMedication.instructions || ""}
                onChange={(e) => setCurrentMedication(prev => ({...prev, instructions: e.target.value}))}
              />
            </div>

            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-600">
                <Package className="inline w-4 h-4 mr-1" />
                Available: {currentMedication.quantityAvailable}
              </div>
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={handleAddMedication}
                disabled={!currentMedication.dosage || !currentMedication.frequency}
                size="sm"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Medication
              </Button>
              <Button 
                onClick={handleCancelAdd}
                variant="outline"
                size="sm"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Selected Medications List */}
      <div className="space-y-3">
        <h4 className="font-medium">Prescribed Medications ({selectedMedications.length})</h4>

        {selectedMedications.map((medication) => {
          const availability = getAvailabilityStatus(medication);
          const IconComponent = availability.icon;
          
          return (
            <Card key={medication.id} className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h5 className="font-medium">{medication.name}</h5>
                    <Badge className={availability.color}>
                      <IconComponent className="w-3 h-3 mr-1" />
                      {availability.status === "available" && "Available"}
                      {availability.status === "insufficient" && "Insufficient Stock"}
                      {availability.status === "unavailable" && "Out of Stock"}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600">
                    <div><strong>Dosage:</strong> {medication.dosage}</div>
                    <div><strong>Frequency:</strong> {medication.frequency}</div>
                    <div><strong>Duration:</strong> {medication.duration}</div>
                    <div><strong>Quantity:</strong> 
                      <Input
                        type="number"
                        min="1"
                        max={medication.quantityAvailable}
                        value={medication.quantityPrescribed}
                        onChange={(e) => handleQuantityChange(medication.id, parseInt(e.target.value) || 1)}
                        className="w-16 h-6 text-xs ml-1 inline-block"
                      />
                      /{medication.quantityAvailable}
                    </div>
                  </div>
                  
                  {medication.instructions && (
                    <div className="text-sm text-gray-600 mt-1">
                      <strong>Instructions:</strong> {medication.instructions}
                    </div>
                  )}
                </div>
                
                <Button
                  onClick={() => handleRemoveMedication(medication.id)}
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {selectedMedications.length === 0 && !isAddingMedication && (
        <div className="text-center py-8 text-gray-500">
          <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No medications prescribed yet.</p>
          <p className="text-sm">Search and add medications above.</p>
        </div>
      )}
    </div>
  );
};

export default MedicationInput;
