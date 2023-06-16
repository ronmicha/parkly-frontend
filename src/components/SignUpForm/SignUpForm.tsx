import { type ChangeEvent, type FormEvent, useEffect, useState } from "react";

export type SignUpFormData = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  vehicleIds: string[];
};

const initialFormData: SignUpFormData = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  email: "",
  password: "",
  vehicleIds: [],
};

type SignUpFormProps = {
  onSubmit: (formData: SignUpFormData, activeVehicleId: string) => void;
};

export const SignUpForm = ({ onSubmit }: SignUpFormProps) => {
  const [formData, setFormData] = useState<SignUpFormData>(initialFormData);
  const [activeVehicleId, setActiveVehicleId] = useState<string>("");

  useEffect(() => {
    if (formData.vehicleIds.length === 1) {
      setActiveVehicleId(formData.vehicleIds[0]);
    }
  }, [formData.vehicleIds]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    onSubmit(formData, activeVehicleId);
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
        name={"password"}
        placeholder={"Password"}
        type={"password"}
        value={formData.password}
        onChange={handleInputChange}
      />
      <input type="submit" value="Submit" />
    </form>
  );
};
