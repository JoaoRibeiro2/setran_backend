-- CreateEnum
CREATE TYPE "FuelStatus" AS ENUM ('YES', 'NOT');

-- AlterTable
ALTER TABLE "trips"
ADD COLUMN "fuel" "FuelStatus" NOT NULL DEFAULT 'NOT';