import { type RefObject } from "react";

export type UseInfiniteScrollOptions = {
  hasNext: boolean;
  fetchMore: () => void;
  isFetching: boolean;
};

export type UseInfiniteScroll<T, R> = {
  targetRef: RefObject<T>;
  rootRef: RefObject<R>;
};
