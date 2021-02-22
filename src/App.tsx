import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import DrawerBar from "./components/DrawerBar";
import Home from "./components/Home";
import UserProfile from "./components/UserProfile";
import StudentCupForm from "./components/StudentCupForm";
import StudentlekerForm from "./components/StudentlekerForm";
import StudentNMForm from "./components/StudentNMForm";
import ChooseApplication from "./components/ChooseApplication";

function App() {
  return (
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
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
