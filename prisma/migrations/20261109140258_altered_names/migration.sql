/*
  Warnings:

  - You are about to drop the `CarItems` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InspectionItems` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Item` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CarItems" DROP CONSTRAINT "CarItems_car_id_fkey";

-- DropForeignKey
ALTER TABLE "CarItems" DROP CONSTRAINT "CarItems_item_id_fkey";

-- DropForeignKey
ALTER TABLE "InspectionItems" DROP CONSTRAINT "InspectionItems_id_item_fkey";

-- DropTable
DROP TABLE "CarItems";

-- DropTable
DROP TABLE "InspectionItems";

-- DropTable
DROP TABLE "Item";

-- CreateTable
CREATE TABLE "item" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cars_item" (
    "id" TEXT NOT NULL,
    "car_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "status" "InspectionCondition" NOT NULL DEFAULT 'GOOD',

    CONSTRAINT "cars_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inspection_items" (
    "id" TEXT NOT NULL,
    "id_item" TEXT NOT NULL,
    "id_cars" TEXT NOT NULL,

    CONSTRAINT "inspection_items_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cars_item" ADD CONSTRAINT "cars_item_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cars_item" ADD CONSTRAINT "cars_item_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspection_items" ADD CONSTRAINT "inspection_items_id_item_fkey" FOREIGN KEY ("id_item") REFERENCES "item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
