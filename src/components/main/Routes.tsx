import { useEffect } from "react";
import { Route } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import { BrowserRouter, Redirect } from "react-router-dom";
import firebase from "firebase";
import {
  currentUserState,
  userRoleState,
} from "../../stateManagement/userAuth";
import { Dashboard } from "../application/Dashboard";
import { ReviewApplication } from "../application/ReviewApplication";
import { EditApplication } from "../user/EditApplication";
import Template from "../application/Template";
import AdminApplicationsOverview from "../admin/AdminApplicationsOverview";
import UserProfile from "../user/UserProfile";
import DrawerBar from "./DrawerBar";
import Home from "./Home";

export default function Routes() {
  const currentUser = useRecoilValue(currentUserState);
  const [userRole, setUserRole] = useRecoilState(userRoleState);

  var db = firebase.firestore();

  useEffect(() => {
    getUserRole();
  }, [userRole]);

  async function getUserRole() {
    if (currentUser !== null) {
      await db
        .collection("user")
        .doc(currentUser.uid)
        .get()
        .then((doc) => {
          const data = doc?.data();
          if (!data) {
            return null;
          } else {
            setUserRole(data.role);
          }
        });
    }
  }

  if (currentUser === null) {
    return <Redirect to="/login" />;
  }

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <BrowserRouter>
        <DrawerBar />
        <Route exact path="/" component={Home} />
        <Route exact path="/userprofile" component={UserProfile} />
        <Route exact path="/applications" component={Dashboard} />
        <Route exact path="/studentnm" component={Template} />
        <Route exact path="/studentleker" component={Template} />
        <Route exact path="/studentcup" component={Template} />
        {userRole === "admin" ? (
          <>
            <Route
              exact
              path="/receivedApplications"
              component={AdminApplicationsOverview}
            />
          </>
        ) : (
          " "
        )}
        <Route exact path="/review" component={ReviewApplication} />
        <Route exact path="/edit" component={EditApplication} />
      </BrowserRouter>
    </div>
  );
}
