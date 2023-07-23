import { type ChangeEvent, type FormEvent, useEffect, useState } from "react";
import {
  Box,
  Button,
  Input,
  InputAdornment,
  Stack,
  Typography,
} from "../../design-system/components";

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
    <Box sx={{ width: 0.8 }}>
      <Stack gap={5}>
        <Typography variant={"h4"} sx={{ fontWeight: "fontWeightBold" }}>
          Login to Parkly
        </Typography>
        <form>
          <Stack gap={2}>
            <Input
              name={InputNames.Phone}
              value={phoneNumber}
              onChange={handleInputChange}
              type={"number"}
              inputMode={"tel"}
              label={"Enter your phone number"}
              variant={"filled"}
              error={!validPhoneNumber}
              helperText={validPhoneNumber ? " " : "Invalid phone number"}
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
              name={InputNames.Password}
              value={password}
              onChange={handleInputChange}
              type={"password"}
              label={"Password"}
              variant={"filled"}
              helperText={" "}
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
            <Typography variant={"subtitle2"} sx={{ color: "error.main" }}>
              {loginError ? "Phone or password are incorrect" : " "}
            </Typography>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
};
