import { type FormEvent } from "react";
import { useForm } from "../../hooks";
import {
  Box,
  Button,
  Input,
  Stack,
  Typography,
} from "../../design-system/components";

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

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const { formData, handleInputChange } = useForm(initialFormData);

  const handleSubmit = (event: FormEvent<HTMLButtonElement>): void => {
    onSubmit(formData);
    event.preventDefault();
  };

  return (
    <Box sx={{ p: 5 }}>
      <Stack gap={2}>
        <Typography variant={"h4"}>Login to Parkly</Typography>
        <form>
          <Stack gap={2}>
            <Input
              name={"phoneNumber"}
              label={"Phone number"}
              type={"number"}
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
            <Input
              name={"password"}
              label={"Password"}
              type={"password"}
              value={formData.password}
              onChange={handleInputChange}
            />
            <Button type="submit" variant="contained" onClick={handleSubmit}>
              Login
            </Button>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
};
