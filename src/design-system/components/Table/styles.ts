import {
  TableBody as MuiTableBody,
  TableCell as MuiTableCell,
  TableContainer as MuiTableContainer,
  TableHead as MuiTableHead,
  TableRow as MuiTableRow,
} from "@mui/material";

import styled from "@emotion/styled";
import { getSize, getSpacing } from "../../utils";

export const StyledTableContainer = MuiTableContainer;

export const StyledTableBody = MuiTableBody;

export const StyledTableHead = MuiTableHead;

export const StyledTableRow = styled(MuiTableRow)``;
// (({ theme }) => {
//   const { duration, easing } = theme.transitions;
//
//   return css`
//     &.MuiTableRow-root {
//       cursor: pointer;
//       transition: ${duration.shortest}ms ${easing.easeInOut} 0ms;
//
//       &:hover {
//         background-color: ${getBaseColor("bright-gray")};
//       }
//
//       &.Mui-selected {
//         background-color: ${getBaseColor("pickled-blue")};
//
//         &:hover {
//           background-color: ${getBaseColor("rhino-blue")};
//         }
//
//         .MuiTableCell-root:first-of-type {
//           ${getActiveIndicator(80)};
//         }
//       }
//     }
//   `;
// });

export const StyledTableCell = styled(MuiTableCell)`
  &.MuiTableCell-root {
    height: ${getSize(20)};
    vertical-align: top;
    border-bottom: 1px solid black;
    max-width: 10vw;
    padding: ${getSize(3)} ${getSize(2)};
  }

  &.MuiTableCell-head {
    height: ${getSize(6.25)};
    padding: ${getSpacing(1)} ${getSpacing(1)} ${getSpacing(2)} ${getSpacing(2)};
    cursor: default;

    &:hover {
      background-color: gray;
    }
  }

  &.MuiTableCell-stickyHeader {
    background-color: gray;
  }
`;

export const StyledLoaderRow = styled(MuiTableRow)`
  position: relative;
`;

export const StyledLoaderContainer = styled.div`
  position: absolute;
  top: ${getSize(4)};
  left: 50%;
`;
