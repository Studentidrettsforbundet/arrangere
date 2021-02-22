import React from "react";
import SignUp from "./SignUp";
import { RecoilRoot } from "recoil";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LogIn from "./LogIn";

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={LogIn} />
            <Route path="/signup" component={SignUp} />
          </Switch>
        </BrowserRouter>
      </div>
    </RecoilRoot>
  );
}

export default App;
