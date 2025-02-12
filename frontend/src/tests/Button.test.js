// frontend/src/tests/Button.test.js
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../components/Button';

test('renders button with label', () => {
  render(<Button label="Click me" onClick={() => {}} />);
  expect(screen.getByText(/Click me/i)).toBeInTheDocument();
});

test('calls onClick when clicked', () => {
  const handleClick = jest.fn();
  render(<Button label="Click me" onClick={handleClick} />);
  fireEvent.click(screen.getByText(/Click me/i));
  expect(handleClick).toHaveBeenCalledTimes(1);
});