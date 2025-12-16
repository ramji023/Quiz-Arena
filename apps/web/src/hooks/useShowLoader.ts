import { UseQueryResult } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function useShowLoader<TData>(
  query: UseQueryResult<TData>,
  minLoadingTime: number = 500
) {
  const [showLoader, setShowLoader] = useState(query.isLoading);
  const [loadStartTime, setLoadStartTime] = useState<number | null>(null);

  useEffect(() => {
    // When loading starts
    if (query.isLoading && loadStartTime === null) {
      setLoadStartTime(Date.now());
      setShowLoader(true);
    }

    // When loading finishes
    if (!query.isLoading && loadStartTime !== null) {
      const elapsedTime = Date.now() - loadStartTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime);

      const timer = setTimeout(() => {
        setShowLoader(false);
        setLoadStartTime(null);
      }, remainingTime);

      return () => clearTimeout(timer);
    }
  }, [query.isLoading, loadStartTime, minLoadingTime]);

  return { ...query, isLoading: showLoader };
}
