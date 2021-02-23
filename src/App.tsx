import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { RecoilRoot } from "recoil";
import Dashboard from "./components/Dashboard";

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
    // fontFamily: "KofiPureSerif",
  },
});

function App() {
  return (
    <ThemeProvider theme={studentidrettTheme}>
      <div style={{ display: "flex", flexDirection: "row", padding: 20 }}>
        <RecoilRoot>
          <BrowserRouter>
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={SignUp} />
              <Dashboard></Dashboard>
            </Switch>
          </BrowserRouter>
        </RecoilRoot>
      </div>
    </ThemeProvider>
  );
}
export default App;
