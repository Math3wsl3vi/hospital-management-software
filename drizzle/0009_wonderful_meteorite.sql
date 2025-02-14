CREATE TYPE "public"."blood_group" AS ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-');--> statement-breakpoint
CREATE TYPE "public"."payment_preference" AS ENUM('Mpesa', 'Insurance', 'Credit Card');--> statement-breakpoint
ALTER TABLE "patients" ALTER COLUMN "blood_group" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "patients" ALTER COLUMN "payment_preference" SET NOT NULL;