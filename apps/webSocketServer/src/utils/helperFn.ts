import { QUESTION_SENT, QUIZ_COMPLETED } from "../events";
import Game from "../Game";
import { createPlayer } from "../models/game";
import { Quiz, QuizData, type PlayersData } from "../types";
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
    id: quiz.id,
    title: quiz.title,
    questions: quiz.questions.map((q) => ({ questionId: uuidv4(), ...q })),
  };
}

// send next question to client
export async function sendNextQuestion(game: Game) {
  if (!game.quizData) return;
  if (game.quizData !== null && game.currentQuestionIndex !== null) {
    const question = game.quizData.questions[game.currentQuestionIndex];
    // console.log("question data : ", question);
    // if question is undefined it mean quiz is over
    if (!question && game.questionTimer !== null && game.hostedQuizId) {
      // delete timer id
      clearTimeout(game.questionTimer);
      // send quiz complete status and final score
      // change game status
      game.gameStatus = "end"
      const data = sendJson(QUIZ_COMPLETED, "Quiz has been completed", {
        players: simplifyPlayer(game.players),gameStatus : game.gameStatus
      });
      // console.log(data);
      game.broadcasting(data); // broadcast message to everyone
      // now save player data into database
      const jsonData = {
        hostId: game.hostedQuizId,
        players: Array.from(game.players.values()).map((p) => ({
          playerId: p.id,
          name: p.fullName,
          score: p.score as number,
        })),
      };
      await savePlayerScoresToDB(jsonData);
      return;
    }
    // if that questionIndex exist in quizData.questions
    if (question) {
      // console.log("question data : ", question);
      game.gameStatus = "start";
      const data = sendJson(
        QUESTION_SENT,
        `here is your ${game.currentQuestionIndex} question`,
        {
          gameStatus: game.gameStatus,
          question: question,
          players: simplifyPlayer(game.players),
        }
      );
      // console.log(data);
      game.broadcasting(data);
      // console.log("question data send to  client : ", data);
      game.currentQuestionIndex += 1;

      // call next question
      game.questionTimer = setTimeout(() => {
        sendNextQuestion(game);
      }, game.tik_tik * 1000);
    }
  }
}

// find  question data by given questionId
export function findQuestion(quiz: Quiz, id: string) {
  const questionData = quiz.questions.find((q) => q.questionId === id);
  // console .log("quiz data : ", quiz);
  // console.log("given question id : ", id);
  // console.log("question data on findQuestion function", questionData);
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

type playerData = {
  hostId: string;
  players: {
    playerId: string;
    name: string;
    score: number;
  }[];
};
// save player scores to database
async function savePlayerScoresToDB(playersData: playerData) {
  try {
    playersData.players.map((p) =>
      createPlayer({ hostId: playersData.hostId, player: p })
    );
  } catch (error) {
    console.log(error);
  }
}
