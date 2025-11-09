import { Request, Response } from "express";
import { quizFormValidation } from "../validations/quizForm.validation";
import ApiError from "../utils/customError";
import { createNewQuiz, getAllQuizs } from "../models/quiz.model";
import quizGenerator from "../utils/quizGenerator";
import { cleanJson } from "../utils/helperFun";

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

export async function createAiQuiz(req: Request, res: Response) {
  console.log("data : ", req.body);
  const id = req.user;
  const { topic, difficulty, note, questions } = req.body;
  console.log(req.body);
  const quizResponse = await quizGenerator({
    topic,
    difficulty,
    note,
    questions,
  });
  console.log("quiz response : ", quizResponse);

  if (!quizResponse) {
    throw new ApiError(
      "Something went wrong while generation Ai powered wuiz",
      404
    );
  }
  const cleanedResponse = cleanJson(quizResponse);
  const quiz = JSON.parse(cleanedResponse);
  return res.json({ quiz: quiz, msg: "done" });
}

export async function getAllQuiz(req: Request, res: Response) {
  const response = await getAllQuizs();
  console.log("all quizzes data : ", response);
  return res.json({ data: response, message: "Fetch all the Quizzes" });
}

export function getSingleQuiz() {}

export function deleteQuiz() {}

export function updateQuiz() {}
