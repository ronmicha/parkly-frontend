import { type ReactNode } from "react";
import { GridToolbarContainer } from "@mui/x-data-grid";
import { Button } from "../../../design-system/components";

export type ToolbarButtonProps = {
  label: string;
  onClick: () => void;
  startIcon?: ReactNode;
  testId?: string;
};

type AdminTableToolbarProps = {
  buttons: ToolbarButtonProps[];
};

export const GenericAdminTableToolbar = ({
  buttons,
}: AdminTableToolbarProps) => {
  return (
    <GridToolbarContainer>
      {buttons.map(({ label, onClick, startIcon, testId }) => (
        <Button
          key={label}
          color="primary"
          startIcon={startIcon}
          onClick={onClick}
          data-testid={testId}
        >
          {label}
        </Button>
      ))}
    </GridToolbarContainer>
  );
};
