import { QUESTION_SENT } from "../events";
import Game from "../Game";
import { QuestionType, Quiz, QuizData, type PlayersData } from "../types";
import User from "../User";
import { v4 as uuidv4 } from "uuid";

export function sendJson(type: string, message: string, data?: any) {
  return JSON.stringify({
    type: type,
    data: data ?? {},
    message: message,
  });
}

export function simplifyPlayer(player: Map<string, User>) {
  // send all the players data
  let players: PlayersData[] = [];
  for (let [key, value] of player) {
    players.push({
      id: key,
      fullName: value.fullName,
      score: value.score ?? 0,
    });
  }
  return players;
}

// just add a id to every question
export function addIdToQuestion(quiz: QuizData) {
  return {
    title: quiz.title,
    questions: quiz.questions.map((q) => ({ questionId: uuidv4(), ...q })),
  };
}

// send next question to client
export function sendNextQuestion(game: Game) {
  if (!game.quizData) return;
  if (game.quizData !== null && game.currentQuestionIndex !== null) {
    const question = game.quizData.questions[game.currentQuestionIndex];
    // console.log("question data : ", question);
    // if question is undefined it mean quiz is over
    if (!question) {
      // delete timer id
      return;
    }
    // if that questionIndex exist in quizData.questions
    if (question) {
      // console.log("question data : ", question);
      const data = sendJson(
        QUESTION_SENT,
        `here is your ${game.currentQuestionIndex} question`,
        { question: question, players: simplifyPlayer(game.players) }
      );
      // console.log(data);
      game.broadcasting(data);
      // console.log("question data send to  client : ", data);
      game.currentQuestionIndex += 1;

      // call next question
      game.questionTimer = setTimeout(
        () => {
          sendNextQuestion(game);
        },
        parseInt(game.countDown) * 1000
      );
    }
  }
}

// find  question data by given questionId
export function findQuestion(quiz: Quiz, id: string) {
  const questionData = quiz.questions.find((q) => q.questionId === id);
  console.log("quiz data : ", quiz);
  console.log("given question id : ", id);
  console.log("question data on findQuestion function", questionData);
  return questionData;
}

// // check question correct answer
// export function checkCorrectAnswer(
//   question: {
//     questionId: string;
//     question: string;
//     points: number;
//     options: {
//       text: string;
//       isCorrect: boolean;
//     }[];
//   },
//   option: string
// ) {
//   const optionIndex = question.options.findIndex((q) => q.text === option);
//   // check if selected option is  true
//   if(question.options)
// }
