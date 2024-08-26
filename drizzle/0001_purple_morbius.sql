DO $$ BEGIN
 CREATE TYPE "public"."SoundSystem" AS ENUM('MONO', 'STEREO', 'DOLBY_ATMOS', 'DOLBY_DIGITAL', 'DTS', 'IMAX_ENHANCED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."projection" AS ENUM('STANDARD', 'IMAX', 'DOLBY_CINEMA', 'IMAX_3D');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "address" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"address_line_1" varchar(255) NOT NULL,
	"lat" numeric NOT NULL,
	"lng" numeric NOT NULL,
	"cinema_id" varchar(255) NOT NULL,
	CONSTRAINT "address_cinema_id_unique" UNIQUE("cinema_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cinema" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "screen" (
	"screen_id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"name" varchar(255) NOT NULL,
	"screen_number" integer NOT NULL,
	"cinema_id" serial NOT NULL,
	"projection" "projection",
	"SoundSystem" "SoundSystem",
	"price" real DEFAULT 200,
	CONSTRAINT "screen_screen_number_unique" UNIQUE("screen_number")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "seat" (
	"seat_id" serial PRIMARY KEY NOT NULL,
	"row" integer NOT NULL,
	"column" integer NOT NULL,
	"cinema_id" serial NOT NULL
);
--> statement-breakpoint
ALTER TABLE "admin" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "admin" ALTER COLUMN "user_id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "manager" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "manager" ALTER COLUMN "user_id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "manager" ADD COLUMN "cinema_id" varchar(255);--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "external_id" varchar(255) NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "address" ADD CONSTRAINT "address_cinema_id_cinema_id_fk" FOREIGN KEY ("cinema_id") REFERENCES "public"."cinema"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "screen" ADD CONSTRAINT "screen_cinema_id_cinema_id_fk" FOREIGN KEY ("cinema_id") REFERENCES "public"."cinema"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "seat" ADD CONSTRAINT "seat_cinema_id_screen_screen_id_fk" FOREIGN KEY ("cinema_id") REFERENCES "public"."screen"("screen_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "seat_index" ON "seat" ("row","column","cinema_id");--> statement-breakpoint
ALTER TABLE "admin" ADD CONSTRAINT "admin_user_id_unique" UNIQUE("user_id");--> statement-breakpoint
ALTER TABLE "manager" ADD CONSTRAINT "manager_user_id_unique" UNIQUE("user_id");--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_external_id_unique" UNIQUE("external_id");