import { type ChangeEvent, useState } from "react";

type FormData = {
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

  const handleSubmit = (): void => {
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name={"firstName"}
        value={formData.firstName}
        onChange={handleInputChange}
      />
      <input
        name={"phoneNumber"}
        value={formData.phoneNumber}
        onChange={handleInputChange}
      />
      <input
        name={"email"}
        value={formData.email}
        onChange={handleInputChange}
      />
      <input
        name={"vehicleIds"}
        value={formData.vehicleIds}
        onChange={handleInputChange}
      />
    </form>
  );
};
