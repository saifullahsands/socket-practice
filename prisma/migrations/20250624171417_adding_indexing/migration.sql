/*
  Warnings:

  - You are about to drop the `groupuser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `group` DROP FOREIGN KEY `Group_creator_id_fkey`;

-- DropForeignKey
ALTER TABLE `groupuser` DROP FOREIGN KEY `GroupUser_group_id_fkey`;

-- DropForeignKey
ALTER TABLE `groupuser` DROP FOREIGN KEY `GroupUser_user_id_fkey`;

-- DropTable
DROP TABLE `groupuser`;

-- CreateTable
CREATE TABLE `group_user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `group_id` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `joined_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `group_user_group_id_user_id_key`(`group_id`, `user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `User_email_idx` ON `User`(`email`);

-- AddForeignKey
ALTER TABLE `group` ADD CONSTRAINT `group_creator_id_fkey` FOREIGN KEY (`creator_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `group_user` ADD CONSTRAINT `group_user_group_id_fkey` FOREIGN KEY (`group_id`) REFERENCES `group`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `group_user` ADD CONSTRAINT `group_user_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
