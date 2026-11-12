-- CreateEnum
CREATE TYPE "InspectionType" AS ENUM ('START', 'END');

-- CreateEnum
CREATE TYPE "InspectionCondition" AS ENUM ('GOOD', 'ATTENTION', 'DAMAGED', 'NOT_CHECKED');

-- CreateTable
CREATE TABLE "InspectionItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "InspectionItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TripInspection" (
    "id" TEXT NOT NULL,
    "trip_id" TEXT NOT NULL,
    "type" "InspectionType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TripInspection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TripInspectionItem" (
    "id" TEXT NOT NULL,
    "inspectionId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "condition" "InspectionCondition" NOT NULL,
    "observation" TEXT,

    CONSTRAINT "TripInspectionItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TripInspection_trip_id_type_key" ON "TripInspection"("trip_id", "type");

-- CreateIndex
CREATE UNIQUE INDEX "TripInspectionItem_inspectionId_itemId_key" ON "TripInspectionItem"("inspectionId", "itemId");

-- AddForeignKey
ALTER TABLE "TripInspection" ADD CONSTRAINT "TripInspection_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "trips"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripInspectionItem" ADD CONSTRAINT "TripInspectionItem_inspectionId_fkey" FOREIGN KEY ("inspectionId") REFERENCES "TripInspection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripInspectionItem" ADD CONSTRAINT "TripInspectionItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "InspectionItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
