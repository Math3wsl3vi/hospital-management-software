ALTER TABLE "doctors" ADD COLUMN "national_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "doctors" ADD COLUMN "license_number" text NOT NULL;--> statement-breakpoint
ALTER TABLE "doctors" ADD COLUMN "gender" text NOT NULL;--> statement-breakpoint
ALTER TABLE "doctors" ADD COLUMN "experience" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "doctors" ADD COLUMN "emergency_contact" text NOT NULL;--> statement-breakpoint
ALTER TABLE "doctors" ADD COLUMN "working_hours" text NOT NULL;--> statement-breakpoint
ALTER TABLE "doctors" ADD COLUMN "status" text DEFAULT 'Active';--> statement-breakpoint
ALTER TABLE "doctors" ADD COLUMN "profile_image" text;--> statement-breakpoint
ALTER TABLE "doctors" ADD COLUMN "department" text NOT NULL;--> statement-breakpoint
ALTER TABLE "doctors" ADD COLUMN "nationality" text NOT NULL;--> statement-breakpoint
ALTER TABLE "doctors" ADD COLUMN "languages" text NOT NULL;--> statement-breakpoint
ALTER TABLE "doctors" ADD COLUMN "bio" text;--> statement-breakpoint
ALTER TABLE "doctors" ADD COLUMN "insurance_accepted" text NOT NULL;--> statement-breakpoint
ALTER TABLE "doctors" ADD CONSTRAINT "doctors_national_id_unique" UNIQUE("national_id");--> statement-breakpoint
ALTER TABLE "doctors" ADD CONSTRAINT "doctors_license_number_unique" UNIQUE("license_number");