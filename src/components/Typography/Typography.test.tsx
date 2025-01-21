import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import { Typography } from './Typography';

describe('Typography Component', () => {
  it('renders children as p by default', () => {
    render(<Typography tag="p">Test content</Typography>);
    const element = screen.getByText(/Test content/i);
    expect(element.tagName).toBe('P');
  });

  it('renders the correct tag based on the "tag" prop', () => {
    render(<Typography tag="h1">Heading content</Typography>);
    const element = screen.getByText(/Heading content/i);
    expect(element.tagName).toBe('H1');
  });

  it('applies the correct color class when "color" prop is provided', () => {
    render(
      <Typography tag="h2" color="orange">
        Colored content
      </Typography>,
    );
    const element = screen.getByText(/Colored content/i);
    expect(element).toHaveClass('typography--color-orange');
  });

  it('applies the correct font weight class when "fontWeight" prop is provided', () => {
    render(
      <Typography tag="h3" fontWeight="bold">
        Bold content
      </Typography>,
    );
    const element = screen.getByText(/Bold content/i);
    expect(element).toHaveClass('typography--bold');
  });

  it('applies additional custom class when "className" prop is provided', () => {
    render(
      <Typography tag="h4" className="custom-class">
        Custom class content
      </Typography>,
    );
    const element = screen.getByText(/Custom class content/i);
    expect(element).toHaveClass('custom-class');
  });

  it('combines default classes with custom ones', () => {
    render(
      <Typography
        tag="h5"
        color="gray"
        fontWeight="normal"
        className="extra-class"
      >
        Combining styles
      </Typography>,
    );
    const element = screen.getByText(/Combining styles/i);
    expect(element).toHaveClass('typography--color-gray');
    expect(element).toHaveClass('typography--normal');
    expect(element).toHaveClass('extra-class');
  });
});
