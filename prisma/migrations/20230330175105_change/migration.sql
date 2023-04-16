-- AlterTable
ALTER TABLE `access` MODIFY `last_access` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `address` MODIFY `updated_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `enrollments` MODIFY `updated_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `students` MODIFY `updated_at` DATETIME(3) NULL;
