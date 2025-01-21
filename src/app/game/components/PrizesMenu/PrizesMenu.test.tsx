import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { PrizesMenu } from './PrizesMenu';
import { IQuestion } from '@/types/quiz';

jest.mock('../PrizesList', () => ({
  PrizesList: () => <div data-testid="prizes-list">PrizesList</div>,
}));

jest.mock('@/assets/svg/Menu.svg', () => {
  const MenuIcon = () => <svg data-testid="menu-icon" />;
  return MenuIcon;
});
jest.mock('@/assets/svg/Cross.svg', () => {
  const CrossIcon = () => <svg data-testid="cross-icon" />;
  return CrossIcon;
});

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

describe('PrizesMenu Component', () => {
  it('renders the correct icon (Menu or Cross) based on the state', () => {
    render(<PrizesMenu questions={mockQuestions} currentQuestionIndex={1} />);

    const menuButton = screen.getByRole('button');

    waitFor(() => {
      expect(screen.getByTestId('menu-icon')).toBeInTheDocument();
      expect(screen.queryByTestId('cross-icon')).not.toBeInTheDocument();
    });

    fireEvent.click(menuButton);

    waitFor(() => {
      expect(screen.getByTestId('cross-icon')).toBeInTheDocument();
      expect(screen.queryByTestId('menu-icon')).not.toBeInTheDocument();
    });

    fireEvent.click(menuButton);

    waitFor(() => {
      expect(screen.getByTestId('menu-icon')).toBeInTheDocument();
      expect(screen.queryByTestId('cross-icon')).not.toBeInTheDocument();
    });
  });

  it('renders prizes list and toggles visibility based on menu state', () => {
    render(<PrizesMenu questions={mockQuestions} currentQuestionIndex={1} />);

    const menuButton = screen.getByRole('button');
    const prizesList = screen.getByTestId('prizes-list');

    waitFor(() => {
      expect(prizesList).not.toBeVisible();
    });

    fireEvent.click(menuButton);

    waitFor(() => {
      expect(prizesList).toBeVisible();
    });

    fireEvent.click(menuButton);

    waitFor(() => {
      expect(screen.queryByTestId('prizes-list')).not.toBeVisible();
    });
  });
});
