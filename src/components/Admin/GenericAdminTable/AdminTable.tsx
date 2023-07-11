import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import {
  DataGrid,
  type DataGridProps,
  type GridEventListener,
  GridRowEditStopReasons,
  type GridRowId,
  GridRowModes,
  type GridRowModesModel,
} from "@mui/x-data-grid";
import {
  AdminTableToolbar,
  type ToolbarButtonProps,
} from "./AdminTableToolbar";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

type AdminTableProps = Pick<
  DataGridProps,
  | "className"
  | "rows"
  | "columns"
  | "rowModesModel"
  | "processRowUpdate"
  | "checkboxSelection"
  | "disableRowSelectionOnClick"
  | "loading"
> & {
  setRowModesModel: Dispatch<SetStateAction<GridRowModesModel>>;
  onAddClick: () => void;
  onDeleteClick: (selectedRowIds: string[]) => void;
};

export const AdminTable = (props: AdminTableProps) => {
  const { setRowModesModel, onAddClick, onDeleteClick, ...dataGridProps } =
    props;

  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const [toolbarButtons, setToolbarButtons] = useState<ToolbarButtonProps[]>(
    []
  );

  useEffect(() => {
    if (selectedRowIds.length === 0) {
      setToolbarButtons([addButtonProps]);
    } else {
      setToolbarButtons([addButtonProps, deleteButtonProps]);
    }
  }, [selectedRowIds.length]);

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event,
    details
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

  const addButtonProps: ToolbarButtonProps = {
    label: "Add user",
    onClick: onAddClick,
    startIcon: <AddIcon />,
  };

  const deleteButtonProps: ToolbarButtonProps = {
    label: "Delete",
    onClick: () => {
      onDeleteClick(selectedRowIds);
    },
    startIcon: <DeleteIcon />,
  };

  return (
    <DataGrid
      {...dataGridProps}
      style={{ height: "calc(100% - 91px)" }}
      rowSelectionModel={selectedRowIds}
      onRowSelectionModelChange={handleRowSelection}
      onRowModesModelChange={setRowModesModel}
      editMode={"row"}
      onRowEditStop={handleRowEditStop}
      slots={{ toolbar: AdminTableToolbar }}
      slotProps={{ toolbar: { buttons: toolbarButtons } }}
    />
  );
};
