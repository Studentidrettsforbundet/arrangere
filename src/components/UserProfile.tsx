import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentUserState } from "../stateManagement/userAuth";
import firebase from "firebase/app";
import { Link, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { auth } from "../firebase";

export default function UserProfile() {
  const history = useHistory();

  const currentUser = useRecoilValue(currentUserState);

  let user: string | null = "ingen bruker";
  if (currentUser != null) {
    user = currentUser.email;
  }

  async function handleLogout() {
    await auth
      .signOut()
      .then(function () {
        console.log("signout complete");
        console.log(currentUser);
      })
      .catch((error) => {
        console.log("Kunne ikke logge ut");
      });
  }

  console.log(user);
  return (
    <div>
      <p>Brukerprofil {user}</p>
      <Button component={Link} to="/login" onClick={handleLogout}>
        Logg ut
      </Button>
    </div>
  );
}
