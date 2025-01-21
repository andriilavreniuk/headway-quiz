import { FC } from 'react';

import { IAnswer } from '@/types/quiz';
import { AnswerButton, Typography } from '@/components';
import { ANSWER_LABELS } from '../../constants';
import styles from './AnswersList.module.css';

interface Props {
  answers: IAnswer[];
  userAnswers: string[];
  isRevealed: boolean;
  onAnswerSelect: (answerId: string) => void;
}

export const AnswersList: FC<Props> = ({
  answers,
  userAnswers,
  isRevealed,
  onAnswerSelect,
}) => {
  return (
    <div className={styles['answers-list']}>
      {answers.map(({ text, isCorrect, id }, index) => {
        const isSelected = userAnswers.includes(id);
        const isAnswerRevealed = isCorrect || isSelected ? isRevealed : false;
        return (
          <AnswerButton
            key={id}
            isCorrect={isCorrect}
            isSelected={isSelected}
            isRevealed={isAnswerRevealed}
            className={styles['answers-list__answer']}
            onClick={() => onAnswerSelect(id)}
          >
            <div className={styles['answers-list__answer-text']}>
              <Typography
                tag="p"
                color="orange"
                fontWeight="bold"
                className={styles['answers-list__label']}
              >
                {ANSWER_LABELS[index]}
              </Typography>
              <Typography tag="p">{text}</Typography>
            </div>
          </AnswerButton>
        );
      })}
    </div>
  );
};
