-- DropForeignKey
ALTER TABLE "RatingChange" DROP CONSTRAINT "RatingChange_user_fkey";

-- AddForeignKey
ALTER TABLE "RatingChange" ADD CONSTRAINT "RatingChange_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
