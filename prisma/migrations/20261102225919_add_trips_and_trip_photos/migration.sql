-- CreateEnum
CREATE TYPE "TripStatus" AS ENUM ('IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "trips" (
    "id" TEXT NOT NULL,
    "km_initial" INTEGER NOT NULL,
    "km_final" INTEGER,
    "description" TEXT,
    "status" "TripStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "car_id" TEXT NOT NULL,
    "user_register" VARCHAR(5) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "trips_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trip_photos" (
    "id" TEXT NOT NULL,
    "path" VARCHAR(500) NOT NULL,
    "trip_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "trip_photos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "trips_car_id_idx" ON "trips"("car_id");

-- CreateIndex
CREATE INDEX "trips_user_register_idx" ON "trips"("user_register");

-- CreateIndex
CREATE INDEX "trip_photos_trip_id_idx" ON "trip_photos"("trip_id");

-- AddForeignKey
ALTER TABLE "trips" ADD CONSTRAINT "trips_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trips" ADD CONSTRAINT "trips_user_register_fkey" FOREIGN KEY ("user_register") REFERENCES "users"("register") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trip_photos" ADD CONSTRAINT "trip_photos_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "trips"("id") ON DELETE CASCADE ON UPDATE CASCADE;
