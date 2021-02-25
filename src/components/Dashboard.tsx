import React, { useEffect, useState } from "react";
import { Route } from "react-router";
import { BrowserRouter, Switch } from "react-router-dom";
import ChooseApplication from "./ChooseApplication";
import DrawerBar from "./DrawerBar";
import Home from "./Home";
import StudentCupForm from "./StudentCupForm";
import StudentlekerForm from "./StudentlekerForm";
import StudentNMForm from "./StudentNMForm";
import UserProfile from "./UserProfile";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { currentUserState } from "../stateManagement/userAuth";
import Login from "./Login";
import SignUp from "./SignUp";

export default function Dashboard() {
  const currentUser = useRecoilValue(currentUserState);

  if (currentUser != null) {
    return (
      <div style={{ display: "flex", flexDirection: "row", padding: 20 }}>
        <BrowserRouter>
          <DrawerBar />
          <Route exact path="/" component={Home} />
          <Route exact path="/userprofile" component={UserProfile} />
          <Route exact path="/applications" component={ChooseApplication} />
          <Route path="/studentnm" component={StudentNMForm} />
          <Route path="/studentleker" component={StudentlekerForm} />
          <Route path="/studentcup" component={StudentCupForm} />
        </BrowserRouter>
      </div>
    );
  } else {
    return (
      <div style={{ display: "flex", flexDirection: "row", padding: 20 }}>
        <BrowserRouter>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </BrowserRouter>
      </div>
    );
  }
}
