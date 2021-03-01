import React from "react";
import { Route } from "react-router";
import { BrowserRouter, Redirect, Switch } from "react-router-dom";
import {ChooseApplication} from "./ChooseApplication";
import DrawerBar from "./DrawerBar";
import Home from "./Home";
import StudentCupForm from "./StudentCupForm";
import StudentlekerForm from "./StudentlekerForm";
import StudentNMForm from "./StudentNMForm";
import UserProfile from "./UserProfile";
import { useRecoilValue } from "recoil";

import { currentUserState } from "../stateManagement/userAuth";


export default function Dashboard() {
  const currentUser = useRecoilValue(currentUserState);

  if (currentUser == null) {
    return <Redirect to="/login" />;
  }


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
  } 
