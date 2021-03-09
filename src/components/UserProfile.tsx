import React from "react";
import { useRecoilValue } from "recoil";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { currentUserState } from "../stateManagement/userAuth";
import { auth } from "../firebase";
import firebase from "firebase";

export default function UserProfile() {
  const currentUser = useRecoilValue(currentUserState);
  var db = firebase.firestore();

  let user: string | null = "ingen bruker";
  let organization: string | any;

  if (currentUser != null) {
    user = currentUser.email;

    db.collection("users")
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        console.log(doc.data());
        organization = doc.data();
      });
  }

  function handleLogout(e: any) {
    e.preventDefault();
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
      <p>Organisasjon {organization}</p>
      <Button component={Link} to="/login" onClick={handleLogout}>
        Logg ut
      </Button>
    </div>
  );
}
