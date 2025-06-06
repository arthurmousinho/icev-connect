/*
  Warnings:

  - You are about to drop the `_ArticleToTopic` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `topic_id` to the `articles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ArticleToTopic" DROP CONSTRAINT "_ArticleToTopic_A_fkey";

-- DropForeignKey
ALTER TABLE "_ArticleToTopic" DROP CONSTRAINT "_ArticleToTopic_B_fkey";

-- AlterTable
ALTER TABLE "articles" ADD COLUMN     "topic_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "_ArticleToTopic";

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "articles_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "topics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
