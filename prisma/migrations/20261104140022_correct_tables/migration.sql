/*
  Warnings:

  - You are about to drop the column `fuel` on the `trips` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "trips" DROP COLUMN "fuel",
ADD COLUMN     "Fuel" "FuelStatus" NOT NULL DEFAULT 'NOT';
