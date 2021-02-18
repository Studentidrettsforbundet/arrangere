import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import ChooseApplicationForm from "./Components/ChooseApplication";
import StudentCupForm from "./Components/StudentCupForm";
import StudentlekerForm from "./Components/StudentlekerForm";
import StudentNMForm from "./Components/StudentNMForm";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ChooseApplicationForm} />
          <Route path="/studentnm" component={StudentNMForm} />
          <Route path="/studentleker" component={StudentlekerForm} />
          <Route path="/studentcup" component={StudentCupForm} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
