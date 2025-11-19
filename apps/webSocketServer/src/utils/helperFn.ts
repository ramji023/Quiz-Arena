import { QuestionType, QuizData, type PlayersData } from "../types";
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
