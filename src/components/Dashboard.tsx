import { Route } from "react-router";
import { BrowserRouter, Redirect } from "react-router-dom";
import { ChooseApplication } from "./ChooseApplication";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentUserState, userRoleState } from "../stateManagement/userAuth";
import DrawerBar from "./DrawerBar";
import Home from "./Home";
import UserProfile from "./UserProfile";
import { ApplicationReview } from "./admin/ApplicationReview";
import ReceivedAppPage from "./admin/ReceivedAppPage";
import { useEffect } from "react";
import firebase from "firebase";
import { UserApplication } from "./user/UserApplication";
import Template from "./Template";

export default function Dashboard() {
  const currentUser = useRecoilValue(currentUserState);
  const [userRole, setUserRole] = useRecoilState(userRoleState);

  var db = firebase.firestore();

  useEffect(() => {
    getUserRole();
  }, [userRole]);

  async function getUserRole() {
    if (currentUser != null) {
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
        <Route exact path="/studentnm" component={Template} />
        <Route exact path="/studentleker" component={Template} />
        <Route exact path="/studentcup" component={Template} />
        {userRole === "admin" ? (
          <>
            <Route
              exact
              path="/receivedApplications"
              component={ReceivedAppPage}
            />
          </>
        ) : (
          " "
        )}
        <Route exact path="/application" component={ApplicationReview} />
        <Route exact path="/edit" component={UserApplication} />
      </BrowserRouter>
    </div>
  );
}
