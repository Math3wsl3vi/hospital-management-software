"use client";
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Loader from "@/components/Loader";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { NurseList } from "@/lib/data";

const Nurses = () => {
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    phone: "",
    email: "",
    dob: "",
    homeAddress: "",
    nationalId: "",
    licenseNumber: "",
    gender: "",
    experience: "",
    hospitalId: "",
    emergencyContact: "",
    workingHours: "",
    status: "",
    profileImage: "",
    department: "",
    nationality: "",
    languages: "",
    bio: "",
    insuranceAccepted: ""
  });
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const [loading, setLoading ] = useState(false)

  const itemsPerPage = 10; 
  const [currentPage, setCurrentPage ] = useState(1);
  const totalPages = Math.ceil(NurseList.length / itemsPerPage)

  const paginatedData = NurseList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage 
  )

  const nextPage = ()=> {
    if(currentPage< totalPages ) setCurrentPage((prev) => prev + 1)
  }

  const prevPage = ()=> {
    if(currentPage > 1 ) setCurrentPage((prev) => prev - 1)
  }


  // input changes
  const handleInputChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

    // Submit form data
    const onSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true)
  
      try {
        console.log("Submitting form data:", formData); // Debugging
  
        const response = await fetch("/api/doctors", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        const result = await response.json();
  
        if (response.ok) {
           toast({
            description: "Patient data saved successfully.",
          })
          console.log("Patient data saved successfully:", result);
        } else {
          toast({
            description: "Failed to save patient data.",
          })
          console.error("Failed to save patient data:", result);
        }
      } catch (error) {
        toast({
          description: "Error submitting form.",
        })
        console.error("Error submitting form:", error);
      } finally{
        setLoading(false)
      }
    };

    const [ user, setUser ] = useState<{role:string} | null>(null)

    useEffect(()=>{
      const storedUser = localStorage.getItem('user')
      if(storedUser){
        setUser(JSON.parse(storedUser))
      }
    },[])
  

  return (
    <div>
      <h1 className="text-xl font-semibold mb-3">Nurses</h1>
      <div>
        <div className="grid grid-cols-2 mb-5">
          <div className="border p-2 text-center active:bg-green-1 active:text-white cursor-pointer hover:text-white hover:bg-green-1">
            <h1>Nurses List</h1>
          </div>
          {user?.role === 'admin' && (
          <div
            onClick={() => setIsOpen(true)}
            className="border p-2 text-center active:bg-green-1 active:text-white cursor-pointer hover:text-white hover:bg-green-1"
          >
            <h1>Register a Nurse</h1>
          </div>)}
        </div>
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>phone</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
                {paginatedData.map((doc, index)=> (
                  <TableRow key={index} className="capitalize">
                    <TableCell>{doc.name}</TableCell>
                    <TableCell>{doc.phone}</TableCell>
                    <TableCell>{doc.sex}</TableCell>
                    <TableCell>{doc.status}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>

        {/* pagination controls */}
        <div className="flex justify-between mt-5">
          <div>
            <Button
            className="bg-green-1"
            onClick={prevPage} disabled={currentPage === 1}>
              Previous
            </Button>
          </div>
          <div>
            <p>Page {currentPage} of {totalPages}</p>
          </div>
          <div>
            <Button 
            className="bg-green-1"
            onClick={nextPage} disabled={currentPage === totalPages}>
              Next
            </Button>
          </div>
          
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="w-[800px]">
          <form onSubmit={onSubmit} >
            <h1 className="text-xl font-semibold mb-3 text-center">Register a Nurse</h1>
            <div className="flex flex-row justify-between gap-10">
              <div className="flex flex-col gap-4 mb-5">
                <Input placeholder="Full Name" name="name" onChange={handleInputChanges} />
                <Input placeholder="Phone Number" name="phone" onChange={handleInputChanges} />
                <Input placeholder="Specialization" name="specialization" onChange={handleInputChanges} />
                <Input placeholder="License Number" name="licenseNumber" onChange={handleInputChanges} />
                <Input placeholder="Gender" name="gender" onChange={handleInputChanges} />
                <Input placeholder="Experience (years)" name="experience" onChange={handleInputChanges} />
              </div>
              <div className="flex flex-col gap-4 mb-5">
                <Input placeholder="National ID" name="nationalId" onChange={handleInputChanges} />
                <Input placeholder="Email Address" name="email" onChange={handleInputChanges} />
                <Input placeholder="Address" name="homeAddress" onChange={handleInputChanges} />
                <Input placeholder="Date of Birth" name="dob" type="date" onChange={handleInputChanges} />
                <Input placeholder="Emergency Contact" name="emergencyContact" onChange={handleInputChanges} />
                <Input placeholder="Working Hours" name="workingHours" onChange={handleInputChanges} />
              </div>
            </div>
            <div className="flex flex-row justify-between gap-10 mt-5">
              <div className="flex flex-col gap-4">
                <Input placeholder="Status" name="status" onChange={handleInputChanges} />
                <Input placeholder="Profile Image URL" name="profileImage" onChange={handleInputChanges} />
                <Input placeholder="Department" name="department" onChange={handleInputChanges} />
                <Input placeholder="Nationality" name="nationality" onChange={handleInputChanges} />
              </div>
              <div className="flex flex-col gap-4">
                <Input placeholder="Languages Spoken" name="languages" onChange={handleInputChanges} />
                <Input placeholder="Biography" name="bio" onChange={handleInputChanges} />
                <Input placeholder="Insurance Accepted" name="insuranceAccepted" onChange={handleInputChanges} />
              </div>
            </div>
            <div className="w-full mt-5 flex items-center">
              <Button className="w-full bg-green-1">
                {loading && <Loader/> || 'Save Doctor'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Nurses;