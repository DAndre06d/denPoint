import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const useFetch = (url, params = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use useCallback with params spread directly
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(url, { params });
      setData(response.data);
      setError(null);
    } catch (e) {
      setData(null);
      setError(e.response?.data?.message || e.message || 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, [url, params]); // Ensure params is included as a dependency

  useEffect(() => {
    fetchData();
  }, [fetchData]); // Ensure fetchData is stable

  return { data, loading, error };
};

export default useFetch;