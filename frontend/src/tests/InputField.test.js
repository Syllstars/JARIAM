// frontend/src/tests/InputField.test.js
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import InputField from '../components/InputField';

test('renders input field with placeholder', () => {
  render(<InputField type="text" placeholder="Enter text" value="" onChange={() => {}} />);
  expect(screen.getByPlaceholderText(/Enter text/i)).toBeInTheDocument();
});

test('updates value when typing', () => {
  const handleChange = jest.fn();
  render(<InputField type="text" placeholder="Enter text" value="" onChange={handleChange} />);
  fireEvent.change(screen.getByPlaceholderText(/Enter text/i), { target: { value: 'Hello' } });
  expect(handleChange).toHaveBeenCalledTimes(1);
});
