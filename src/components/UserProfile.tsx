import React from "react";
import {  useRecoilValue } from "recoil";
import { currentUserState } from "../stateManagement/userAuth";
import { Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import { auth } from "../firebase";

export default function UserProfile() {

  const currentUser = useRecoilValue(currentUserState);

  let user: string | null = "ingen bruker";
  if (currentUser != null) {
    user = currentUser.email;
  }

  function handleLogout(e:any) {
    e.preventDefault()
    auth
      .signOut()
      .then(function () {
        console.log("signout complete");
      })
      .catch((error) => {
        console.log("Kunne ikke logge ut");
      });
  }

  return (
    <div>
      <p>Brukerprofil {user}</p>
      <Button component={Link} to="/login" onClick={handleLogout}>
        Logg ut
      </Button>
    </div>
  );
}
