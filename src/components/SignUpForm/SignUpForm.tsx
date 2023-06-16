import { type ChangeEvent, type FormEvent, useState } from "react";

export type FormData = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  vehicleIds: string[];
};

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  email: "",
  vehicleIds: [],
};

type SignUpFormProps = {
  onSubmit: (formData: FormData) => void;
};

export const SignUpForm = ({ onSubmit }: SignUpFormProps) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    onSubmit(formData);
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name={"firstName"}
        placeholder={"First name"}
        value={formData.firstName}
        onChange={handleInputChange}
      />
      <input
        name={"lastName"}
        placeholder={"Last name"}
        value={formData.lastName}
        onChange={handleInputChange}
      />
      <input
        name={"phoneNumber"}
        placeholder={"Phone number"}
        value={formData.phoneNumber}
        onChange={handleInputChange}
      />
      <input
        name={"email"}
        placeholder={"Email"}
        value={formData.email}
        onChange={handleInputChange}
      />
      <input
        name={"vehicleIds"}
        placeholder={"Vehicle IDs"}
        value={formData.vehicleIds}
        onChange={handleInputChange}
      />
      <input type="submit" value="Submit" />
    </form>
  );
};
