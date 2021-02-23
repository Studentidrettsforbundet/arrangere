import React from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const studentidrettTheme = createMuiTheme({
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
    fontFamily: "KofiPureSerif",
  },
});

function App() {
  return (
    <ThemeProvider theme={studentidrettTheme}>
      <div className="App"></div>
    </ThemeProvider>
  );
}

export default App;
