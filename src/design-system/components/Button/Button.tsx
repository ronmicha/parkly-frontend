import {
  Button as MuiButton,
  type ButtonProps as MuiButtonProps,
} from "@mui/material";

export type ButtonProps = Omit<MuiButtonProps, "disableElevation">;

export const Button = (props: ButtonProps) => {
  return (
    <MuiButton
      {...props}
      disableElevation
      sx={{
        ...props.sx,
        fontWeight: "fontWeightRegular",
        textTransform: "none",
      }}
    />
  );
};
