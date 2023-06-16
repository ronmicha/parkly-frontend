import { type FormData, SignUpForm } from "../../components";

export const LoginPage = () => {
  const handleSubmit = (data: FormData): void => {
    // send request with data
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <>
      <SignUpForm onSubmit={handleSubmit} />
    </>
  );
};
