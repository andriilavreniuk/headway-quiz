import { FC } from 'react';

import styles from './AnswerButton.module.css';
import WrapperSvg from './WrapperSvg.svg';

export interface Props {
  children: React.ReactNode;
  isSelected?: boolean;
  isCorrect?: boolean;
  isRevealed?: boolean;
  className?: string;
  onClick?: () => void;
}

export const AnswerButton: FC<Props> = ({
  children,
  isSelected = false,
  isCorrect = false,
  isRevealed = false,
  className = '',
  onClick,
}) => {
  return (
    <button
      type="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick?.();
        }
      }}
      onClick={onClick}
      className={`${styles['answer-button']} 
      ${isSelected ? styles['answer-button--selected'] : ''} 
      ${isRevealed && isCorrect ? styles['answer-button--correct'] : ''}
      ${isRevealed && !isCorrect ? styles['answer-button--wrong'] : ''}
      ${className}
      `}
    >
      <span className={styles['answer-button__divider']} />
      <div className={styles['answer-button__wrapper']}>
        <WrapperSvg className={styles['answer-button__svg']} />
        <div className={styles['answer-button__inner']}>{children}</div>
      </div>
      <span className={styles['answer-button__divider']} />
    </button>
  );
};
