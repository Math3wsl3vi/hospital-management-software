import { NextResponse } from "next/server";
import { db } from './../../../configs/index' 
import { patients } from "./../../../configs/schema"; 
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Check for existing phone/email to avoid duplicates
    const existingPatient = await db.query.patients.findFirst({
      where: eq(patients.phone, body.phone),
    });

    if (existingPatient) {
      return NextResponse.json({ error: "Patient already exists" }, { status: 400 });
    }

    // Insert patient data
    const result = await db.insert(patients).values({
      firstName: body.firstName,  
      middleName: body.middleName,
      lastName: body.lastName,
      rank: body.rank,
      unit: body.unit,
      phone: body.phone,
      secondaryPhone: body.secondaryPhone,
      email: body.email,
      sex: body.sex,
      dob: new Date(body.dob).toISOString(),  
      bloodType: body.bloodType,
      maritalStatus: body.maritalStatus,
      homeAddress: body.homeAddress,
      county: body.county,
      city: body.city,
      postalCode: body.postalCode,
      emergencyName: body.emergencyName,
      emergencyRelation: body.emergencyRelation,
      emergencyPhone: body.emergencyPhone,
      emergencyEmail: body.emergencyEmail,
      insuranceProvider: body.insuranceProvider,
      insuranceNumber: body.insuranceNumber,
    }).returning();
    
    console.log(Object.keys(patients));


    return NextResponse.json({ success: true, data: result }, { status: 201 });

  } catch (error) {
    console.error("Error inserting patient:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
