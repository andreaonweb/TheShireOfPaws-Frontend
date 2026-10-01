import { useCallback, useEffect, useState } from 'react';
import { getErrorMessage } from '../services/api';

const useFetch = (fetcher, { initialData = null, errorMessage } = {}) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setData(await fetcher());
    } catch (err) {
      setError(getErrorMessage(err, errorMessage));
    } finally {
      setLoading(false);
    }
  }, [fetcher, errorMessage]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, loading, error, refetch };
};

export default useFetch;
