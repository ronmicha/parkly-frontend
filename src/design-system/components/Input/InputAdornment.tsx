import {
  InputAdornment as MuiInputAdornment,
  type InputAdornmentProps as MuiInputAdornmentProps,
} from "@mui/material";

export type InputAdornmentProps = MuiInputAdornmentProps;

export const InputAdornment = (props: InputAdornmentProps) => {
  return <MuiInputAdornment {...props} />;
};
