/*
  Warnings:

  - The primary key for the `RatingChange` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[uuid]` on the table `RatingChange` will be added. If there are existing duplicate values, this will fail.
  - The required column `uuid` was added to the `RatingChange` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "RatingChange" DROP CONSTRAINT "RatingChange_pkey",
ADD COLUMN     "uuid" TEXT NOT NULL,
ADD CONSTRAINT "RatingChange_pkey" PRIMARY KEY ("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "RatingChange_uuid_key" ON "RatingChange"("uuid");
