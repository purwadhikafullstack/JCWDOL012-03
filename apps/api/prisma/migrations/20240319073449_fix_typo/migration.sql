/*
  Warnings:

  - You are about to drop the column `minPurchaseAmout` on the `discount` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `discount` DROP COLUMN `minPurchaseAmout`,
    ADD COLUMN `minPurchaseAmount` INTEGER NULL;
