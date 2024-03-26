/*
  Warnings:

  - Added the required column `status` to the `Discount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `discount` ADD COLUMN `status` BOOLEAN NOT NULL;
