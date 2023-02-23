-- CreateTable
CREATE TABLE "GrowthData" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "followers" INTEGER NOT NULL,
    "likes" INTEGER NOT NULL,
    "comments" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GrowthData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GrowthData_userId_key" ON "GrowthData"("userId");

-- AddForeignKey
ALTER TABLE "GrowthData" ADD CONSTRAINT "GrowthData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
