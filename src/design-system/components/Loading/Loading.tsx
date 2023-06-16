import {CircularProgress, type CircularProgressProps} from "@mui/material";

type LoadingProps = CircularProgressProps & {
  testId?: string;
};

const Loading = ({
  color,
  variant = "indeterminate",
  value,
  className,
  size,
  testId
}: LoadingProps): JSX.Element => {
  return (
    <CircularProgress
      className={className!}
      color={color!}
      variant={variant!}
      size={size!}
      value={value!}
      data-testid={testId}
    />
  );
};

export default Loading;
