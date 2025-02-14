import { NextResponse } from "next/server";
import { db } from './../../../configs/index' 
import { patients } from "./../../../configs/schema"; 
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Check for existing phone/email to avoid duplicates
    const existingPatient = await db.query.patients.findFirst({
      where: eq(patients.phoneNumber, body.phone),
    });

    if (existingPatient) {
      return NextResponse.json({ error: "Patient already exists" }, { status: 400 });
    }

    // Insert patient data
    const result = await db.insert(patients).values({
      firstName: body.firstName,  
      middleName: body.middleName ?? null, // Handle optional values
      lastName: body.lastName,
      dateOfBirth: new Date(body.dob).toISOString(),  
      gender: body.gender as "Male" | "Female",
      maritalStatus: body.maritalStatus ?? null,
      nationalId: body.nationalId,
      phoneNumber: body.phone,
      email: body.email,
      residentialAddress: body.homeAddress ?? null,
      bloodGroup: body.bloodType as "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-", // Ensure correct ENUM values
      allergies: body.allergies ?? null,
      chronicConditions: body.chronicConditions ?? null,
      currentMedications: body.currentMedications ?? null,
      pastMedicalHistory: body.pastMedicalHistory ?? null,
      familyMedicalHistory: body.familyMedicalHistory ?? null,
      insuranceProvider: body.insuranceProvider ?? null,
      insurancePolicyNumber: body.insuranceNumber ?? null,
      nhifNumber: body.nhifNumber ?? null,
      paymentPreference: body.paymentPreference as "Mpesa" | "Insurance" | "Credit Card",
      registrationDate: new Date().toISOString(),
    }).returning();
   
    
    
    console.log(Object.keys(patients));


    return NextResponse.json({ success: true, data: result }, { status: 201 });

  } catch (error) {
    console.error("Error inserting patient:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
