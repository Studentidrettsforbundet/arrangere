import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
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
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Dashboard></Dashboard>
          </Switch>
        </BrowserRouter>
      </RecoilRoot>
    </div>
  );
}
export default App;
