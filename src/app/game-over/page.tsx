'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import styles from './page.module.css';
import { Button, Typography } from '@/components';
import { useQuiz } from '@/context/QuizContext';
import Hero from '@/assets/svg/Hero.svg';
import { formatPrize } from '@/lib/utils';

export default function GameOver() {
  const router = useRouter();
  const { isGameOver, totalPrize, onGameReset } = useQuiz();

  useEffect(() => {
    if (!isGameOver) {
      router.replace('/');
    }
  }, [isGameOver, router]);

  const onTryAgainClick = () => {
    onGameReset();
    router.replace('/game');
  };

  return (
    <div className={styles['game-over-background']}>
      <div className={styles['game-over-content']}>
        <Hero className={styles['game-over-content__image']} />

        <div className={styles['game-over-content__wrapper']}>
          <div className={styles['game-over-content__text-wrapper']}>
            <Typography
              tag="h2"
              color="black"
              fontWeight="bold"
              className={styles['game-over-content__text-title']}
            >
              Total score:
            </Typography>
            <Typography
              tag="h1"
              fontWeight="bold"
              className={styles['game-over-content__text-prize']}
            >
              {formatPrize(totalPrize)} earned
            </Typography>
          </div>

          <div className={styles['game-over-content__button']}>
            <Button onClick={onTryAgainClick} fullWidth>
              Try again
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
