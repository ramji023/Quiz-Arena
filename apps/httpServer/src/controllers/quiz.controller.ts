import { Request, Response } from "express";
import { quizFormValidation } from "../validations/quizForm.validation";
import ApiError from "../utils/customError";
import { createNewQuiz } from "../models/quiz.model";

export async function createQuiz(req: Request, res: Response) {
  const id = req.user;
  const data = req.body;
  console.log("quiz form data : ", data);
  const parsedBodyObject = quizFormValidation.safeParse(data);

  if (!parsedBodyObject.success) {
    throw new ApiError(
      parsedBodyObject.error.issues[0]?.message ??
        "Quiz Form Validation Failed",
      404
    );
  }

  console.log("parsed quiz form data : ", parsedBodyObject.data);

  const quizData = await createNewQuiz({
    ...parsedBodyObject.data,
    userId: id,
  });
  if (!quizData) {
    throw new ApiError("Something went wrong while creating quiz", 404);
  }

  console.log("quiz data : ", quizData);
  return res.json({ message: "You have created new Quiz Successfully" });
}

export function getAllQuiz() {}

export function getSingleQuiz() {}

export function deleteQuiz() {}

export function updateQuiz() {}
