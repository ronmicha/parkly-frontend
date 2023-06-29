import { type ChangeEvent, type FormEvent, useState } from "react";

export type LoginFormData = {
  phoneNumber: string;
  password: string;
};

type UseForm<T> = {
  formData: T;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

type LoginFormProps = {
  onSubmit: (formData: LoginFormData) => void;
};

const initialFormData: LoginFormData = {
  phoneNumber: "",
  password: "",
};

// eslint-disable-next-line @typescript-eslint/comma-dangle
const useForm = <T,>(initialFormData?: T): UseForm<T> => {
  const [formData, setFormData] = useState<T>(initialFormData);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return { formData, handleInputChange };
};

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const { formData, handleInputChange } = useForm(initialFormData);

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    onSubmit(formData);
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name={"phoneNumber"}
        placeholder={"Phone number"}
        value={formData.phoneNumber}
        onChange={handleInputChange}
      />
      <input
        name={"password"}
        placeholder={"Password"}
        type={"password"}
        value={formData.password}
        onChange={handleInputChange}
      />
      <input type="submit" value="Login" />
    </form>
  );
};
