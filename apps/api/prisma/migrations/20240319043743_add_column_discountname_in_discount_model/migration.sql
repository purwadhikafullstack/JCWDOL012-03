/*
  Warnings:

  - Added the required column `discountName` to the `Discount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `discount` ADD COLUMN `discountName` VARCHAR(191) NOT NULL;
