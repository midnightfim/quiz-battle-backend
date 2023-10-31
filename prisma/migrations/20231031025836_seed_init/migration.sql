-- CreateTable
CREATE TABLE "Battle" (
    "battle_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ended_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Battle_pkey" PRIMARY KEY ("battle_id")
);

-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 1000,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_banned" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "RatingChange" (
    "battle" INTEGER NOT NULL,
    "placement" INTEGER NOT NULL,
    "change" INTEGER NOT NULL,
    "user" TEXT NOT NULL,

    CONSTRAINT "RatingChange_pkey" PRIMARY KEY ("battle")
);

-- CreateTable
CREATE TABLE "_BattleToUser" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_user_id_key" ON "User"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_BattleToUser_AB_unique" ON "_BattleToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_BattleToUser_B_index" ON "_BattleToUser"("B");

-- AddForeignKey
ALTER TABLE "RatingChange" ADD CONSTRAINT "RatingChange_battle_fkey" FOREIGN KEY ("battle") REFERENCES "Battle"("battle_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RatingChange" ADD CONSTRAINT "RatingChange_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BattleToUser" ADD CONSTRAINT "_BattleToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Battle"("battle_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BattleToUser" ADD CONSTRAINT "_BattleToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
