import React from 'react';
import {
  render,
} from '@testing-library/react';
import Header from '../components/Header';

describe('Header Component', () => {
  test('should render Header component', () => {
    const { getByRole } = render(<Header />);
    expect(getByRole('heading', { name: 'Open Library' })).toBeInTheDocument();
  });
});
