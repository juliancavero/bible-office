import { ProviderProps } from "@/types/common";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#567394",
    },
    secondary: {
      main: "#585693",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

const ThemeProv = ({ children }: ProviderProps) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeProv;

/* 

possible secondary:

569293
585693
935673
739356
935856
929356

*/
