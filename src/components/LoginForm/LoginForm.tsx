import { type FormEvent } from "react";
import { useForm } from "../../hooks";

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
