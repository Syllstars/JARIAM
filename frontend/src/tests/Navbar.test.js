// frontend/src/tests/Navbar.test.js
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Navbar from '../components/Navbar';

test('renders navbar with title and logout button', () => {
  render(<Navbar />);
  expect(screen.getByText(/JARIAM/i)).toBeInTheDocument();
  expect(screen.getByText(/Logout/i)).toBeInTheDocument();
});