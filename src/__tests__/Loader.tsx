import React from 'react';
import {
  render,
} from '@testing-library/react';
import Loader from '../components/Loader';

describe('Loader Component', () => {
  test('should render Loader component', () => {
    const { getByTestId } = render(<Loader />);
    expect(getByTestId('loader')).toBeInTheDocument();
  });
});
