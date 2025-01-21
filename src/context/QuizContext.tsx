'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

const QuizContext = createContext<{
  isGameOver: boolean;
  currentQuestionIndex: number;
  totalPrize: number;
  onNextQuestionMove: (questionPrize: number) => void;
  onGameOver: (questionPrize: number) => void;
  onGameReset: () => void;
} | null>(null);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [totalPrize, setTotalPrize] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const onNextQuestionMove = (questionPrize: number) => {
    setTotalPrize(questionPrize);
    setQuestionIndex((prev) => prev + 1);
  };

  const onGameReset = () => {
    setQuestionIndex(0);
    setTotalPrize(0);
    setIsGameOver(false);
  };

  const onGameOver = async (questionPrize: number) => {
    setQuestionIndex(0);
    setTotalPrize(questionPrize);
    setIsGameOver(true);
  };

  return (
    <QuizContext
      value={{
        isGameOver,
        currentQuestionIndex: questionIndex,
        totalPrize,
        onNextQuestionMove,
        onGameOver,
        onGameReset,
      }}
    >
      {children}
    </QuizContext>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);

  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }

  return context;
};
