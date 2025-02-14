CREATE TYPE "public"."gender" AS ENUM('Male', 'Female');--> statement-breakpoint
ALTER TABLE "patients" ADD COLUMN "gender" "gender" NOT NULL;--> statement-breakpoint
ALTER TABLE "patients" DROP COLUMN "gender_enum";