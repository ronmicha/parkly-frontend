import { type PaletteMode, type ThemeOptions } from "@mui/material";

export const createThemeOptions = (
  mode: PaletteMode = "light"
): ThemeOptions => {
  return {
    palette: {
      mode,
      primary: {
        darkest: "#201A64",
        dark: "#3D33AF",
        main: "#5B4DFA",
        light: "#8A80FB",
        lightest: "#B9B3FC",
      },
      success: {
        main: "#2ECB88",
      },
      warning: {
        main: "#F29A49",
      },
      error: {
        main: "#EE534F",
      },
    },
    shape: {
      borderRadius: 12,
    },
  };
};
