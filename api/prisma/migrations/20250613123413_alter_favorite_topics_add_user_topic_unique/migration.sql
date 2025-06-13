/*
  Warnings:

  - A unique constraint covering the columns `[user_id,topic_id]` on the table `favorite_topics` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "favorite_topics_user_id_topic_id_key" ON "favorite_topics"("user_id", "topic_id");
