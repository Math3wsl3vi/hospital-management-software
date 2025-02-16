import { serial, text, integer, timestamp, date, pgEnum, varchar, pgTable} from "drizzle-orm/pg-core";

export const bloodGroupEnum = pgEnum("blood_group", ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]);
export const genderEnum = pgEnum("gender", ["Male", "Female"]);
export const paymentEnum = pgEnum("payment_preference", ["Mpesa", "Insurance","Credit Card"]);
export const maritalStatusEnum = pgEnum("marital_status", ["Married", "Single","Divorced", "Widowed"]);


// Patients Table
export const patients = pgTable("patients", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 50 }).notNull(),
  middleName: varchar("middle_name", { length: 50 }),
  lastName: varchar("last_name", { length: 50 }).notNull(),
  dateOfBirth: date("date_of_birth").notNull(),
  gender: genderEnum("gender").notNull(),
  maritalStatus: maritalStatusEnum("marital_status").notNull(),
  nationalId: varchar("national_id", { length: 20 }).unique().notNull(),
  phoneNumber: varchar("phone_number", { length: 15 }).unique().notNull(),
  email: varchar("email", { length: 100 }).unique(),
  residentialAddress: text("residential_address"),
  bloodGroup: bloodGroupEnum("blood_group").notNull(),
  allergies: text("allergies"),
  emergencyName: text("emergency_name"),
  emergencyContact: text("emergency_contact"),
  emergencyRelationship: text("emergency_relationship"),
  chronicConditions: text("chronic_conditions"),
  currentMedications: text("current_medications"),
  pastMedicalHistory: text("past_medical_history"),
  nextOfKin: text("next_of_kin"),
  nextOfKinRelationship: text("next_of_kin_relationship"),
  nextOfKinContact: text("next_of_kin_contact"),
  familyMedicalHistory: text("family_medical_history"),
  insuranceProvider: varchar("insurance_provider", { length: 100 }),
  insurancePolicyNumber: varchar("insurance_policy_number", { length: 50 }),
  nhifNumber: varchar("nhif_number", { length: 20 }).unique(),
  paymentPreference: paymentEnum("payment_preference").notNull(),
  registrationDate: date("registration_date").defaultNow(),
}
);



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
