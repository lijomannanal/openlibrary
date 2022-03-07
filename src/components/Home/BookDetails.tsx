import React, { useEffect } from 'react';
import './style.scss';
import Popup from '../Popup';
import useLoader from '../../hooks/useLoader';
import Loader from '../Loader';

interface IBookDetails {
  title: string,
  authors: string[],
  description: string | any,
  publishDate: string,
  subjectTimes: string[]
}

type AppProps = {
  data: IBookDetails,
  onClose:() => void,
};

const BookDetails = ({ data, onClose }: AppProps) => {
  const { showLoader, hideLoader, isLoading } = useLoader();

  useEffect(() => {
    showLoader();
  }, []);

  useEffect(() => {
    if (Object.keys(data).length && data.title) {
      hideLoader();
    }
  }, [data]);

  const {
    title, authors, description, publishDate, subjectTimes,
  } = data;
  const popupTitle = <h2>{title}</h2>;
  const popupBody = (
    <>
      <div>
        Description:
        {' '}
        {typeof description === 'object' ? description.value : description}
      </div>
      <div>
        Authors:
        {' '}
        { authors.join(' , ')}
      </div>
      <div>
        Published date:
        {' '}
        {publishDate}
        {' '}
      </div>
      <div>
        Times:
        {' '}
        { subjectTimes.join(' , ')}
      </div>
    </>
  );

  return (
    <>
      { isLoading && <Loader />}
      <Popup onClose={onClose} title={popupTitle} body={popupBody} />
      ;
    </>
  );
};

export default BookDetails;
