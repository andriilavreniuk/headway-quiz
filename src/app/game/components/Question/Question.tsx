'use client';

import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useQuiz } from '@/context/QuizContext';
import { getIsAllAnswersCorrect } from '@/lib/utils';
import { IQuestion } from '@/types/quiz';
import { Typography } from '@/components';
import { AnswersList } from '../AnswersList';
import { ACTION_DELAY } from '../../constants';
import styles from './Question.module.css';

interface Props {
  question: IQuestion;
  hasNextQuestion: boolean;
}

export const Question: FC<Props> = ({ question, hasNextQuestion }) => {
  const router = useRouter();
  const { onNextQuestionMove, onGameOver } = useQuiz();
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [isRevealed, setIsRevealed] = useState(false);

  const onAnswersCheck = (userAnswers: string[]) => {
    if (userAnswers.length !== question.minCorrectAnswersCount) return;

    setIsRevealed(true);

    if (
      getIsAllAnswersCorrect(question.answers, userAnswers) &&
      hasNextQuestion
    ) {
      setTimeout(() => {
        setSelectedAnswers([]);
        setIsRevealed(false);
        onNextQuestionMove(question.prize);
      }, ACTION_DELAY);
      return;
    }

    setTimeout(() => {
      router.replace('/game-over');
      onGameOver(question.prize);
    }, ACTION_DELAY);
  };

  const onAnswerSelect = (answerId: string) => {
    if (isRevealed) return;

    const updatedAnswers = selectedAnswers.includes(answerId)
      ? selectedAnswers.filter((id) => id !== answerId)
      : [...selectedAnswers, answerId];

    setSelectedAnswers(updatedAnswers);
    onAnswersCheck(updatedAnswers);
  };

  return (
    <div className={styles.question}>
      <Typography
        tag="h2"
        color="black"
        fontWeight="bold"
        className={styles.question__text}
      >
        {question.text}
      </Typography>
      <AnswersList
        answers={question.answers}
        userAnswers={selectedAnswers}
        isRevealed={isRevealed}
        onAnswerSelect={onAnswerSelect}
      />
    </div>
  );
};
