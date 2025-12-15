import { useQuery } from "@tanstack/react-query";
import { api } from "../utils/axiosInterceptor";
import { AllQuizzes, HostQuiz, HostQuizzes, Quiz } from "../types/quizForm";

// react query to get all the quizzes
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

// react query to get a complete quiz data
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

// react query to get all hosted quizzes
export const useGetAllHostedQuiz = () => {
  return useQuery<HostQuizzes[]>({
    queryKey: ["host-quiz"],
    queryFn: async () => {
      const response = await api.get(`/api/v1/quiz/getAllHostedQuizzes`);
      return await response.data.data;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
  });
};

// react query to get a complete host quiz details
export const useGetHostQuiz = (quizId: string | undefined) => {
  return useQuery<HostQuiz>({
    queryKey: [quizId],
    queryFn: async () => {
      const response = await api.get(`/api/v1/quiz/getHostQuiz/${quizId}`);
      return response.data.data;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    enabled: !!quizId,
  });
};

// react query to get all saved quizzes
export const useGetSavedQuizzes = () => {
  return useQuery<AllQuizzes[]>({
    queryKey: ["savedQuizzes"],
    queryFn: async () => {
      const response = await api.get(`/api/v1/quiz/getAllSavedQuizzes`);
      return response.data.data;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
  });
};

// react query to get all your quizzes
export const useGetAllYourQuizzes = () => {
  return useQuery<AllQuizzes[]>({
    queryKey: ["myQuizzes"],
    queryFn: async () => {
      const response = await api.get(`/api/v1/quiz/getAllYourQuizzes`);
      return response.data.data;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
  });
};
