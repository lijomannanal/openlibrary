import React from 'react';
import {
  render, within, screen, fireEvent,
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import booksList from './books.json';
import booksList20 from './booksList20.json';

import Home from '../components/Home/Home';
import remoteAPI from '../service/remoteApi';
import { SUBJECTS_API, WORKS_API } from '../constants';

describe('Home Component', () => {
  let mockAPI: any;
  beforeEach(() => {
    jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
    mockAPI = jest.spyOn(remoteAPI, 'get');
  });

  test('should render Home component with  table and column headers: Title and Author(s)', () => {
    const { getByRole } = render(<Home />);
    expect(getByRole('table')).toBeInTheDocument();
    expect(getByRole('columnheader', { name: 'Title' })).toBeInTheDocument();
    expect(getByRole('columnheader', { name: 'Author(s)' })).toBeInTheDocument();
  });

  test('should invoke API call to load books', () => {
    render(<Home />);
    expect(remoteAPI.get).toHaveBeenCalledTimes(1);
    expect(remoteAPI.get).toHaveBeenCalledWith(`${SUBJECTS_API}?limit=10&offset=0`);
  });

  test('should show the same number books from the API response', async () => {
    mockAPI.mockResolvedValueOnce(booksList); // Number of works = 2
    await act(async () => {
      render(<Home />);
    });
    const rowgroups = screen.getAllByRole('rowgroup') as HTMLElement[];
    const dataRows = within(rowgroups[1]).getAllByRole('row');
    expect(dataRows).toHaveLength(2);
  });

  test('should show the error message if the API failed', async () => {
    mockAPI.mockRejectedValueOnce({ message: 'Unable to fetch' }); // Number of works = 2
    await act(async () => {
      render(<Home />);
    });
    const errorDiv = screen.getByTestId('error-alert');
    expect(errorDiv).toBeInTheDocument();
  });

  test('should call the book list API to fetch books on page navigation', async () => {
    mockAPI.mockResolvedValueOnce(booksList20); // Number of works = 20
    await act(async () => {
      render(<Home />);
    });
    const paginationLinks = screen.getAllByRole('tab') as HTMLElement[];
    await act(async () => {
      fireEvent.click(paginationLinks[2]);
    });
    expect(remoteAPI.get).toHaveBeenCalledTimes(2);
    expect(remoteAPI.get).toHaveBeenCalledWith(`${SUBJECTS_API}?limit=10&offset=0`);
    expect(remoteAPI.get).toHaveBeenCalledWith(`${SUBJECTS_API}?limit=10&offset=10`);
  });

  test('should call the book details API to fetch book details', async () => {
    mockAPI.mockResolvedValueOnce(booksList); // Number of works = 2
    await act(async () => {
      render(<Home />);
    });
    const tbody = screen.getAllByRole('rowgroup') as HTMLElement[];
    const dataRows = within(tbody[1]).getAllByRole('row');
    await act(async () => {
      fireEvent.click(dataRows[0]);
    });
    expect(remoteAPI.get).toHaveBeenCalledTimes(2);
    expect(remoteAPI.get).toHaveBeenCalledWith(`${SUBJECTS_API}?limit=10&offset=0`);
    expect(remoteAPI.get).toHaveBeenCalledWith(`${WORKS_API}/OL21177W.json`);
  });

  test('should show the book details popup on clicking the row', async () => {
    mockAPI.mockResolvedValueOnce(booksList); // Number of works = 2
    await act(async () => {
      render(<Home />);
    });
    const tbody = screen.getAllByRole('rowgroup') as HTMLElement[];
    const dataRows = within(tbody[1]).getAllByRole('row');
    await act(async () => {
      fireEvent.click(dataRows[0]);
    });
    expect(screen.getByTestId('popup')).toBeInTheDocument();
  });
});
