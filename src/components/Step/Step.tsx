import { FC, ReactNode } from 'react';

import WrapperSvg from './WrapperSvg.svg';
import styles from './Step.module.css';

interface Props {
  isCurrent?: boolean;
  isAnswered?: boolean;
  children: ReactNode;
}

export const Step: FC<Props> = ({
  isCurrent = false,
  isAnswered = false,
  children,
}) => {
  return (
    <div
      data-testid="step"
      className={`${styles.step} 
      ${isCurrent ? styles['step--current'] : ''} 
      ${isAnswered ? styles['step--answered'] : ''}`}
    >
      <span className={styles.step__divider} />
      <div className={styles.step__wrapper}>
        <WrapperSvg className={styles.step__svg} />
        <div className={styles.step__inner}>{children}</div>
      </div>
      <span className={styles.step__divider} />
    </div>
  );
};
