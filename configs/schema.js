import { pgTable, serial, text, integer, timestamp, date } from "drizzle-orm/pg-core";

// Patients Table
export const patients = pgTable("patients", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  middleName: text("middle_name"),
  lastName: text("last_name").notNull(),
  rank: text("rank"),
  unit: text("unit"),
  phone: text("phone").unique().notNull(),
  secondaryPhone: text("secondary_phone"),
  email: text("email").unique().notNull(),
  sex: text("sex").notNull(),
  dob: date("dob").notNull(),
  bloodType: text("blood_type"),
  maritalStatus: text("marital_status"),
  homeAddress: text("home_address"),
  county: text("county"),
  city: text("city"),
  postalCode: text("postal_code"),
  
  // Emergency Contact
  emergencyName: text("emergency_name").notNull(),
  emergencyRelation: text("emergency_relation").notNull(),
  emergencyPhone: text("emergency_phone").notNull(),
  emergencyEmail: text("emergency_email"),

  // Insurance
  insuranceProvider: text("insurance_provider"),
  insuranceNumber: text("insurance_number").unique(),

  createdAt: timestamp("created_at").defaultNow(),
});


// Doctors Table
export const doctors = pgTable("doctors", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  specialization: text("specialization").notNull(),
  phone: text("phone").unique().notNull(),
  email: text("email").unique().notNull(),
  dob: date("dob").notNull(),
  homeAddress: text("home_address"),
  nationalId: text("national_id").unique().notNull(),
  licenseNumber: text("license_number").unique().notNull(),
  gender: text("gender").notNull(), 
  experience: integer("experience").notNull(), 
  emergencyContact: text("emergency_contact").notNull(),
  workingHours: text("working_hours").notNull(), 
  status: text("status").default("Active"), 
  profileImage: text("profile_image"), 
  department: text("department").notNull(),
  nationality: text("nationality").notNull(),
  languages: text("languages").notNull(), 
  bio: text("bio"),
  insuranceAccepted: text("insurance_accepted").notNull(), 
  createdAt: timestamp("created_at").defaultNow(),
});


// Appointments Table
export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  patientId: integer("patient_id").notNull().references(() => patients.id),
  doctorId: integer("doctor_id").notNull().references(() => doctors.id),
  date: timestamp("date").notNull(),
  status: text("status").default("Scheduled"), // Scheduled, Completed, Canceled
  createdAt: timestamp("created_at").defaultNow(),
});

// Medications Table
export const medications = pgTable("medications", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  dosage: text("dosage").notNull(),
  price: integer("price").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Prescriptions Table
export const prescriptions = pgTable("prescriptions", {
  id: serial("id").primaryKey(),
  appointmentId: integer("appointment_id").notNull().references(() => appointments.id),
  medicationId: integer("medication_id").notNull().references(() => medications.id),
  quantity: integer("quantity").notNull(),
  totalPrice: integer("total_price").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Payments Table
export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  patientId: integer("patient_id").notNull().references(() => patients.id),
  amount: integer("amount").notNull(),
  method: text("method").notNull(), // MPesa, Card, Insurance
  status: text("status").default("Pending"), // Pending, Paid, Failed
  createdAt: timestamp("created_at").defaultNow(),
});
