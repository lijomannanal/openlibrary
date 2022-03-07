import React from 'react';

type Props = {
  error: {
    message: string
  },
  resetErrorBoundary: ()=> void
};
const ErrorHandler = ({ error, resetErrorBoundary }: Props) => (
  <div data-testid="error-alert" role="alert">
    <p>Something went wrong:</p>
    <pre>{error.message}</pre>
    <pre>
      Please check the API response!
      The API might have returned wrong values for parameters
    </pre>
    <button type="button" onClick={resetErrorBoundary}>Try again</button>
  </div>
);
export default ErrorHandler;
