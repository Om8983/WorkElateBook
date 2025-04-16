import { Request, Response, Router } from "express";
import { prisma } from "../prismaInstance";
import { tokenValidation } from "../middlewares/tokenValidation";
import jwt from "jsonwebtoken";
import { bookSchemaValidate } from "../zod";
import { newBookSchema } from "@om_wadhi/validation";
import { Genre } from "../../app/generated/prisma/client";
const router = Router();

type DecodedData = {
  id: string;
  email: string;
  role: string;
};
type NewBook = {
  bookName: string;
  bookImage: string;
  author: string;
  brief: string;
  description: string;
  rating: number;
  Genre: Genre;
};
// GET /books - Retrieve all books (with pagination)
router.get("/", async (req: Request, res: Response) => {
  try {
    const books = await prisma.book.findMany({
      select: {
        id: true,
        bookName: true,
        bookImage: true,
        brief: true,
        author: true,
        Genre: true,
      },
    });
    res.status(200).json({ msg: "Fetched Books successfully", books });
  } catch (error) {
    res.status(500).json({ msg: "Error fetching books" });
    return;
  }
});

// GET /books/:id - Retrieve a specific book
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    const book = await prisma.book.findUnique({
      where: {
        id: bookId,
      },
      select: {
        bookName: true,
        bookImage: true,
        description: true,
        author: true,
        rating: true,
        Genre: true,
        Review: {
          select: {
            review: true,
            user: {
              select: {
                username: true,
              },
            },
          },
        },
      },
    });
    if (!book) {
      res.status(400).json({ msg: "No such book exist" });
      return;
    }
    res.status(200).json({ msg: "Fetch success", book });
  } catch (error) {
    res.status(500).json({ msg: "Error fetching books" });
    return;
  }
});

// POST /books - Add a new book (admin only)
router.post(
  "/",
  tokenValidation,
  bookSchemaValidate(newBookSchema),
  async (req: Request, res: Response) => {
    try {
      const { accessToken } = req.cookies;

      const decoded = jwt.decode(accessToken) as DecodedData;
      if (decoded.role !== "User") {
        res.status(400).json({ msg: "Unknown user detected!" });
        return;
      }
      const bookDetails = req.body as NewBook;
      const newBook = await prisma.book.create({
        data: {
          bookName: bookDetails.bookName,
          bookImage: bookDetails.bookImage,
          author: bookDetails.author,
          description: bookDetails.description,
          brief: bookDetails.brief,
          Genre: bookDetails.Genre,
        },
      });
      res.status(200).json({ msg: "Book Added Successfully" });
    } catch (error) {
      res.status(500).json({ msg: "error adding a new book" });
      return;
    }
  }
);
export { router };
