/*
  Warnings:

  - Added the required column `Genre` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Genre" AS ENUM ('Fiction', 'NonFiction', 'Thriller', 'Drama', 'Autobiography');

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "Genre" "Genre" NOT NULL;
