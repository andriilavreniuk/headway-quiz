import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';

import { useQuiz } from '@/context/QuizContext';
import GameOver from './page';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/context/QuizContext', () => ({
  useQuiz: jest.fn(),
}));

jest.mock('@/lib/utils', () => ({
  formatPrize: (prize: number) => prize,
}));

jest.mock('@/assets/svg/Hero.svg', () => {
  const HeroSvg = ({ className }: { className: string }) => (
    <svg data-testid="hero-svg" className={className} />
  );
  return HeroSvg;
});

jest.mock('@/components', () => ({
  Button: ({
    className,
    onClick,
    children,
  }: {
    className: string;
    onClick: () => void;
    children: React.ReactNode;
  }) => (
    <button type="button" onClick={onClick} className={className}>
      {children}
    </button>
  ),
  Typography: ({
    children,
    className,
  }: {
    className: string;
    children: React.ReactNode;
  }) => <div className={className}>{children}</div>,
}));

describe('GameOver Component', () => {
  const mockReplace = jest.fn();
  const mockOnGameReset = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      replace: mockReplace,
    });

    (useQuiz as jest.Mock).mockReturnValue({
      isGameOver: true,
      totalPrize: 1000,
      onGameReset: mockOnGameReset,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the GameOver component with correct elements', () => {
    render(<GameOver />);

    const heroImage = screen.getByTestId('hero-svg');
    expect(heroImage).toBeInTheDocument();
    expect(heroImage).toHaveAttribute(
      'class',
      expect.stringContaining('game-over-content__image'),
    );

    const title = screen.getByText(/Total score:/i);
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass('game-over-content__text-title');

    const prize = screen.getByText('1000 earned');
    expect(prize).toBeInTheDocument();
    expect(prize).toHaveAttribute(
      'class',
      expect.stringContaining('game-over-content__text-priz'),
    );

    const button = screen.getByRole('button', { name: /Try again/i });
    expect(button).toBeInTheDocument();
  });

  it('calls onGameReset and router.replace on Try again click', () => {
    render(<GameOver />);

    const button = screen.getByRole('button', { name: /Try again/i });

    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(mockOnGameReset).toHaveBeenCalled();
    expect(mockReplace).toHaveBeenCalledWith('/game');
  });

  it('redirects to home page if isGameOver is false', () => {
    (useQuiz as jest.Mock).mockReturnValue({
      isGameOver: false,
      totalPrize: 0,
      onGameReset: mockOnGameReset,
    });

    render(<GameOver />);

    expect(mockReplace).toHaveBeenCalledWith('/');
  });
});
