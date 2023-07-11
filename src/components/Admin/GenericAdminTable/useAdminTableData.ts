import { useState } from "react";
import {
  type GridRowModesModel,
  type GridRowsProp,
  type GridValidRowModel,
} from "@mui/x-data-grid";

export const useAdminTableData = <R extends GridValidRowModel>() => {
  const [rows, setRows] = useState<GridRowsProp<R>>([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  return {
    rows,
    setRows,
    rowModesModel,
    setRowModesModel,
  };
};
