ALTER TABLE "doctors" ADD COLUMN "email" text NOT NULL;--> statement-breakpoint
ALTER TABLE "doctors" ADD COLUMN "home_address" text;--> statement-breakpoint
ALTER TABLE "doctors" ADD COLUMN "dob" date NOT NULL;--> statement-breakpoint
ALTER TABLE "doctors" ADD CONSTRAINT "doctors_email_unique" UNIQUE("email");