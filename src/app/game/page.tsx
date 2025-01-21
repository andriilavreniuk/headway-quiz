'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useQuiz } from '@/context/QuizContext';
import { useMockQuery } from '@/hooks';
import { Spinner } from '@/components';
import { PrizesList, PrizesMenu, Question } from './components';
import styles from './page.module.css';

export default function Quiz() {
  const router = useRouter();
  const { isGameOver, currentQuestionIndex } = useQuiz();
  const { data, loading, error } = useMockQuery();

  useEffect(() => {
    if (isGameOver) {
      router.replace('/game-over');
    }
  }, [isGameOver, router]);

  if (loading)
    return (
      <div className={styles['quiz-page']}>
        <Spinner />
      </div>
    );

  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles['quiz-page']}>
      <div className={styles['quiz-page__question']}>
        <Question
          question={data[currentQuestionIndex]}
          hasNextQuestion={currentQuestionIndex < data.length - 1}
        />
      </div>

      <PrizesMenu
        questions={data}
        currentQuestionIndex={currentQuestionIndex}
      />

      <div className={styles['quiz-page__desktop-prizes']}>
        <PrizesList
          questions={data}
          currentQuestionIndex={currentQuestionIndex}
        />
      </div>
    </div>
  );
}
