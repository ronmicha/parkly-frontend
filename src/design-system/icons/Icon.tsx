import { ReactSVG } from "react-svg";

type IconProps = {
  relPath: string;
};

export const Icon = ({ relPath }: IconProps) => {
  return <ReactSVG src={`src/design-system/icons/${relPath}`} />;
};
