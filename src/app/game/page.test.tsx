import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';

import { useQuiz } from '@/context/QuizContext';
import { useMockQuery } from '@/hooks';
import Quiz from './page';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/context/QuizContext', () => ({
  useQuiz: jest.fn(),
}));

jest.mock('@/hooks', () => ({
  useMockQuery: jest.fn(),
}));

jest.mock('@/components', () => ({
  Spinner: () => <div>Loading...</div>,
}));

jest.mock('./components', () => ({
  PrizesList: () => <div>PrizesList</div>,
  PrizesMenu: () => <div>PrizesMenu</div>,
  Question: () => <div>Question</div>,
}));

describe('Quiz Component', () => {
  const mockReplace = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      replace: mockReplace,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state when data is loading', () => {
    (useMockQuery as jest.Mock).mockReturnValue({
      data: [],
      loading: true,
      error: null,
    });
    (useQuiz as jest.Mock).mockReturnValue({
      isGameOver: false,
      currentQuestionIndex: 0,
    });

    render(<Quiz />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state when there is an error', () => {
    (useMockQuery as jest.Mock).mockReturnValue({
      data: [],
      loading: false,
      error: 'Some error occurred',
    });

    render(<Quiz />);

    expect(screen.getByText('Error: Some error occurred')).toBeInTheDocument();
  });

  it('redirects to game-over page when isGameOver is true', async () => {
    (useQuiz as jest.Mock).mockReturnValue({
      isGameOver: true,
      currentQuestionIndex: 0,
    });

    (useMockQuery as jest.Mock).mockReturnValue({
      data: [],
      loading: false,
      error: null,
    });

    render(<Quiz />);

    await waitFor(() => expect(mockReplace).toHaveBeenCalledWith('/game-over'));
  });

  it('renders the quiz page correctly when data is available and not loading', () => {
    const mockData = [
      { question: 'What is 2 + 2?', answer: '4' },
      { question: 'What is 3 + 5?', answer: '8' },
    ];

    (useQuiz as jest.Mock).mockReturnValue({
      isGameOver: false,
      currentQuestionIndex: 0,
    });

    (useMockQuery as jest.Mock).mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
    });

    render(<Quiz />);

    expect(screen.getByText('Question')).toBeInTheDocument();
    expect(screen.getByText('PrizesMenu')).toBeInTheDocument();
    expect(screen.getByText('PrizesList')).toBeInTheDocument();
  });
});
