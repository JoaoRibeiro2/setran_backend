/*
  Warnings:

  - You are about to drop the `CarInspectionItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InspectionItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TripInspection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TripInspectionItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CarInspectionItem" DROP CONSTRAINT "CarInspectionItem_itemId_fkey";

-- DropForeignKey
ALTER TABLE "CarInspectionItem" DROP CONSTRAINT "CarInspectionItem_vehicleId_fkey";

-- DropForeignKey
ALTER TABLE "TripInspection" DROP CONSTRAINT "TripInspection_trip_id_fkey";

-- DropForeignKey
ALTER TABLE "TripInspectionItem" DROP CONSTRAINT "TripInspectionItem_inspectionId_fkey";

-- DropForeignKey
ALTER TABLE "TripInspectionItem" DROP CONSTRAINT "TripInspectionItem_itemId_fkey";

-- DropTable
DROP TABLE "CarInspectionItem";

-- DropTable
DROP TABLE "InspectionItem";

-- DropTable
DROP TABLE "TripInspection";

-- DropTable
DROP TABLE "TripInspectionItem";

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarItems" (
    "id" TEXT NOT NULL,
    "car_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "status" "InspectionCondition" NOT NULL DEFAULT 'GOOD',

    CONSTRAINT "CarItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InspectionItems" (
    "id" TEXT NOT NULL,
    "id_item" TEXT NOT NULL,
    "id_cars" TEXT NOT NULL,

    CONSTRAINT "InspectionItems_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CarItems" ADD CONSTRAINT "CarItems_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarItems" ADD CONSTRAINT "CarItems_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InspectionItems" ADD CONSTRAINT "InspectionItems_id_item_fkey" FOREIGN KEY ("id_item") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
