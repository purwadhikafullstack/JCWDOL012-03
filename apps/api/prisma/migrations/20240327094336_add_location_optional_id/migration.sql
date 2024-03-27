-- DropForeignKey
ALTER TABLE `location` DROP FOREIGN KEY `Location_addressId_fkey`;

-- DropForeignKey
ALTER TABLE `location` DROP FOREIGN KEY `Location_storeId_fkey`;

-- AlterTable
ALTER TABLE `location` MODIFY `addressId` INTEGER NULL,
    MODIFY `storeId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Location` ADD CONSTRAINT `Location_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `Address`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Location` ADD CONSTRAINT `Location_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Store`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
