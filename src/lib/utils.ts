import { IAnswer } from '@/types/quiz';

export const getIsAllAnswersCorrect = (
  answers: IAnswer[],
  userAnswers: string[],
) => {
  return userAnswers.every(
    (answerId) => answers.find((answer) => answer.id === answerId)?.isCorrect,
  );
};

export const formatPrize = (cents: number) => {
  return `$${(cents / 100).toLocaleString('en-US')}`;
};
