import { type ChangeEvent, type FormEvent, useState } from "react";
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

const PHONE_INPUT_MAX_LENGTH = 9;
const PHONE_PREFIX = "+972";

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const [formData, setFormData] = useState<LoginFormData>(initialFormData);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLButtonElement>): void => {
    const updatedFormData: LoginFormData = {
      ...formData,
      phoneNumber: `${PHONE_PREFIX}${formData.phoneNumber}`,
    };
    onSubmit(updatedFormData);
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
              inputMode={"tel"}
              value={formData.phoneNumber}
              onChange={handleInputChange}
              helperText={" "}
              variant={"filled"}
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start">
                    {PHONE_PREFIX}
                  </InputAdornment>
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
