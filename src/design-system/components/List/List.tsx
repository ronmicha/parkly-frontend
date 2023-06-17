import {
  List as MuiList,
  ListSubheader as MuiListSubheader,
} from "@mui/material";
import { ListItem, type ListItemProps } from "./ListItem";

export type ListProps = {
  data: ListItemProps[];
  subheader?: string;
};

export const List = ({ data, subheader }: ListProps): JSX.Element => {
  const SubheaderComponent = subheader
? (
    <MuiListSubheader component="div">{subheader}</MuiListSubheader>
  )
: null;

  return (
    <MuiList
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={SubheaderComponent}
    >
      {data.map((itemProps, index) => (
        <ListItem key={`${itemProps.text}_${index}`} {...itemProps} />
      ))}
    </MuiList>
  );
};
