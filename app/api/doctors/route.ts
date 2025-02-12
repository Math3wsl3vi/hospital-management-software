import { eq } from 'drizzle-orm';
import { db } from '../../../configs/index' 
import { NextResponse } from "next/server";
import { doctors } from "../../../configs/schema"; 

export async function POST(req:Request){
    try {
        const body = await req.json();

        const existingDoctor = await db.query.doctors.findFirst({
            where:eq(doctors.phone, body.phone)
        });
        if(existingDoctor){
            return NextResponse.json({error: 'Doctor already exists in the system'},{status:400})
        }
        // insert Doctor data
        const result = (await db.insert(doctors)).values({
            name:body.name,
            specialization:body.specialization,
            phone:body.phone,
            email:body.email,
            dob:body.dob,
            homeAddress:body.homeAddress,
            nationalId:body.nationalId,
            licenseNumber:body.licenseNumber,
            gender:body.gender,
            experience:body.experience,
            emergencyContact:body.emergencyContact,
            workingHours:body.workingHours,
            status:body.status,
            profileImage:body.profileImage,
            department:body.department,
            nationality:body.nationality,
            languages:body.languages,
            bio:body.bio,
            insuranceAccepted:body.insuranceAccepted
        }).returning();
        console.log(Object.keys(doctors))

        return NextResponse.json({message: 'Doctor added successfully'}, {status:201});

        
    } catch (error) {
        console.log('Error inserting doctors', error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}