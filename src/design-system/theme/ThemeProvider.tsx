import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { type PropsWithChildren, useMemo } from "react";
import {
  createTheme,
  CssBaseline,
  type PaletteMode,
  responsiveFontSizes,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material";
import { createThemeOptions } from "./theme";

type ThemeProviderProps = PropsWithChildren<{
  mode?: PaletteMode;
}>;

export const ThemeProvider = ({
  children,
  mode = "light",
}: ThemeProviderProps) => {
  const theme = useMemo(() => {
    const themeOptions = createThemeOptions(mode!);
    const theme = createTheme(themeOptions);
    return responsiveFontSizes(theme);
  }, [mode]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
