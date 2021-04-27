import { createMuiTheme } from "@material-ui/core/styles";

export const studentidrettTheme = createMuiTheme({
  palette: {
    primary: {
      light: "#8b8b8b",
      main: "#5e5e5e",
      dark: "#000000",
      contrastText: "#fff",
    },
    secondary: {
      light: "#66dfff",
      main: "#00adee",
      dark: "#007ebb",
      contrastText: "#000",
    },
  },
  typography: {
    h1: {
      fontSize: "2.125rem",
      fontWeight: 400,
      lineHeight: "1.235",
    },
  },
  props: {
    MuiTypography: {
      variantMapping: {
        h1: "h1",
        h2: "h2",
        h3: "h2",
        h4: "h4",
        h5: "h2",
        h6: "p",
        subtitle1: "subtitle1",
        subtitle2: "h2",
        body1: "span",
        body2: "span",
      },
    },
  },
});
