import React from 'react';
import {
  render,
} from '@testing-library/react';
import BookDetails from '../components/Home/BookDetails';

describe('Loader Component', () => {
  const data = {
    title: 'Book1',
    authors: ['Author1', 'Author2'],
    description: 'Test Description',
    publishDate: '1932',
    subjectTimes: ['20th century'],
  };

  test('should render BookDetails component', () => {
    const closeFn = jest.fn();
    const { getByText } = render(<BookDetails data={data} onClose={closeFn} />);
    expect(getByText('Description: Test Description')).toBeInTheDocument();
    expect(getByText('Authors: Author1 , Author2')).toBeInTheDocument();
    expect(getByText('Published date: 1932')).toBeInTheDocument();
    expect(getByText('Times: 20th century')).toBeInTheDocument();
  });
});
