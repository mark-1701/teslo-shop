/*
  Warnings:

  - You are about to drop the column `productImageId` on the `Product` table. All the data in the column will be lost.
  - Added the required column `productId` to the `ProductImage` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_productImageId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "productImageId";

-- AlterTable
ALTER TABLE "ProductImage" ADD COLUMN     "productId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ProductImage" ADD CONSTRAINT "ProductImage_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
