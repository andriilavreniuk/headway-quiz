import { useState, useEffect } from 'react';

import { IQuestion } from '@/types/quiz';
import config from '../lib/config.json';

// gql mocked query
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GET_QUESTIONS_QUERY = `
  query GetQuestions {
    questions: {
      id
      text
      answers {
        id
        text
        isCorrect
      }
      minCorrectAnswersCount
      prize
    }
  }
`;

export const useMockQuery = () => {
  const [data, setData] = useState<IQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => {
          setTimeout(resolve, 1000);
        });
        setData(config.questions);
      } catch {
        setError('Failed to fetch questions');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  return { data, loading, error };
};
