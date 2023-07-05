import { GridToolbarContainer } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

type AddUserToolbarProps = {
  label: string;
  onClick: () => void;
};

export const AddUserToolbar = ({ onClick, label }: AddUserToolbarProps) => {
  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={onClick}>
        {label}
      </Button>
    </GridToolbarContainer>
  );
};
