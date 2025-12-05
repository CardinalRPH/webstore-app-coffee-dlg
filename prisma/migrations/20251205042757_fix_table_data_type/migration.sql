/*
  Warnings:

  - The primary key for the `Order` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `totalPrice` on the `Order` table. All the data in the column will be lost.
  - You are about to alter the column `status` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(2))`.
  - You are about to drop the column `categoryId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `origin` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `roastLevel` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `weightGram` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[phone]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `CartItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `CartItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethod` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingAddress` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingCost` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtotal` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalAmount` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthDate` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `OrderItem` DROP FOREIGN KEY `OrderItem_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_categoryId_fkey`;

-- DropIndex
DROP INDEX `OrderItem_orderId_fkey` ON `OrderItem`;

-- DropIndex
DROP INDEX `Product_categoryId_fkey` ON `Product`;

-- DropIndex
DROP INDEX `Product_slug_key` ON `Product`;

-- AlterTable
ALTER TABLE `CartItem` ADD COLUMN `imageUrl` VARCHAR(191) NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `price` INTEGER NOT NULL,
    ADD COLUMN `variant` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Order` DROP PRIMARY KEY,
    DROP COLUMN `createdAt`,
    DROP COLUMN `totalPrice`,
    ADD COLUMN `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `paymentMethod` VARCHAR(191) NOT NULL,
    ADD COLUMN `shippingAddress` JSON NOT NULL,
    ADD COLUMN `shippingCost` INTEGER NOT NULL,
    ADD COLUMN `subtotal` INTEGER NOT NULL,
    ADD COLUMN `totalAmount` INTEGER NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `status` ENUM('PENDING', 'PROCESS', 'SHIPPED', 'COMPLETED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `OrderItem` ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `variant` VARCHAR(191) NULL,
    MODIFY `orderId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `categoryId`,
    DROP COLUMN `image`,
    DROP COLUMN `origin`,
    DROP COLUMN `roastLevel`,
    DROP COLUMN `slug`,
    DROP COLUMN `weightGram`,
    ADD COLUMN `category` ENUM('COFFEE', 'ACCESSORY') NOT NULL DEFAULT 'COFFEE',
    ADD COLUMN `imageUrl` VARCHAR(191) NULL,
    ADD COLUMN `rating` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `reviewCount` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `description` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `createdAt`,
    ADD COLUMN `birthDate` DATETIME(3) NOT NULL,
    ADD COLUMN `joinDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `phone` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Category`;

-- CreateTable
CREATE TABLE `CoffeeDetail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` INTEGER NOT NULL,
    `notes` JSON NOT NULL,
    `origin` VARCHAR(191) NOT NULL,
    `weight` VARCHAR(191) NOT NULL,
    `roastLevel` ENUM('Light', 'Medium', 'Dark') NOT NULL,
    `availableGrinds` JSON NOT NULL,

    UNIQUE INDEX `CoffeeDetail_productId_key`(`productId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AccessoryDetail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` INTEGER NOT NULL,
    `material` VARCHAR(191) NOT NULL,
    `features` JSON NOT NULL,
    `specs` JSON NOT NULL,

    UNIQUE INDEX `AccessoryDetail_productId_key`(`productId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Invoice` (
    `id` VARCHAR(191) NOT NULL,
    `orderId` VARCHAR(191) NOT NULL,
    `invoiceDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dueDate` DATETIME(3) NOT NULL,
    `customerName` VARCHAR(191) NOT NULL,
    `customerEmail` VARCHAR(191) NOT NULL,
    `billingAddress` VARCHAR(191) NOT NULL,
    `shippingAddress` VARCHAR(191) NOT NULL,
    `subtotal` INTEGER NOT NULL,
    `shippingCost` INTEGER NOT NULL,
    `taxRate` DOUBLE NOT NULL,
    `taxAmount` INTEGER NOT NULL,
    `totalAmount` INTEGER NOT NULL,
    `paymentMethod` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Invoice_orderId_key`(`orderId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InvoiceItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `invoiceId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `price` INTEGER NOT NULL,
    `variant` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_phone_key` ON `User`(`phone`);

-- AddForeignKey
ALTER TABLE `CoffeeDetail` ADD CONSTRAINT `CoffeeDetail_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AccessoryDetail` ADD CONSTRAINT `AccessoryDetail_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Invoice` ADD CONSTRAINT `Invoice_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InvoiceItem` ADD CONSTRAINT `InvoiceItem_invoiceId_fkey` FOREIGN KEY (`invoiceId`) REFERENCES `Invoice`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
