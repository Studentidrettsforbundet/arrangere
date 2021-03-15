import React, { useEffect, useState } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { useRecoilState, useSetRecoilState } from "recoil";
import { auth } from "./firebase";
import { currentUserState, loadingUserState } from "./stateManagement/userAuth";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";

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
  const setCurrentUser = useSetRecoilState(currentUserState);
  const [loading, setLoading] = useRecoilState(loadingUserState);

  useEffect(() => {
    return auth.onAuthStateChanged((user: any) => {
      if (user != null) {
        setCurrentUser(user.toJSON());
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });
  }, []);

  return (
    <ThemeProvider theme={studentidrettTheme}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {loading ? (
          <p></p>
        ) : (
          <BrowserRouter>
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={SignUp} />
              <Dashboard></Dashboard>
            </Switch>
          </BrowserRouter>
        )}
      </div>
    </ThemeProvider>
  );
}
export default App;
