import React from "react";
import { Route } from "react-router";
import { BrowserRouter, Switch } from "react-router-dom";
import ChooseApplication from "./ChooseApplication";
import DrawerBar from "./DrawerBar";
import Home from "./Home";
import StudentCupForm from "./StudentCupForm";
import StudentlekerForm from "./StudentlekerForm";
import StudentNMForm from "./StudentNMForm";
import UserProfile from "./UserProfile";

export default function Dashboard() {
  return (
    <div style={{ display: "flex", flexDirection: "row", padding: 20 }}>
      <BrowserRouter>
        <DrawerBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/userprofile" component={UserProfile} />
          <Route exact path="/applications" component={ChooseApplication} />
          <Route path="/studentnm" component={StudentNMForm} />
          <Route path="/studentleker" component={StudentlekerForm} />
          <Route path="/studentcup" component={StudentCupForm} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
