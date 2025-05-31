/*
  Warnings:

  - You are about to drop the `_EventToTopic` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_event_participants` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `events` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_EventToTopic" DROP CONSTRAINT "_EventToTopic_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventToTopic" DROP CONSTRAINT "_EventToTopic_B_fkey";

-- DropForeignKey
ALTER TABLE "_event_participants" DROP CONSTRAINT "_event_participants_A_fkey";

-- DropForeignKey
ALTER TABLE "_event_participants" DROP CONSTRAINT "_event_participants_B_fkey";

-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_organizer_id_fkey";

-- DropTable
DROP TABLE "_EventToTopic";

-- DropTable
DROP TABLE "_event_participants";

-- DropTable
DROP TABLE "events";
