import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import { Step } from './Step';

jest.mock('./WrapperSvg.svg', () => {
  const MockedSvg = () => <svg data-testid="mocked-svg" />;
  return MockedSvg;
});

describe('Step Component', () => {
  it('renders correctly with children', () => {
    render(<Step>Step Content</Step>);
    const step = screen.getByTestId('step');
    expect(step).toBeInTheDocument();
    expect(step).toHaveTextContent('Step Content');
  });

  it('applies "step--current" class when isCurrent is true', () => {
    render(<Step isCurrent>Step Content</Step>);
    const step = screen.getByTestId('step');
    expect(step).toHaveClass('step--current');
  });

  it('does not apply "step--current" class when isCurrent is false', () => {
    render(<Step>Step Content</Step>);
    const step = screen.getByTestId('step');
    expect(step).not.toHaveClass('step--current');
  });

  it('applies "step--answered" class when isAnswered is true', () => {
    render(<Step isAnswered>Step Content</Step>);
    const step = screen.getByTestId('step');
    expect(step).toHaveClass('step--answered');
  });

  it('does not apply "step--answered" class when isAnswered is false', () => {
    render(<Step>Step Content</Step>);
    const step = screen.getByTestId('step');
    expect(step).not.toHaveClass('step--answered');
  });
});
