import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Link } from "react-router-dom";
import { currentUserState } from "../stateManagement/userAuth";
import { auth } from "../firebase";
import { Typography, Button, Box } from "@material-ui/core";
import { errorState } from "../stateManagement/errorHandling";

export default function UserProfile() {
  const currentUser = useRecoilValue(currentUserState);

  let user: string | null = "";
  if (currentUser != null) {
    user = currentUser.email;
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

      <p>Din epostadresse: {user}</p>
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
