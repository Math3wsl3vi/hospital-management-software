import { NextResponse } from "next/server";
import { db } from "./../../../configs/index"; 
import { patients } from "./../../../configs/schema"; 
import { eq, or } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Check for existing phone/email/nationalId to avoid duplicates
    const existingPatient = await db.query.patients.findFirst({
      where: or(
        eq(patients.phoneNumber, body.phoneNumber), // Ensure this matches schema
        eq(patients.email, body.email),
        eq(patients.nationalId, body.nationalId)
      ),
    });

    if (existingPatient) {
      return NextResponse.json({ error: "Patient already exists" }, { status: 400 });
    }

    // Insert patient data
    const result = await db.insert(patients).values({
      firstName: body.firstName,  
      middleName: body.middleName ?? null, // Handle optional values
      lastName: body.lastName,
      dateOfBirth: new Date(body.dateOfBirth).toISOString(), // Ensure correct field name
      gender: body.gender as "Male" | "Female",
      maritalStatus: body.maritalStatus ?? null,
      nationalId: body.nationalId,
      phoneNumber: body.phoneNumber, // Ensure consistency
      email: body.email ?? null, // Optional
      residentialAddress: body.residentialAddress ?? null, // Fixed name
      bloodGroup: body.bloodGroup as "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-", // Ensure correct ENUM values
      allergies: body.allergies ?? null,
      chronicConditions: body.chronicConditions ?? null,
      currentMedications: body.currentMedications ?? null,
      pastMedicalHistory: body.pastMedicalHistory ?? null,
      familyMedicalHistory: body.familyMedicalHistory ?? null,
      insuranceProvider: body.insuranceProvider ?? null,
      insurancePolicyNumber: body.insurancePolicyNumber ?? null, // Fixed name
      nhifNumber: body.nhifNumber ?? null,
      paymentPreference: body.paymentPreference as "Mpesa" | "Insurance" | "Credit Card",
      nextOfKin: body.nextOfKin ?? null,
      nextOfKinRelationship: body.nextOfKinRelationship ?? null, // Fixed typo
      nextOfKinContact: body.nextOfKinContact ?? null,
      emergencyName: body.emergencyName ?? null,
      emergencyRelationship: body.emergencyRelationship ?? null, // Fixed typo
      emergencyContact: body.emergencyContact ?? null,
      registrationDate: new Date().toISOString(),
    }).returning();

    return NextResponse.json({ success: true, data: result }, { status: 201 });

  } catch (error) {
    console.error("Error inserting patient:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
