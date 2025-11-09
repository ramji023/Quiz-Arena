import { useQuery } from "@tanstack/react-query";
import { api } from "../utils/axiosInterceptor";
import { AllQuizzes } from "../types/quizForm";

export const useGetAllQuiz = () => {
  return useQuery<AllQuizzes[]>({
    queryKey: ["Quizzes"],
    queryFn: async () => {
      const response = await api.get("/api/v1/quiz/getQuiz");
      return response.data.data;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
  });
};
