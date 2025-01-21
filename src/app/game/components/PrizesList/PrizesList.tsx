import { FC } from 'react';

import { IQuestion } from '@/types/quiz';
import { Step } from '@/components';
import { formatPrize } from '@/lib/utils';
import styles from './PrizesList.module.css';

interface Props {
  questions: IQuestion[];
  currentQuestionIndex: number;
}

export const PrizesList: FC<Props> = ({ questions, currentQuestionIndex }) => {
  return (
    <div className={styles['prizes-list']}>
      {questions.map((question, index) => (
        <Step
          key={question.id}
          isCurrent={index === currentQuestionIndex}
          isAnswered={index < currentQuestionIndex}
        >
          {formatPrize(question.prize)}
        </Step>
      ))}
    </div>
  );
};
