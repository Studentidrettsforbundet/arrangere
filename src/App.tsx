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

function App() {
  const currentUser = useRecoilValue(currentUserState);
  return (
    <div style={{ display: "flex", flexDirection: "row", padding: 20 }}>
      <RecoilRoot>
        <BrowserRouter>
          <Switch>
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
      </RecoilRoot>
    </div>
  );
}

export default App;
