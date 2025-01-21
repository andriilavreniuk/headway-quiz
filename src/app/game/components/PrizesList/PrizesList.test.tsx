import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { PrizesList } from './PrizesList';
import { IQuestion } from '@/types/quiz';

jest.mock('@/components', () => ({
  Step: ({
    children,
    isCurrent,
    isAnswered,
  }: {
    children: React.ReactNode;
    isCurrent: boolean;
    isAnswered: boolean;
  }) => (
    <div data-current={isCurrent} data-answered={isAnswered}>
      {children}
    </div>
  ),
}));

jest.mock('@/lib/utils', () => ({
  formatPrize: (prize: number) => `$${prize}`,
}));

const mockQuestions: IQuestion[] = [
  {
    id: '1',
    text: 'text1',
    prize: 1000,
    answers: [],
    minCorrectAnswersCount: 1,
  },
  {
    id: '2',
    text: 'text1',
    prize: 2000,
    answers: [],
    minCorrectAnswersCount: 1,
  },
  {
    id: '3',
    text: 'text1',
    prize: 3000,
    answers: [],
    minCorrectAnswersCount: 1,
  },
];

describe('PrizesList Component', () => {
  it('renders the prizes correctly', () => {
    render(<PrizesList questions={mockQuestions} currentQuestionIndex={1} />);

    expect(screen.getByText('$1000')).toBeInTheDocument();
    expect(screen.getByText('$2000')).toBeInTheDocument();
    expect(screen.getByText('$3000')).toBeInTheDocument();
  });

  it('marks the current and answered steps correctly', () => {
    render(<PrizesList questions={mockQuestions} currentQuestionIndex={1} />);

    const steps = screen.getAllByText(/\$/);
    expect(steps[0]).toHaveAttribute('data-answered', 'true');

    expect(steps[1]).toHaveAttribute('data-answered', 'false');
    expect(steps[1]).toHaveAttribute('data-current', 'true');

    expect(steps[2]).toHaveAttribute('data-answered', 'false');
  });
});
