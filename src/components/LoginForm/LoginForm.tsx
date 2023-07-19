import { type FormEvent } from "react";
import { useForm } from "../../hooks";
import {
  Box,
  Button,
  Input,
  Stack,
  Typography,
} from "../../design-system/components";
import { InputAdornment } from "@mui/material";

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
    <Box sx={{ width: 0.8 }}>
      <Stack gap={5}>
        <Typography variant={"h4"} sx={{ fontWeight: "fontWeightBold" }}>
          Login to Parkly
        </Typography>
        <form>
          <Stack gap={0}>
            <Input
              name={"phoneNumber"}
              label={"Enter your phone number"}
              type={"number"}
              value={formData.phoneNumber}
              onChange={handleInputChange}
              helperText={" "}
              variant={"filled"}
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start">+972</InputAdornment>
                ),
              }}
            />
            <Input
              name={"password"}
              label={"Password"}
              type={"password"}
              value={formData.password}
              onChange={handleInputChange}
              helperText={" "}
              variant={"filled"}
              InputProps={{ disableUnderline: true }}
              InputLabelProps={{ shrink: true }}
            />
            <Button
              sx={{ p: 2 }}
              type="submit"
              variant="contained"
              onClick={handleSubmit}
            >
              Login
            </Button>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
};
