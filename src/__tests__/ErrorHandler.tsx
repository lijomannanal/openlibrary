import React from 'react';
import {
  render, fireEvent, act,
} from '@testing-library/react';
import ErrorHandler from '../components/ErrorHandler';

describe('ErrorHandler Component', () => {
  let tryAgainFn: jest.Mock<any, any>;
  beforeEach(() => {
    tryAgainFn = jest.fn();
  });
  test('should render ErrorHandler component', () => {
    const { getByTestId } = render(<ErrorHandler
      error={{ message: 'Test Error' }}
      resetErrorBoundary={tryAgainFn}
    />);
    expect(getByTestId('error-alert')).toBeInTheDocument();
  });

  test('should show the error message passed to the component', () => {
    const { getByText } = render(<ErrorHandler
      error={{ message: 'Test Error' }}
      resetErrorBoundary={tryAgainFn}
    />);
    expect(getByText('Test Error')).toBeInTheDocument();
  });

  test('should show call the handler method on retry button click', async () => {
    const { getByRole } = render(<ErrorHandler
      error={{ message: 'Test Error' }}
      resetErrorBoundary={tryAgainFn}
    />);
    const retryBtn = getByRole('button');
    await act(() => {
      fireEvent.click(retryBtn);
    });
    expect(tryAgainFn).toHaveBeenCalledTimes(1);
  });
});
