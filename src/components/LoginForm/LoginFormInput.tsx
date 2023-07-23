import { InputLabel } from "@mui/material";
import { Input, type InputProps, Stack } from "../../design-system/components";

type LoginFormInputProps = Pick<
  InputProps,
  | "name"
  | "value"
  | "onChange"
  | "type"
  | "error"
  | "helperText"
  | "inputProps"
  | "InputProps"
> & { header: string };

export const LoginFormInput = (props: LoginFormInputProps) => {
  const { header, ...restProps } = props;

  return (
    <Stack alignItems={"start"}>
      <InputLabel htmlFor={restProps.name} sx={{ mx: 1, mb: 1 }}>
        {header}
      </InputLabel>
      <Input sx={{ width: "100%" }} id={restProps.name} {...restProps} />
    </Stack>
  );
};
