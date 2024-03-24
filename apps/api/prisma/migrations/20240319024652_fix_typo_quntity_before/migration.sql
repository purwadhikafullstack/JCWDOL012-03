/*
  Warnings:

  - You are about to drop the column `quntityBefore` on the `stockjournal` table. All the data in the column will be lost.
  - Added the required column `quantityBefore` to the `StockJournal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `stockjournal` DROP COLUMN `quntityBefore`,
    ADD COLUMN `quantityBefore` INTEGER NOT NULL;
