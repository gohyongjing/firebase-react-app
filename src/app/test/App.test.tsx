import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders log in link', () => {
  render(<App />);
  const linkElement = screen.getByText(/log In/i);
  expect(linkElement).toBeInTheDocument();
});
