// frontend/src/tests/LoginPage.test.js
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from '../pages/LoginPage';

delete window.location;
window.location = { assign: jest.fn() };

test('renders login form', () => {
  render(<LoginPage />);
  expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
});

test('handles form submission', () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ token: 'test-token' })
    })
  );

  render(<LoginPage />);
  fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: 'user' } });
  fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'password' } });
  fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));

  expect(global.fetch).toHaveBeenCalledTimes(1);
});
