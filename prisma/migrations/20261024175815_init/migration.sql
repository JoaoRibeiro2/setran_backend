-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "UserPosition" AS ENUM ('TRAFFIC_AGENT', 'OPERATIONS_AGENT');

-- CreateEnum
CREATE TYPE "CarType" AS ENUM ('CAR', 'MOTORCYCLE', 'PICKUP');

-- CreateEnum
CREATE TYPE "CarStatus" AS ENUM ('AVAILABLE', 'IN_USE', 'MAINTENANCE');

-- CreateEnum
CREATE TYPE "DayReportStatus" AS ENUM ('IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "users" (
    "register" VARCHAR(5) NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "photo" VARCHAR(500),
    "email" VARCHAR(255),
    "position" "UserPosition" NOT NULL DEFAULT 'TRAFFIC_AGENT',
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("register")
);

-- CreateTable
CREATE TABLE "cars" (
    "id" TEXT NOT NULL,
    "type" "CarType" NOT NULL DEFAULT 'CAR',
    "marca" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "plate" VARCHAR(7) NOT NULL,
    "km_current" INTEGER NOT NULL,

    CONSTRAINT "cars_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
