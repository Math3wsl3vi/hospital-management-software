ALTER TABLE "patients" DROP CONSTRAINT "patients_phone_unique";--> statement-breakpoint
ALTER TABLE "patients" DROP CONSTRAINT "patients_insurance_number_unique";--> statement-breakpoint
ALTER TABLE "patients" ALTER COLUMN "first_name" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "patients" ALTER COLUMN "middle_name" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "patients" ALTER COLUMN "last_name" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "patients" ALTER COLUMN "email" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "patients" ALTER COLUMN "email" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "patients" ALTER COLUMN "insurance_provider" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "patients" ADD COLUMN "date_of_birth" date NOT NULL;--> statement-breakpoint
ALTER TABLE "patients" ADD COLUMN "gender" "gender" NOT NULL;--> statement-breakpoint
ALTER TABLE "patients" ADD COLUMN "national_id" varchar(20) NOT NULL;--> statement-breakpoint
ALTER TABLE "patients" ADD COLUMN "phone_number" varchar(15) NOT NULL;--> statement-breakpoint
ALTER TABLE "patients" ADD COLUMN "residential_address" text;--> statement-breakpoint
ALTER TABLE "patients" ADD COLUMN "blood_group" "blood_group";--> statement-breakpoint
ALTER TABLE "patients" ADD COLUMN "allergies" text;--> statement-breakpoint
ALTER TABLE "patients" ADD COLUMN "chronic_conditions" text;--> statement-breakpoint
ALTER TABLE "patients" ADD COLUMN "current_medications" text;--> statement-breakpoint
ALTER TABLE "patients" ADD COLUMN "past_medical_history" text;--> statement-breakpoint
ALTER TABLE "patients" ADD COLUMN "family_medical_history" text;--> statement-breakpoint
ALTER TABLE "patients" ADD COLUMN "insurance_policy_number" varchar(50);--> statement-breakpoint
ALTER TABLE "patients" ADD COLUMN "nhif_number" varchar(20);--> statement-breakpoint
ALTER TABLE "patients" ADD COLUMN "payment_preference" "payment_preference";--> statement-breakpoint
ALTER TABLE "patients" ADD COLUMN "registration_date" date DEFAULT now();--> statement-breakpoint
ALTER TABLE "patients" DROP COLUMN "rank";--> statement-breakpoint
ALTER TABLE "patients" DROP COLUMN "unit";--> statement-breakpoint
ALTER TABLE "patients" DROP COLUMN "phone";--> statement-breakpoint
ALTER TABLE "patients" DROP COLUMN "secondary_phone";--> statement-breakpoint
ALTER TABLE "patients" DROP COLUMN "sex";--> statement-breakpoint
ALTER TABLE "patients" DROP COLUMN "dob";--> statement-breakpoint
ALTER TABLE "patients" DROP COLUMN "blood_type";--> statement-breakpoint
ALTER TABLE "patients" DROP COLUMN "marital_status";--> statement-breakpoint
ALTER TABLE "patients" DROP COLUMN "home_address";--> statement-breakpoint
ALTER TABLE "patients" DROP COLUMN "county";--> statement-breakpoint
ALTER TABLE "patients" DROP COLUMN "city";--> statement-breakpoint
ALTER TABLE "patients" DROP COLUMN "postal_code";--> statement-breakpoint
ALTER TABLE "patients" DROP COLUMN "emergency_name";--> statement-breakpoint
ALTER TABLE "patients" DROP COLUMN "emergency_relation";--> statement-breakpoint
ALTER TABLE "patients" DROP COLUMN "emergency_phone";--> statement-breakpoint
ALTER TABLE "patients" DROP COLUMN "emergency_email";--> statement-breakpoint
ALTER TABLE "patients" DROP COLUMN "insurance_number";--> statement-breakpoint
ALTER TABLE "patients" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "patients" ADD CONSTRAINT "patients_national_id_unique" UNIQUE("national_id");--> statement-breakpoint
ALTER TABLE "patients" ADD CONSTRAINT "patients_phone_number_unique" UNIQUE("phone_number");--> statement-breakpoint
ALTER TABLE "patients" ADD CONSTRAINT "patients_nhif_number_unique" UNIQUE("nhif_number");