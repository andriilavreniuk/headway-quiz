import { render, screen, fireEvent } from '@testing-library/react';

import '@testing-library/jest-dom';
import { AnswerButton } from './AnswerButton';

jest.mock('./WrapperSvg.svg', () => {
  const MockedSvg = () => <svg data-testid="mocked-svg" />;
  return MockedSvg;
});

describe('AnswerButton Component', () => {
  it('renders with the correct classes when selected', () => {
    render(<AnswerButton isSelected>Answer</AnswerButton>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('answer-button--selected');
  });

  it('renders with the correct classes when revealed and correct', () => {
    render(
      <AnswerButton isRevealed isCorrect>
        Answer
      </AnswerButton>,
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('answer-button--correct');
  });

  it('renders with the correct classes when revealed and wrong', () => {
    render(
      <AnswerButton isRevealed isCorrect={false}>
        Answer
      </AnswerButton>,
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('answer-button--wrong');
  });

  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    render(<AnswerButton onClick={onClick}>Answer</AnswerButton>);

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('calls onClick when Enter or Space is pressed', () => {
    const onClick = jest.fn();
    render(<AnswerButton onClick={onClick}>Answer</AnswerButton>);

    const button = screen.getByRole('button');
    fireEvent.keyDown(button, { key: 'Enter' });
    fireEvent.keyDown(button, { key: ' ' });

    expect(onClick).toHaveBeenCalledTimes(2);
  });
});
