import { useEffect, useState } from "react";
import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Link } from "react-router-dom";
import { currentUserState } from "../stateManagement/userAuth";
import { auth } from "../firebase";
import firebase from "firebase";
import { Typography, Button, Box } from "@material-ui/core";
import { errorState } from "../stateManagement/errorHandling";

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
      .then(function () {})
      .catch((error) => {
        console.log("Kunne ikke logge ut");
      });
  }

  return (
    <Box p={10}>
      <Typography variant="h4"> Min Profil</Typography>
  
      <p>Brukerprofil {email}</p>
      <p>Organisasjon {organizationName}</p>
      <Button
        variant="contained"
        component={Link}
        to="/login"
        onClick={handleLogout}
      >
        Logg ut
      </Button>
    </Box>
  );
}
