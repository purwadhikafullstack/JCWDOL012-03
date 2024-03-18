/*
  Warnings:

  - Added the required column `url` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Product_imageId_fkey` ON `product`;

-- AlterTable
ALTER TABLE `image` ADD COLUMN `url` VARCHAR(191) NOT NULL;
