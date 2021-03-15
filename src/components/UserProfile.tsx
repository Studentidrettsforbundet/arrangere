import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { currentUserState } from "../stateManagement/userAuth";
import { auth } from "../firebase";
import firebase from "firebase";

export default function UserProfile() {
  let [organizationName, setOrganizationName] = useState<String>();
  const currentUser = useRecoilValue(currentUserState);
  var db = firebase.firestore();
  let email: string | null = "ingen bruker";

  useEffect(() => {
    if (currentUser != null) {
      db.collection("user")
        .doc(currentUser.uid)
        .get()
        .then((doc) => {
          const data = doc?.data();
          if (!data) {
            console.log("no data here");
            return null;
          } else {
            setOrganizationName(data.organization);
          }
        });
    }
  });

  if (currentUser != null) {
    email = currentUser.email;
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
      <p>Brukerprofil {email}</p>
      <p>Organisasjon {organizationName}</p>

      <Button component={Link} to="/login" onClick={handleLogout}>
        Logg ut
      </Button>
    </div>
  );
}
