/*
  Warnings:

  - Added the required column `usage` to the `Discount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `discount` ADD COLUMN `usage` BOOLEAN NOT NULL;
