import { useEffect, useRef } from "react";

import { type UseInfiniteScroll, type UseInfiniteScrollOptions } from "./types";

const useInfiniteScroll = <
  T extends Element | null,
  R extends Element | null = null
>(
  options?: UseInfiniteScrollOptions
): UseInfiniteScroll<T, R> => {
  const targetRef = useRef<T>(null);
  const rootRef = useRef<R>(null);

  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = ([entry]) => {
      if (!options) {
        return;
      }
      const { hasNext, isFetching, fetchMore } = options;
      if (entry.isIntersecting && hasNext && !isFetching) {
        fetchMore();
      }
    };

    // @ts-ignore
    const observerOptions: IntersectionObserverInit = {
      root: rootRef.current,
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [options]);

  return { rootRef, targetRef };
};

export { useInfiniteScroll };
