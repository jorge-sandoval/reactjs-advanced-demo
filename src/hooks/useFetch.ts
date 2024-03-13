import { useEffect, useState } from "react";
import { parseLinkHeader } from "../api/parseLinkHeader";
import PageLinks from "../models/page-links";

export const useFetch = (url: string) => {
  const [data, setData] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState<PageLinks>({});

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, { signal: abortController.signal });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
        
        const linkHeader = response.headers.get('Link') || '';
        const parsedPagination = parseLinkHeader(linkHeader);
        setPagination(parsedPagination);
        console.log('pagination:', parsedPagination);
        console.log('fetch page:', url, result.length);

        setLoading(false);

      } catch (error: Error) {
        if (error.name !== 'AbortError') {
          setError(error);
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [url]);

  return { data, loading, error, pagination };
};