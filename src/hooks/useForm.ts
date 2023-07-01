import { type ChangeEvent, useState } from "react";

type UseForm<T> = {
  formData: T;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const useForm = <T>(initialFormData: T): UseForm<T> => {
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
