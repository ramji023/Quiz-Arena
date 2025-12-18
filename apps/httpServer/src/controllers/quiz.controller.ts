import { Request, Response } from "express"; // import type of Request and Response from express
import { quizFormValidation } from "../validations/quizForm.validation"; // improt quiz form validation schema zod based
import ApiError from "../utils/customError"; // import custom ApiError class
import {
  allHostedQuizzes,
  allSavedQuizzes,
  allYourQuizzes,
  createNewQuiz,
  findHostQuizById,
  findQuizById,
  getAllQuizs,
} from "../models/quiz.model"; // import quiz model functions to interact with database
import quizGenerator from "../utils/quizGenerator"; // import quiz generator utility function
import { cleanJson } from "../utils/helperFun"; // import cleanJson helper function

// controller function to create a new Quiz
export async function createQuiz(req: Request, res: Response) {
  const id = req.user; // get user id from authhenticated request
  const data = req.body; // get quiz form data from request body
  // console.log("quiz form data : ", data); // log the quiz data from client

  // validate the quiz form data using zod schema
  const parsedBodyObject = quizFormValidation.safeParse(data);

  // if validation fails, throw custom error with validation message to the client
  if (!parsedBodyObject.success) {
    throw new ApiError(
      parsedBodyObject.error.issues[0]?.message ??
        "Quiz Form Validation Failed",
      404
    );
  }

  // console.log("parsed quiz form data : ", parsedBodyObject.data); // log the parsed and validated quiz form data

  // if validation is successfull, create new quiz in database using createNewQuiz model function
  const quizData = await createNewQuiz({
    ...parsedBodyObject.data,
    userId: id,
  });

  // if quiz creation fails throw custom error to the client
  if (!quizData) {
    throw new ApiError("Something went wrong while creating quiz", 404);
  }

  // console.log("quiz data : ", quizData); // log the created quiz
  // return success response to the client
  return res.json({ message: "You have created new Quiz Successfully" ,quizId:quizData.id});
}

// controller to create AI powered quiz
export async function createAiQuiz(req: Request, res: Response) {
  // console.log("data : ", req.body); // log the quiz data from client
  const id = req.user; // get user id from authenticated request
  const { topic, difficulty, note, questions } = req.body; // get quiz data from request body

  // call quizGenerator function to generate quiz using AI
  const quizResponse = await quizGenerator({
    topic,
    difficulty,
    note,
    questions,
  });
  console.log("quiz response : ", quizResponse); // log the quiz response from AI

  // if quiz generation fails throw custom error to the client
  if (!quizResponse) {
    throw new ApiError(
      "Something went wrong while generation Ai powered wuiz",
      404
    );
  }

  // clean the quiz response json data using cleanJson helper function
  const cleanedResponse = cleanJson(quizResponse);
  // now parse the cleanedResponse json string to object
  const quiz = JSON.parse(cleanedResponse);
  // console.log("cleaned quiz data : ", quiz); // log the cleaned quiz data
  // return success response to the client
  return res.json({ quiz: quiz, msg: "done" });
}

// controller function to get all quizzes
export async function getAllQuiz(req: Request, res: Response) {
  const response = await getAllQuizs(); // call getAllQuizzs model function to fetch all quizzes from database
  // console.log("all quizzes data : ", response); // log all quizzes data fetched from database
  // send success response to the client with fetched quizzes data
  return res.json({ data: response, message: "Fetch all the Quizzes" });
}

// controller function to get single quiz data by id
export async function getSingleQuiz(req: Request, res: Response) {
  const quizId = req.params.quizId; // get quiz id from request params
  // if quizId is not provided throw custom error to the client
  if (!quizId) {
    throw new ApiError("Quiz id is not given", 404);
  }

  // if quiz id provided, call findQuizById model function to fetch quiz data from database
  const quiz = await findQuizById(quizId);
  // if quiz is not found throw custom error to the client
  if (!quiz) {
    throw new ApiError("Something went wrong while fetching quiz", 404);
  }
  // if quiz is found return success response to the client
  return res.json({
    data: quiz,
    message: "Quiz data has been fetched successfully",
  });
}

// controller function to get all the quizzes hosted by user
export async function getAllHostedQuizzes(req: Request, res: Response) {
  // check the authorised user id
  const userId = req.user;

  // if userId is present then call model function to get all hosted Quizzes data
  const hostedQuizzes = await allHostedQuizzes(userId);

  // now return hosted quizzes data
  return res.json({
    data: hostedQuizzes,
    message: "Fetch all your hosted Quizzes",
  });
}

//controller function to get single hosted quiz data by id
export async function getSingleHostQuiz(req: Request, res: Response) {
  const hostQuizId = req.params.quizId; // store host quiz id

  // if host quiz id is not provided then throw custom error
  if (!hostQuizId) {
    throw new ApiError("Host Quiz id is not provided", 400);
  }
  // if host quiz id is provided then call model function to get all data
  const hostQuizData = await findHostQuizById(hostQuizId);

  // if hostQuizData is null then throw custom error
  if (!hostQuizData) {
    throw new ApiError("Host Quiz Id is invalid", 400);
  }

  // if hostQuizData is not null then return success response
  return res.json({
    data: hostQuizData,
    message: "Host Quiz data has been successfully fetched.",
  });
}

// controller function to get all saved quizzes by user
export async function getAllSavedQuiz(req: Request, res: Response) {
  const userId = req.user; // get user Id from authentication middleware

  // fetch all saved quizzes by calling model
  const result = await allSavedQuizzes(userId);

  // return the success response to client
  return res.json({
    data: result,
    message: "your all saved quizzes has been fetched",
  });
}

// controller function to get all quizzes created by yourself
export async function getAllYourQuiz(req: Request, res: Response) {
  const userId = req.user; // get user id from authenticated middleware

  // fetch all quizzes created by user
  const result = await allYourQuizzes(userId);

  // return the success response to client
  return res.json({
    data: result,
    message: "your all quizzes has been fetched",
  });
}

export function deleteQuiz() {}

export function updateQuiz() {}
