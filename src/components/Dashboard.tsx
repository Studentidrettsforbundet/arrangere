import React from "react";
import { Route } from "react-router";
import { BrowserRouter, Redirect } from "react-router-dom";
import { ChooseApplication } from "./ChooseApplication";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../stateManagement/userAuth";
import DrawerBar from "./DrawerBar";
import Home from "./Home";
import UserProfile from "./UserProfile";
import { ApplicationForm } from "./ApplicationForm";
import RecivedApplications from "./RecivedApplications";

export default function Dashboard() {
  const currentUser = useRecoilValue(currentUserState);

  if (currentUser == null) {
    return <Redirect to="/login" />;
  }

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <BrowserRouter>
        <DrawerBar />
        <Route exact path="/" component={Home} />
        <Route exact path="/userprofile" component={UserProfile} />
        <Route exact path="/applications" component={ChooseApplication} />
        <Route exact path="/studentnm" component={ApplicationForm} />
        <Route exact path="/studentleker" component={ApplicationForm} />
        <Route exact path="/studentcup" component={ApplicationForm} />
        <Route path="/submitted" component={RecivedApplications} />
      </BrowserRouter>
    </div>
  );
}
