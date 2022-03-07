import React from 'react';
import {
  render, fireEvent, act,
} from '@testing-library/react';
import Popup from '../components/Popup';

describe('Popup Component', () => {
  const title = <h2>Test Title</h2>;
  const body = <div>Test Body</div>;

  let closeFn: jest.Mock<any, any>;
  beforeEach(() => {
    closeFn = jest.fn();
  });

  test('should render Popup component', () => {
    const { getByTestId } = render(<Popup
      title={title}
      body={body}
      onClose={closeFn}
    />);
    expect(getByTestId('popup')).toBeInTheDocument();
  });

  test('should render popup component with the title passed as prop', () => {
    const { getByRole } = render(<Popup
      title={title}
      body={body}
      onClose={closeFn}
    />);
    expect(getByRole('heading', { name: 'Test Title' })).toBeInTheDocument();
  });

  test('should call the close callback prop', () => {
    const { getByTitle } = render(<Popup
      title={title}
      body={body}
      onClose={closeFn}
    />);
    const closeBtn = getByTitle('Close');
    act(() => {
      fireEvent.click(closeBtn);
    });
    expect(closeFn).toHaveBeenCalledTimes(1);
  });
});
