import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import { AnswersList } from './AnswersList';
import { IAnswer } from '@/types/quiz';
import { ANSWER_LABELS } from '../../constants';

jest.mock('@/components', () => ({
  AnswerButton: ({
    children,
    isSelected,
    isRevealed,
    onClick,
  }: {
    children: React.ReactNode;
    isSelected: boolean;
    isRevealed: boolean;
    onClick: () => void;
  }) => (
    <button
      type="button"
      onClick={onClick}
      data-selected={isSelected}
      data-revealed={isRevealed}
    >
      {children}
    </button>
  ),
  Typography: ({ children }: { children: React.ReactNode }) => (
    <p>{children}</p>
  ),
}));

const mockAnswers: IAnswer[] = [
  { id: '1', text: 'Answer 1', isCorrect: false },
  { id: '2', text: 'Answer 2', isCorrect: true },
  { id: '3', text: 'Answer 3', isCorrect: false },
  { id: '4', text: 'Answer 4', isCorrect: false },
];

describe('AnswersList Component', () => {
  const mockOnAnswerSelect = jest.fn();

  it('renders the answers correctly', () => {
    render(
      <AnswersList
        answers={mockAnswers}
        userAnswers={[]}
        isRevealed={false}
        onAnswerSelect={mockOnAnswerSelect}
      />,
    );

    const answerButtons = screen.getAllByRole('button');
    expect(answerButtons).toHaveLength(mockAnswers.length);

    mockAnswers.forEach((answer, index) => {
      expect(screen.getByText(answer.text)).toBeInTheDocument();
      expect(screen.getByText(ANSWER_LABELS[index])).toBeInTheDocument();
    });
  });

  it('calls onAnswerSelect when an answer is clicked', () => {
    render(
      <AnswersList
        answers={mockAnswers}
        userAnswers={[]}
        isRevealed={false}
        onAnswerSelect={mockOnAnswerSelect}
      />,
    );

    const firstAnswerButton = screen.getAllByRole('button')[0];
    fireEvent.click(firstAnswerButton);

    expect(mockOnAnswerSelect).toHaveBeenCalledWith('1');
  });

  it('displays the correct styles based on selection and reveal state', () => {
    render(
      <AnswersList
        answers={mockAnswers}
        userAnswers={['1']}
        isRevealed
        onAnswerSelect={mockOnAnswerSelect}
      />,
    );

    const firstAnswerButton = screen.getAllByRole('button')[0];
    expect(firstAnswerButton).toHaveAttribute('data-selected', 'true');
    expect(firstAnswerButton).toHaveAttribute('data-revealed', 'true');

    const secondAnswerButton = screen.getAllByRole('button')[1];
    expect(secondAnswerButton).toHaveAttribute('data-selected', 'false');
    expect(secondAnswerButton).toHaveAttribute('data-revealed', 'true');
  });
});
