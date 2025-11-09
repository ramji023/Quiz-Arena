import { useQuery } from "@tanstack/react-query";
import { api } from "../utils/axiosInterceptor";
import { AllQuizzes, Quiz } from "../types/quizForm";

export const useGetAllQuiz = () => {
  return useQuery<AllQuizzes[]>({
    queryKey: ["Quizzes"],
    queryFn: async () => {
      const response = await api.get("/api/v1/quiz/getAllQuiz");
      return response.data.data;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
  });
};

export const useGetQuiz = (id: string | undefined) => {
  return useQuery<Quiz>({
    queryKey: [id, "quiz"],
    queryFn: async () => {
      const response = await api.get(`/api/v1/quiz/getQuiz/${id}`);
      return response.data.data;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    enabled: !!id,
  });
};
