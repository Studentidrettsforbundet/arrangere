import { Typography, Box, Divider, Grid } from "@material-ui/core";
import { currentUserState } from "../stateManagement/userAuth";
import { auth } from "../firebase";
import { useStyles } from "../style/userProfile";
import React from "react";
import { PersonOutline } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Link } from "react-router-dom";
import firebase from "firebase";

export default function UserProfile() {
  let [organizationName, setOrganizationName] = useState<String>();
  let [
    organizationAccountNumber,
    setOrganizationAccountNumber,
  ] = useState<String>();
  let [organizationNumber, setOrganizationNumber] = useState<String>();
  const currentUser = useRecoilValue(currentUserState);
  const classes = useStyles();
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
            setOrganizationNumber(data.organization_number);
            setOrganizationAccountNumber(data.organization_account_number);
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
    <Box p={20} width={1}>
      <Grid container direction="row">
        <Grid container direction="row" alignItems="center">
          <Grid item xs={1}>
            <PersonOutline className={classes.icon}></PersonOutline>
          </Grid>
          <Grid item xs={9}>
            <Typography className={classes.header} variant="h4">
              Min profil
            </Typography>
            <Divider className={classes.divider} variant="fullWidth" />
          </Grid>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid className={classes.contentGrid} item xs={9}>
          <Typography variant="subtitle1" className={classes.contentHeader}>
            Email:
          </Typography>
          <Typography variant="subtitle2" className={classes.content}>
            {currentUser?.email}
          </Typography>
          <Typography variant="subtitle1" className={classes.contentHeader}>
            Telefon:
          </Typography>
          <Typography variant="subtitle1" className={classes.contentHeader}>
            Idrettsklubb:
          </Typography>
          <Typography variant="subtitle2" className={classes.content}>
            {organizationName}
          </Typography>
          <Typography variant="subtitle1" className={classes.contentHeader}>
            Organisasjonsnummer:
          </Typography>
          <Typography variant="subtitle2" className={classes.content}>
            {organizationNumber}
          </Typography>
          <Typography variant="subtitle1" className={classes.contentHeader}>
            Organisasjonens kontonummer:
          </Typography>
          <Typography variant="subtitle2" className={classes.content}>
            {organizationAccountNumber}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
