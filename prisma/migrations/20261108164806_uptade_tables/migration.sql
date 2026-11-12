-- CreateTable
CREATE TABLE "CarInspectionItem" (
    "id" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "required" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "CarInspectionItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CarInspectionItem_vehicleId_itemId_key" ON "CarInspectionItem"("vehicleId", "itemId");

-- AddForeignKey
ALTER TABLE "CarInspectionItem" ADD CONSTRAINT "CarInspectionItem_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "cars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarInspectionItem" ADD CONSTRAINT "CarInspectionItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "InspectionItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
