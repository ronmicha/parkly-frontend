import { type ChangeEvent, type FormEvent, useEffect, useState } from "react";
import {
  Box,
  Button,
  InputAdornment,
  Stack,
  Typography,
} from "../../design-system/components";
import { LoginFormInput } from "./LoginFormInput";

const PHONE_PREFIX = "+972";
const PHONE_REGEX = /^\d{9}$/;

enum InputNames {
  Phone = "phoneNumber",
  Password = "password",
}

export type LoginFormData = {
  [InputNames.Phone]: string;
  [InputNames.Password]: string;
};

const initialFormData: LoginFormData = {
  [InputNames.Phone]: "",
  [InputNames.Password]: "",
};

type LoginFormProps = {
  onSubmit: (formData: LoginFormData) => void;
  loginError: boolean;
};

export const LoginForm = ({ onSubmit, loginError }: LoginFormProps) => {
  const [formData, setFormData] = useState<LoginFormData>(initialFormData);
  const [validPhoneNumber, setValidPhoneNumber] = useState<boolean>(true);

  const { phoneNumber, password } = formData;

  useEffect(() => {
    setValidPhoneNumber(true);
  }, [phoneNumber]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLButtonElement>): void => {
    event.preventDefault();

    if (!PHONE_REGEX.test(phoneNumber)) {
      setValidPhoneNumber(false);
      return;
    }

    const updatedFormData: LoginFormData = {
      [InputNames.Phone]: `${PHONE_PREFIX}${phoneNumber}`,
      [InputNames.Password]: password,
    };
    onSubmit(updatedFormData);
  };

  return (
    <Box sx={{ width: 0.67 }}>
      <Stack gap={5}>
        <Typography variant={"h4"} sx={{ fontWeight: "fontWeightBold" }}>
          Login to Parkly
        </Typography>
        <Box component={"form"}>
          <Stack gap={1}>
            <LoginFormInput
              name={InputNames.Phone}
              value={phoneNumber}
              onChange={handleInputChange}
              header={"Enter your phone number"}
              type={"number"}
              error={!validPhoneNumber}
              helperText={validPhoneNumber ? " " : "Invalid phone number"}
              inputProps={{ inputMode: "tel", pattern: "^\\d{9}$" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {PHONE_PREFIX}
                  </InputAdornment>
                ),
              }}
            />
            <LoginFormInput
              name={InputNames.Password}
              value={password}
              onChange={handleInputChange}
              header={"Enter password"}
              type={"password"}
              helperText={" "}
            />
            <Button
              sx={{ p: 2 }}
              type="submit"
              variant="contained"
              onClick={handleSubmit}
            >
              Login
            </Button>
            <Typography variant={"subtitle2"} sx={{ color: "error.main" }}>
              {loginError ? "Phone or password are incorrect" : " "}
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};
