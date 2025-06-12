-- AlterTable
ALTER TABLE "articles" ADD COLUMN     "likes_count" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "article_likes" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "article_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "article_likes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "article_likes_user_id_article_id_key" ON "article_likes"("user_id", "article_id");

-- AddForeignKey
ALTER TABLE "article_likes" ADD CONSTRAINT "article_likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_likes" ADD CONSTRAINT "article_likes_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
