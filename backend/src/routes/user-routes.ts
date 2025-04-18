import { Request, Response, Router } from "express";
import { prisma } from "../prismaInstance";
import { tokenValidation } from "../middlewares/tokenValidation";
import { infoUpdateSchema } from "../zod";
import { userInfoUpdateSchema } from "@om_wadhi/validation";

const router = Router();
type UserUpdate = {
  username: string;
  email ?: string;
};

// GET /users/:id - Retrieve user profile

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        username: true,
        email: true,
      },
    });
    res.status(200).json({ msg: "User fetched Successfully", user });
    return;
  } catch (error) {
    res.status(500).json({ msg: "Error while retreiving user Information" });
    return;
  }
});

// PUT /users/:id - Update user profile
router.put(
  "/:id",
  tokenValidation,
  infoUpdateSchema(userInfoUpdateSchema),
  async (req: Request, res: Response) => {
    try {
      // here we are allowing user to update their email which is uniquely identified by db but we make sure that whichever new email is submitted should not already exist in db
      const userId = req.params?.id;
      const dataToUpdate = req.body as UserUpdate;
      const result = await prisma.$transaction(async (tsx) => {
        const existingEmail = await tsx.user.findUnique({
          where: {
            id: userId,
            email : dataToUpdate.email,
          },
        });
        if (existingEmail) {
          return false;
        }
        const userUpdate = await tsx.user.updateMany({
          where: {
            id: userId,
          },
          data: {
            username: dataToUpdate.username,
            email: dataToUpdate.email,
          },
        });
        return true;
      });

      if (!result) {
        // this doesn't mean that we invalidate user or log them out just pass a warning/alert that this email already exist in db please try diff email.
        res
          .status(409)
          .json({ msg: "Email already exist.Please try a diff one." });
        return;
      }
      res.status(200).json({ msg: "User info update successfully!" });
      return;
    } catch (error) {
      res.status(500).json({ msg: "Error while updating user info" });
      return;
    }
  }
);

export { router };
