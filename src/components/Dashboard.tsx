import React from "react";
import { Route } from "react-router";
import { BrowserRouter, Redirect, Switch } from "react-router-dom";
import { ChooseApplication } from "./ChooseApplication";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../stateManagement/userAuth";
import DrawerBar from "./DrawerBar";
import Home from "./Home";
import UserProfile from "./UserProfile";
import { ApplicationForm } from "./ApplicationForm";

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
        <Route exact path="/application" component={ApplicationForm} />
        {/* <Route
          exact
          path="/application"
          render={(props) => (
            <ApplicationForm {...props} formName={props.text} />
          )}
        /> */}
      </BrowserRouter>
    </div>
  );
}
