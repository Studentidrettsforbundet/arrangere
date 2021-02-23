import React from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import DrawerBar from "./components/DrawerBar";
import Home from "./components/Home";
import UserProfile from "./components/UserProfile";
import StudentCupForm from "./components/StudentCupForm";
import StudentlekerForm from "./components/StudentlekerForm";
import StudentNMForm from "./components/StudentNMForm";
import ChooseApplication from "./components/ChooseApplication";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { RecoilRoot, useRecoilValue } from "recoil";
import Dashboard from "./components/Dashboard";
import { currentUserState } from "./stateManagement/userAuth";
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
  const currentUser = useRecoilValue(currentUserState);
  return (
    <ThemeProvider theme={studentidrettTheme}>
      <div style={{ display: "flex", flexDirection: "row", padding: 20 }}>
        <BrowserRouter>
          <DrawerBar />
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/userprofile" component={UserProfile} />
            <Route path="/applications" component={ChooseApplication} />

            <Route path="/studentnm" component={StudentNMForm} />
            <Route path="/studentleker" component={StudentlekerForm} />
            <Route path="/studentcup" component={StudentCupForm} />

            {/* <Route
              path="/login"
              component={Login}
              render={() =>
                !currentUser == null ? (
                  <Route to="/login" component={Login} />
                ) : (
                  <Route to="/" component={Dashboard} />
                )
              }
            /> */}

            <Route exact path="/" component={Dashboard} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
          </Switch>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
