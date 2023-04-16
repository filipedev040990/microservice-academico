/*
  Warnings:

  - You are about to drop the column `cpf` on the `students` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[document]` on the table `students` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `document` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `students_cpf_key` ON `students`;

-- AlterTable
ALTER TABLE `students` DROP COLUMN `cpf`,
    ADD COLUMN `document` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `students_document_key` ON `students`(`document`);
