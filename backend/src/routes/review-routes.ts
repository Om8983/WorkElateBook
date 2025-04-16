import { Request, Response, Router } from "express";
import { prisma } from "../prismaInstance";
import { tokenValidation } from "../middlewares/tokenValidation";
import jwt from "jsonwebtoken";
const router = Router();

type DecodedData = {
  id: string;
  email: string;
  role: string;
};
// GET /reviews - Retrieve reviews for a book
// so we have to retreive the review for particular book selected by the user.
// along with retreiving book review we also have to retreive the reviewer's username
router.get("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.query.bookId;
    const reviews = await prisma.review.findMany({
      where: {
        bookId: bookId as string,
      },
      select: {
        review: true,
      },
    });
    res.status(200).json({ msg: "Reviews fetched", reviews });
  } catch (error) {
    res.status(500).json({ msg: "Error while fetching book reviews" });
  }
});

// POST /reviews - Submit a new review
// For this reason we have marked bookId and userId as unique so no one user can write multiple reviews for a single book
router.post(
  "/:bookId",
  tokenValidation,
  async (req: Request, res: Response) => {
    try {
      const { accessToken } = req.cookies;
      const decoded = jwt.decode(accessToken) as DecodedData;
      const userId = decoded.id;

      const { bookId } = req.params;
      const { review } = req.body;

      const newReview = await prisma.review.create({
        data: {
          bookId: bookId,
          userId,
          review: review,
        },
      });
      res.status(200).json({ msg: "review added successfully", newReview });
      return;
    } catch (error) {
      res.status(500).json({ msg: "Unable to post Review!" });
      console.log(error);
      return;
    }
  }
);

export { router };
