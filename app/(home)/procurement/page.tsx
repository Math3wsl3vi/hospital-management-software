"use client";
import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  query,
} from "firebase/firestore";
import { db } from "@/configs/firebase.config";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface ProcurementRequest {
  id: string;
  item: string;
  quantity: number;
  department: string;
  category: "Medications" | "Surgical" | "Laboratory" | "Equipment";
  status: "Pending" | "Approved" | "Rejected" | "Delivered";
  requestedDate: string;
}

const Procurement = () => {
  const [requests, setRequests] = useState<ProcurementRequest[]>([]);
  const [newRequest, setNewRequest] = useState({
    item: "",
    quantity: 0,
    department: "",
    category: "Medications" as ProcurementRequest["category"],
  });

  // Fetch from Firestore
  const fetchRequests = async () => {
    const q = query(collection(db, "procurement"));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    })) as ProcurementRequest[];
    setRequests(data);
  };

  // Add to Firestore
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addDoc(collection(db, "procurement"), {
      item: newRequest.item,
      quantity: Number(newRequest.quantity),
      department: newRequest.department,
      category: newRequest.category,
      status: "Pending",
      requestedDate: new Date().toISOString().split("T")[0],
    });
    setNewRequest({ item: "", quantity: 0, department: "", category: "Medications" });
    fetchRequests();
  };

  // Update status
  const handleStatusChange = async (
    id: string,
    newStatus: ProcurementRequest["status"]
  ) => {
    const requestRef = doc(db, "procurement", id);
    await updateDoc(requestRef, { status: newStatus });
    fetchRequests();
  };

  // Seed Dummy Data
  const seedData = async () => {
    const dummyRequests: Omit<ProcurementRequest, "id">[] = [
      // 30 MEDICATIONS
      { item: "Paracetamol 500mg Tablets", quantity: 2000, department: "Pharmacy", category: "Medications", status: "Pending", requestedDate: "2025-09-10" },
      { item: "Amoxicillin 250mg Capsules", quantity: 1500, department: "Pharmacy", category: "Medications", status: "Approved", requestedDate: "2025-09-11" },
      { item: "Cough Syrup 100ml", quantity: 800, department: "Pharmacy", category: "Medications", status: "Delivered", requestedDate: "2025-09-12" },
      { item: "Insulin Vials", quantity: 500, department: "Pharmacy", category: "Medications", status: "Pending", requestedDate: "2025-09-13" },
      { item: "Vitamin C Tablets", quantity: 1200, department: "Pharmacy", category: "Medications", status: "Rejected", requestedDate: "2025-09-14" },
      { item: "Aspirin 100mg", quantity: 1000, department: "Pharmacy", category: "Medications", status: "Pending", requestedDate: "2025-09-15" },
      { item: "Metformin 500mg", quantity: 900, department: "Pharmacy", category: "Medications", status: "Approved", requestedDate: "2025-09-15" },
      { item: "Hydrochlorothiazide 25mg", quantity: 600, department: "Pharmacy", category: "Medications", status: "Pending", requestedDate: "2025-09-16" },
      { item: "Lisinopril 10mg", quantity: 750, department: "Pharmacy", category: "Medications", status: "Delivered", requestedDate: "2025-09-16" },
      { item: "Diclofenac Injection", quantity: 400, department: "Pharmacy", category: "Medications", status: "Pending", requestedDate: "2025-09-16" },
      { item: "Ibuprofen 400mg", quantity: 1000, department: "Pharmacy", category: "Medications", status: "Pending", requestedDate: "2025-09-16" },
      { item: "Omeprazole 20mg", quantity: 850, department: "Pharmacy", category: "Medications", status: "Approved", requestedDate: "2025-09-17" },
      { item: "Antihistamine Syrup", quantity: 600, department: "Pharmacy", category: "Medications", status: "Pending", requestedDate: "2025-09-17" },
      { item: "Zinc Sulphate Tablets", quantity: 1000, department: "Pharmacy", category: "Medications", status: "Delivered", requestedDate: "2025-09-17" },
      { item: "Iron Supplements", quantity: 700, department: "Pharmacy", category: "Medications", status: "Pending", requestedDate: "2025-09-17" },
      { item: "Hydrocortisone Injection", quantity: 500, department: "Pharmacy", category: "Medications", status: "Pending", requestedDate: "2025-09-17" },
      { item: "Sodium Chloride 0.9% IV", quantity: 1000, department: "Emergency", category: "Medications", status: "Delivered", requestedDate: "2025-09-17" },
      { item: "Oral Rehydration Salts (ORS)", quantity: 2000, department: "Emergency", category: "Medications", status: "Pending", requestedDate: "2025-09-18" },
      { item: "Adrenaline Injection", quantity: 300, department: "Emergency", category: "Medications", status: "Approved", requestedDate: "2025-09-18" },
      { item: "Diazepam Injection", quantity: 400, department: "Emergency", category: "Medications", status: "Pending", requestedDate: "2025-09-18" },
      { item: "Morphine Injection", quantity: 250, department: "Emergency", category: "Medications", status: "Pending", requestedDate: "2025-09-18" },
      { item: "Chloroquine Tablets", quantity: 500, department: "Pharmacy", category: "Medications", status: "Rejected", requestedDate: "2025-09-18" },
      { item: "Antifungal Cream", quantity: 350, department: "Pharmacy", category: "Medications", status: "Pending", requestedDate: "2025-09-18" },
      { item: "Ceftriaxone Injection", quantity: 600, department: "Emergency", category: "Medications", status: "Approved", requestedDate: "2025-09-18" },
      { item: "Clarithromycin Tablets", quantity: 450, department: "Pharmacy", category: "Medications", status: "Delivered", requestedDate: "2025-09-18" },
      { item: "Losartan 50mg", quantity: 700, department: "Pharmacy", category: "Medications", status: "Pending", requestedDate: "2025-09-18" },
      { item: "Atorvastatin 20mg", quantity: 900, department: "Pharmacy", category: "Medications", status: "Pending", requestedDate: "2025-09-18" },
      { item: "Warfarin 5mg", quantity: 400, department: "Pharmacy", category: "Medications", status: "Pending", requestedDate: "2025-09-18" },
      { item: "Salbutamol Inhaler", quantity: 300, department: "Pharmacy", category: "Medications", status: "Approved", requestedDate: "2025-09-18" },
      { item: "Multivitamin Syrup", quantity: 650, department: "Pharmacy", category: "Medications", status: "Pending", requestedDate: "2025-09-18" },

      // SURGICAL SUPPLIES
      { item: "Surgical Masks", quantity: 1000, department: "Surgery", category: "Surgical", status: "Pending", requestedDate: "2025-09-15" },
      { item: "Sterile Gloves", quantity: 3000, department: "Surgery", category: "Surgical", status: "Delivered", requestedDate: "2025-09-14" },
      { item: "Scalpels", quantity: 200, department: "Surgery", category: "Surgical", status: "Approved", requestedDate: "2025-09-14" },

      // LAB SUPPLIES
      { item: "Microscope Slides", quantity: 1000, department: "Laboratory", category: "Laboratory", status: "Pending", requestedDate: "2025-09-15" },
      { item: "Blood Collection Tubes", quantity: 1500, department: "Laboratory", category: "Laboratory", status: "Approved", requestedDate: "2025-09-15" },
      { item: "Urine Test Strips", quantity: 700, department: "Laboratory", category: "Laboratory", status: "Delivered", requestedDate: "2025-09-15" },

      // GENERAL EQUIPMENT
      { item: "Wheelchairs", quantity: 20, department: "General", category: "Equipment", status: "Pending", requestedDate: "2025-09-15" },
      { item: "Hospital Beds", quantity: 50, department: "General", category: "Equipment", status: "Approved", requestedDate: "2025-09-15" },
      { item: "Stethoscopes", quantity: 100, department: "General", category: "Equipment", status: "Delivered", requestedDate: "2025-09-15" },
    ];

    for (const req of dummyRequests) {
      await addDoc(collection(db, "procurement"), req);
    }
    fetchRequests();
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const renderTable = (category: ProcurementRequest["category"]) => {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Qty</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dept</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {requests
              .filter((r) => r.category === category)
              .map((request) => (
                <tr key={request.id}>
                  <td className="px-6 py-4 text-sm">{request.item}</td>
                  <td className="px-6 py-4 text-sm">{request.quantity}</td>
                  <td className="px-6 py-4 text-sm">{request.department}</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        request.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : request.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : request.status === "Rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">{request.requestedDate}</td>
                  <td className="px-6 py-4 text-sm font-medium">
                    {request.status === "Pending" && (
                      <>
                        <Button
                          variant="ghost"
                          onClick={() => handleStatusChange(request.id, "Approved")}
                          className="text-green-600 hover:text-green-900 mr-2"
                        >
                          Approve
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => handleStatusChange(request.id, "Rejected")}
                          className="text-red-600 hover:text-red-900"
                        >
                          Reject
                        </Button>
                      </>
                    )}
                    {request.status === "Approved" && (
                      <Button
                        variant="ghost"
                        onClick={() => handleStatusChange(request.id, "Delivered")}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Mark as Delivered
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Hospital Procurement Management</h1>

      {/* New Request Form */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Create New Procurement Request</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Item"
            value={newRequest.item}
            onChange={(e) => setNewRequest((prev) => ({ ...prev, item: e.target.value }))}
            required
          />
          <Input
            type="number"
            placeholder="Quantity"
            value={newRequest.quantity}
            onChange={(e) => setNewRequest((prev) => ({ ...prev, quantity: Number(e.target.value) }))}
            required
          />
          <Select
            value={newRequest.department}
            onValueChange={(value) => setNewRequest((prev) => ({ ...prev, department: value }))}
          >
            <SelectTrigger><SelectValue placeholder="Department" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Pharmacy">Pharmacy</SelectItem>
              <SelectItem value="Surgery">Surgery</SelectItem>
              <SelectItem value="Emergency">Emergency</SelectItem>
              <SelectItem value="Laboratory">Laboratory</SelectItem>
              <SelectItem value="General">General</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={newRequest.category}
            onValueChange={(value: ProcurementRequest["category"]) =>
              setNewRequest((prev) => ({ ...prev, category: value }))
            }
          >
            <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Medications">Medications</SelectItem>
              <SelectItem value="Surgical">Surgical</SelectItem>
              <SelectItem value="Laboratory">Laboratory</SelectItem>
              <SelectItem value="Equipment">Equipment</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit" className="bg-green-600 hover:bg-green-700">Submit Request</Button>
        </form>
      </div>

      {/* Tabs for Procurement Requests */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-semibold">Procurement Requests</h2>
          <Button onClick={seedData} className="bg-green-600 hover:bg-green-700">Load</Button>
        </div>
        <Tabs defaultValue="Medications">
          <TabsList className="mb-4">
            <TabsTrigger value="Medications">Medications</TabsTrigger>
            <TabsTrigger value="Surgical">Surgical</TabsTrigger>
            <TabsTrigger value="Laboratory">Laboratory</TabsTrigger>
            <TabsTrigger value="Equipment">Equipment</TabsTrigger>
          </TabsList>
          <TabsContent value="Medications">{renderTable("Medications")}</TabsContent>
          <TabsContent value="Surgical">{renderTable("Surgical")}</TabsContent>
          <TabsContent value="Laboratory">{renderTable("Laboratory")}</TabsContent>
          <TabsContent value="Equipment">{renderTable("Equipment")}</TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Procurement;
