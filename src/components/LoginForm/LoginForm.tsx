import { type FormEvent } from "react";
import { useForm } from "../../hooks";
import { Box, Button, Input, Typography } from "../../design-system/components";
import { type SxProps } from "@mui/system";

type LoginFormProps = {
  onSubmit: (formData: LoginFormData) => void;
};
export type LoginFormData = {
  phoneNumber: string;
  password: string;
};

const initialFormData: LoginFormData = {
  phoneNumber: "",
  password: "",
};

const sx: SxProps = {
  marginBlockEnd: 2,
  width: 1,
};

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const { formData, handleInputChange } = useForm(initialFormData);

  const handleSubmit = (event: FormEvent<HTMLButtonElement>): void => {
    onSubmit(formData);
    event.preventDefault();
  };

  return (
    <Box sx={{ width: 0.7 }}>
      <Typography variant={"h4"} sx={{ marginBlockEnd: 2 }}>
        Login to Parkly
      </Typography>
      <form>
        <Input
          sx={sx}
          name={"phoneNumber"}
          placeholder={"Phone number"}
          value={formData.phoneNumber}
          onChange={handleInputChange}
        />
        <Input
          sx={sx}
          name={"password"}
          placeholder={"Password"}
          type={"password"}
          value={formData.password}
          onChange={handleInputChange}
        />
        <Button
          type="submit"
          variant="contained"
          onClick={handleSubmit}
          sx={{ ...sx, height: 0.25 }}
        >
          Login
        </Button>
      </form>
    </Box>
  );
};
