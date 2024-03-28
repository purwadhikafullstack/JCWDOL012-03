/*
  Warnings:

  - You are about to drop the column `url` on the `image` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_imageId_fkey`;

-- AlterTable
ALTER TABLE `image` DROP COLUMN `url`,
    ADD COLUMN `productId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
