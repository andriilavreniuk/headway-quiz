import { FC, useState } from 'react';

import Menu from '@/assets/svg/Menu.svg';
import Cross from '@/assets/svg/Cross.svg';
import { IQuestion } from '@/types/quiz';
import { PrizesList } from '../PrizesList';
import styles from './PrizesMenu.module.css';

interface Props {
  questions: IQuestion[];
  currentQuestionIndex: number;
}

export const PrizesMenu: FC<Props> = ({ questions, currentQuestionIndex }) => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setIsMenuOpened((prev) => !prev)}
        className={styles['quiz-page__mobile-prizes-trigger']}
      >
        {isMenuOpened ? (
          <Cross width={24} height={24} />
        ) : (
          <Menu width={24} height={24} />
        )}
      </button>
      <div
        className={`${styles['quiz-page__mobile-prizes']} ${
          isMenuOpened ? styles['quiz-page__mobile-prizes--open'] : ''
        }`}
      >
        <PrizesList
          questions={questions}
          currentQuestionIndex={currentQuestionIndex}
        />
      </div>
    </>
  );
};
