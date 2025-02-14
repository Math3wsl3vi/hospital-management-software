CREATE TYPE "public"."marital_status" AS ENUM('Married', 'Single', 'Divorced', 'Widowed');--> statement-breakpoint
ALTER TABLE "patients" ADD COLUMN "marital_status" "marital_status" NOT NULL;