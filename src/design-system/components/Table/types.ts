import { type ReactNode } from "react";

export type ID = string;

export type TableHeader = {
  id: ID;
  value: string | JSX.Element;
};

export type TableRow = {
  id: ID;
  data: Record<ID, ReactNode | string | number>;
};

type InfiniteScrollProps = {
  fetchMore: () => void;
  hasNext: boolean;
  isFetching: boolean;
  loader?: ReactNode;
};

export type TableProps = {
  rows: TableRow[];
  headers: TableHeader[];
  onRowClick?: (rowId: ID) => void;
  onRowDoubleClick?: (rowId: ID, rowData: TableRow["data"]) => void;
  selectedRowId?: ID;
  testId?: string;
  stickyHeader?: boolean;
  infiniteScrollProps?: InfiniteScrollProps;
  className?: string;
  monitoringActionAttribute?: string;
};
