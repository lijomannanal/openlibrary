import { useState } from 'react';

const useLoader = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const showLoader = () => {
    setIsLoading(true);
  };
  const hideLoader = () => setIsLoading(false);
  return { isLoading, showLoader, hideLoader };
};
export default useLoader;
