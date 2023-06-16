import { type ReactNode, useState } from "react";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

export type ListItemProps = {
  text: ReactNode;
  icon?: ReactNode;
  onClick?: () => void;
  items?: ListItemProps[];
  indent?: number;
};

export const ListItem = ({
  text,
  icon,
  onClick,
  items = [],
  indent = 0,
}: ListItemProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(true);

  const isNestedItem = items.length > 0;

  const handleClick = () => {
    if (isNestedItem) {
      setIsOpen((prevIsOpen) => !prevIsOpen);
    } else {
      onClick?.();
    }
  };

  return (
    <>
      <ListItemButton onClick={handleClick} sx={{ pl: indent * 4 }}>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText primary={text} />
        {isNestedItem ? isOpen ? <ExpandLess /> : <ExpandMore /> : null}
      </ListItemButton>
      {isNestedItem && (
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {items.map(({ text, icon, onClick, items = [] }, index) => (
              <ListItem
                key={`${text}_${index}`}
                text={text}
                icon={icon}
                onClick={onClick}
                items={items}
                indent={indent + 1}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};
