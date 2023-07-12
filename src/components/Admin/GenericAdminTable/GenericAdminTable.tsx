import { useEffect, useState } from "react";
import {
  DataGrid,
  type DataGridProps,
  type GridColDef,
  type GridEventListener,
  GridRowEditStopReasons,
  type GridRowId,
  type GridRowModel,
  GridRowModes,
  type GridRowModesModel,
} from "@mui/x-data-grid";
import {
  GenericAdminTableToolbar,
  type ToolbarButtonProps,
} from "./GenericAdminTableToolbar";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  type GridRowsProp,
  type GridValidRowModel,
} from "@mui/x-data-grid/models/gridRows";

export type GenericRow<R> = GridRowModel<R>;

export type GenericCol = GridColDef;

type AdminTableProps<Data, Row> = Pick<
  DataGridProps,
  | "className"
  | "columns"
  | "processRowUpdate"
  | "checkboxSelection"
  | "disableRowSelectionOnClick"
  | "loading"
> & {
  data?: Data[];
  convertDataToRow: (data: Data) => Row;
  createEmptyRow: () => Row;
  onDelete: (selectedRowIds: string[]) => void;
};

export const GenericAdminTable = <Data, Row extends GridValidRowModel>(
  props: AdminTableProps<Data, Row>
) => {
  const {
    className,
    data,
    columns,
    processRowUpdate,
    convertDataToRow,
    createEmptyRow,
    onDelete,
    checkboxSelection = true,
    disableRowSelectionOnClick = true,
    loading,
  } = props;

  const [rows, setRows] = useState<GridRowsProp<Row>>([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const [toolbarButtons, setToolbarButtons] = useState<ToolbarButtonProps[]>(
    []
  );

  useEffect(() => {
    if (data) {
      const rows = data!.map(convertDataToRow);
      setRows(rows);
    }
  }, [data]);

  useEffect(() => {
    if (selectedRowIds.length === 0) {
      setToolbarButtons([addButtonProps]);
    } else {
      setToolbarButtons([addButtonProps, deleteButtonProps]);
    }
  }, [selectedRowIds.length]);

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }

    setRowModesModel((oldModel) => ({
      ...oldModel,
      [params.id]: { mode: GridRowModes.View },
    }));
  };

  const handleRowSelection = (selectedRowIds: GridRowId[]): void => {
    setSelectedRowIds(selectedRowIds as string[]);
  };

  const handleProcessRowUpdate = (
    newRow: GridRowModel,
    oldRow: GridRowModel
  ) => {
    const updatedRow = processRowUpdate?.(newRow, oldRow);

    setRows((prevRows) =>
      prevRows!.map((row) => (row.id === newRow.id ? updatedRow : row))
    );
    return updatedRow;
  };

  const handleAddClick = (): void => {
    const emptyRow = createEmptyRow();

    setRows((prevRows) => [...prevRows!, emptyRow]);
    setRowModesModel((prevModel) => ({
      ...prevModel,
      [emptyRow.id]: {
        mode: GridRowModes.Edit,
        fieldToFocus: columns[0].field,
      },
    }));
  };

  const handleDeleteClick = (userIds: string[]): void => {
    onDelete(selectedRowIds);
    setRows((prevRows) => prevRows!.filter((row) => !userIds.includes(row.id)));
  };

  const addButtonProps: ToolbarButtonProps = {
    label: "Add",
    onClick: handleAddClick,
    startIcon: <AddIcon />,
  };

  const deleteButtonProps: ToolbarButtonProps = {
    label: "Delete",
    onClick: () => {
      handleDeleteClick(selectedRowIds);
    },
    startIcon: <DeleteIcon />,
  };

  return (
    <DataGrid
      style={{ height: "calc(100% - 91px)" }}
      className={className}
      rows={rows}
      columns={columns}
      editMode={"row"}
      processRowUpdate={handleProcessRowUpdate}
      rowSelectionModel={selectedRowIds}
      onRowSelectionModelChange={handleRowSelection}
      rowModesModel={rowModesModel}
      onRowModesModelChange={setRowModesModel}
      onRowEditStop={handleRowEditStop}
      checkboxSelection={checkboxSelection}
      disableRowSelectionOnClick={disableRowSelectionOnClick}
      loading={loading}
      slots={{ toolbar: GenericAdminTableToolbar }}
      slotProps={{ toolbar: { buttons: toolbarButtons } }}
    />
  );
};
