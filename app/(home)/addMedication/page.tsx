"use client";
import React, { useState } from "react";

import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/configs/firebase.config";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const AddMedication = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !quantity.trim()) {
      toast({
        description: "Medication name and quantity are required.",
        variant: "destructive",
      });
      return;
    }

    if (isNaN(Number(quantity)) || Number(quantity) < 0) {
      toast({
        description: "Quantity must be a valid non-negative number.",
        variant: "destructive",
      });
      return;
    }

    if (price && (isNaN(Number(price)) || Number(price) < 0)) {
      toast({
        description: "Price must be a valid non-negative number.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const medicationData = {
        name: name.trim(),
        quantity: Number(quantity),
        description: description.trim() || "",
        price: price ? Number(price) : null,
        updatedAt: new Date().toISOString(),
      };

      // Use the medication name (lowercase, sanitized) as the document ID
      const docId = name.trim().toLowerCase().replace(/\s+/g, "-");
      await setDoc(doc(db, "medications", docId), medicationData);

      toast({
        description: "✅ Medication added successfully!",
        duration: 3000,
      });

      // Reset form
      setName("");
      setQuantity("");
      setDescription("");
      setPrice("");

      // Optionally navigate back to DoctorNotes or another page
      router.push("/consultation");
    } catch (error) {
      console.error("Error adding medication:", error);
      toast({
        description: "Failed to add medication. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Add New Medication</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Medication Name</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter medication name (e.g., Ibuprofen)"
            className="focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Quantity in Stock</label>
          <Input
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter quantity (e.g., 100)"
            type="number"
            min="0"
            className="focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description (Optional)</label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter medication description (e.g., 200mg tablets, pain reliever)"
            className="focus-visible:ring-0 focus-visible:ring-offset-0 min-h-32"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Price (Optional)</label>
          <Input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price (e.g., 10.99)"
            type="number"
            step="0.01"
            min="0"
            className="focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/doctor-notes")}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting} className="bg-green-1">
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Adding...
              </>
            ) : (
              "Add Medication"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddMedication;
