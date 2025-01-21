import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';

import { Question } from './Question';
import { useQuiz } from '@/context/QuizContext';
import { IAnswer, IQuestion } from '@/types/quiz';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
jest.mock('@/context/QuizContext', () => ({
  useQuiz: jest.fn(),
}));

jest.mock('../AnswersList', () => ({
  AnswersList: ({
    answers,
    onAnswerSelect,
  }: {
    answers: IAnswer[];
    onAnswerSelect: (id: string) => void;
  }) => (
    <div>
      {answers.map((answer: IAnswer) => (
        <button
          type="button"
          key={answer.id}
          onClick={() => onAnswerSelect(answer.id)}
        >
          {answer.text}
        </button>
      ))}
    </div>
  ),
}));

jest.mock('@/components', () => ({
  Typography: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className: string;
  }) => <div className={className}>{children}</div>,
}));

const mockOnNextQuestionMove = jest.fn();
const mockOnGameOver = jest.fn();
const mockRouter = { replace: jest.fn() };

const mockQuestion: IQuestion = {
  id: '1',
  text: 'What is 2 + 2?',
  prize: 1000,
  minCorrectAnswersCount: 1,
  answers: [
    { id: 'a', text: '3', isCorrect: false },
    { id: 'b', text: '4', isCorrect: true },
    { id: 'c', text: '5', isCorrect: false },
  ],
};

describe('Question Component', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useQuiz as jest.Mock).mockReturnValue({
      onNextQuestionMove: mockOnNextQuestionMove,
      onGameOver: mockOnGameOver,
    });
  });

  it('renders the question text', () => {
    render(<Question question={mockQuestion} hasNextQuestion />);

    expect(screen.getByText(/What is 2 \+ 2\?/i)).toBeInTheDocument();
  });

  it('calls onNextQuestionMove if all answers are correct and there is a next question', () => {
    render(<Question question={mockQuestion} hasNextQuestion />);

    const correctAnswer = screen.getByText('4');
    fireEvent.click(correctAnswer);

    waitFor(() => {
      expect(mockOnNextQuestionMove).toHaveBeenCalledWith(mockQuestion.prize);
    });
    expect(mockRouter.replace).not.toHaveBeenCalled();
  });

  it('calls onGameOver if the answer is incorrect or there is no next question', () => {
    render(<Question question={mockQuestion} hasNextQuestion={false} />);

    const incorrectAnswer = screen.getByText('3');
    fireEvent.click(incorrectAnswer);

    waitFor(() => {
      expect(mockRouter.replace).toHaveBeenCalledWith('/game-over');
      expect(mockOnGameOver).toHaveBeenCalledWith(mockQuestion.prize);
    });
  });

  it('does not allow selecting answers after the question is revealed', () => {
    render(<Question question={mockQuestion} hasNextQuestion />);

    const correctAnswer = screen.getByText('4');
    fireEvent.click(correctAnswer);

    const revealedAnswer = screen.getByText('3');
    fireEvent.click(revealedAnswer);

    waitFor(() => {
      expect(mockOnNextQuestionMove).toHaveBeenCalledWith(mockQuestion.prize);
      expect(mockOnGameOver).not.toHaveBeenCalled();
    });
  });
});
