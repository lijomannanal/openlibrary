import React, { useEffect, useState, useCallback } from 'react';
import './style.scss';
import remoteAPI from '../../service/remoteApi';
import { SUBJECTS_API, WORKS_API } from '../../constants';
import useLoader from '../../hooks/useLoader';
import Loader from '../Loader';
import BookDetails from './BookDetails';
import StyledTable from '../Table';
import ErrorHandler from '../ErrorHandler';
import Pagination from '../Pagination';

interface IAuthors {
  key: string,
  name: string
}

interface IWorks {
  key: string,
  title: string,
  edition_count: string
  cover_id: number,
  cover_edition_key: string,
  first_publish_year: null | number,
  has_fulltext: boolean,
  ia: string,
  ia_collection: string[],
  lendinglibrary: boolean,
  lending_edition: string,
  lending_identifier: string,
  printdisabled: boolean
  public_scan: boolean,
  subject: string[],
  availability: any,
  authors: IAuthors[]
}

interface IBookResponse {
  key: string,
  name: string,
  subject_type: string
  work_count: number,
  works: IWorks[]
}

interface IBook {
  title: string,
  authors: string[],
  id: string
}

interface IBookDetailsResponse {
  first_publish_date: string,
  description: string,
  subject_times: string[],
}
interface IBookDetails {
  title: string,
  authors: string[],
  description: string,
  publishDate: string,
  subjectTimes: string[]
}
interface IError {
  message: string,
}

const initialState = {
  title: '', authors: [], description: '', publishDate: '', subjectTimes: [],
};

const columns = [
  {
    name: 'Title',
    field: 'title',
    type: 'string',
  },
  {
    name: 'Author(s)',
    field: 'authors',
    type: 'list',
  },
];

const AppLayout = (): JSX.Element => {
  const [booksList, setBooksList] = useState<IBook[] | []>([]);
  const [bookDetails, setBookDetails] = useState<IBookDetails>(initialState);
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const { isLoading, showLoader, hideLoader } = useLoader();
  const [error, setError] = useState<IError | null>();
  const [currentPage, setcurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const getBooksList = useCallback(async () => {
    showLoader();
    const offset = (currentPage - 1) * 10;
    const queryString = `?limit=10&offset=${offset}`;
    const books = await remoteAPI.get<IBookResponse>(`${SUBJECTS_API}${queryString}`);
    setTotalCount(books.work_count);
    if (books.works && books.works.length) {
      const data = books.works.map((book) => ({
        title: book.title,
        authors: book.authors ? book.authors.map((author) => author.name) : [],
        id: book.key.split('/')[2],
      }));
      setBooksList(data);
    }
    hideLoader();
  }, [currentPage]);

  const getBooksDetails = useCallback(async (book: IBook) => {
    const { id, authors, title } = book;
    setOpenPopup(true);
    try {
      const bookResponse = await remoteAPI.get<IBookDetailsResponse>(`${WORKS_API}/${id}.json`);
      if (bookResponse) {
        const {
          description = '', first_publish_date: publishDate = '',
          subject_times: subjectTimes = [],
        } = bookResponse;
        setBookDetails({
          description, publishDate, subjectTimes, authors, title,
        });
      }
    } catch (err: any) {
      setError(err);
      setOpenPopup(false);
    }
  }, []);

  const handleClose = () => {
    setOpenPopup(false);
    setBookDetails(initialState);
  };

  useEffect(() => {
    getBooksList().catch((err) => {
      setBooksList([]);
      setError(err);
      hideLoader();
    });
  }, [getBooksList]);

  const reloadPage = () => {
    document.location.reload();
  };

  return (
    <>
      { isLoading && <Loader />}
      <div className="page-container">
        { error && (
          <div className="error-block">
            <ErrorHandler error={error} resetErrorBoundary={reloadPage} />
          </div>
        )}
        <StyledTable
          data={booksList}
          columns={columns}
          onRowClick={(book) => getBooksDetails(book)}
        />
        <Pagination totalCount={totalCount} itemsPerPage={10} currentPage={currentPage} onPagevisit={setcurrentPage} />
      </div>
      { openPopup && <BookDetails onClose={handleClose} data={bookDetails} />}
    </>
  );
};

export default AppLayout;
