import { createContext, useEffect, useState } from "react";
import quizData from "../db/quiz";

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [quiz, setQuiz] = useState(() => {
    const storedQuiz = localStorage.getItem("quiz");
    return storedQuiz ? JSON.parse(storedQuiz) : quizData;
  });

  useEffect(() => {
    localStorage.setItem("quiz", JSON.stringify(quiz));
  }, [quiz]);

  return (
    <QuizContext.Provider value={{ quiz, setQuiz }}>
      {children}
    </QuizContext.Provider>
  );
};
