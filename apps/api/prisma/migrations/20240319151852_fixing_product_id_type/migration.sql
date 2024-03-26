-- DropForeignKey
ALTER TABLE `discount` DROP FOREIGN KEY `Discount_productId_fkey`;

-- AlterTable
ALTER TABLE `discount` MODIFY `productId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Discount` ADD CONSTRAINT `Discount_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
