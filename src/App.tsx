import React from "react";
import Text from "./Text";
import Buttons from "./Buttons";
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
});

function App() {
  return (
    <ThemeProvider theme={studentidrettTheme}>
      <div className="App">
        <p>Her skal det komme en søknadsside</p>
        <Text></Text>
        <Buttons></Buttons>
      </div>
    </ThemeProvider>
  );
}

export default App;
