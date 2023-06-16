import { Table as MuiTable } from "@mui/material";

import { Loading } from "../Loading";
import {
  StyledLoaderContainer,
  StyledLoaderRow,
  StyledTableBody,
  StyledTableCell,
  StyledTableContainer,
  StyledTableHead,
  StyledTableRow,
} from "./styles";
import { type TableProps } from "./types";
import { useInfiniteScroll } from "./useInfiniteScroll";

const Table = ({ infiniteScrollProps, ...props }: TableProps): JSX.Element => {
  const { targetRef } =
    useInfiniteScroll<HTMLTableRowElement>(infiniteScrollProps);

  return (
    <StyledTableContainer className={props.className || ""}>
      <MuiTable
        data-testid={props.testId || "table-test-id"}
        stickyHeader={!!props.stickyHeader}
      >
        <StyledTableHead>
          <StyledTableRow data-testid={"table-header-row"}>
            {props.headers.map((header) => (
              <StyledTableCell key={header.id}>{header.value}</StyledTableCell>
            ))}
          </StyledTableRow>
        </StyledTableHead>

        <StyledTableBody>
          {props.rows.map((row, index) => (
            <StyledTableRow
              key={row.id}
              id={row.id}
              data-testid={`table-row-${index}`}
              onClick={() => props.onRowClick?.(row.id)}
              onDoubleClick={() => props.onRowDoubleClick?.(row.id, row.data)}
              selected={row.id === props.selectedRowId}
            >
              {props.headers.map((header) => (
                <StyledTableCell key={row.id}>
                  {row.data[header.id]}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
          {infiniteScrollProps?.hasNext && (
            <StyledLoaderRow ref={targetRef}>
              <StyledLoaderContainer>
                {infiniteScrollProps?.loader ?? <Loading size={32} />}
              </StyledLoaderContainer>
            </StyledLoaderRow>
          )}
        </StyledTableBody>
      </MuiTable>
    </StyledTableContainer>
  );
};

export default Table;
