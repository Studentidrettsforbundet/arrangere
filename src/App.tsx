import React from "react";
import DrawerBar from "./components/DrawerBar";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import UserProfile from "./components/UserProfile";
import ChooseApplication from "./components/ChooseApplication";

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <DrawerBar />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/userprofile" component={UserProfile} />
        <Route path="/applications" component={ChooseApplication} />
      </Switch>
    </div>
  );
}

export default App;
