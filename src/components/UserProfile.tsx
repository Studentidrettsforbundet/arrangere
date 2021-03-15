import { useRecoilValue } from "recoil";
import { Typography, Box, Divider, Grid } from "@material-ui/core";
import { currentUserState } from "../stateManagement/userAuth";
import { auth } from "../firebase";
import { useStyles } from "../style/userProfile";
import React from "react";
import { PersonOutline } from "@material-ui/icons";

export default function UserProfile() {
  const currentUser = useRecoilValue(currentUserState);
  const classes = useStyles();

  let user: string | null = "ingen bruker";
  if (currentUser != null) {
    user = currentUser.email;
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
    <Box p={20} width={1}>
      <Grid container direction="row" spacing={3}>
        <Grid container direction="row" alignItems="center">
          <Grid xs={1}>
            <PersonOutline className={classes.icon}></PersonOutline>
          </Grid>
          <Grid xs={9}>
            <Typography className={classes.header} variant="h4">
              Min profil
            </Typography>
            <Divider className={classes.divider} variant="fullWidth" />
          </Grid>
        </Grid>
        <Grid xs={1}></Grid>
        <Grid className={classes.contentGrid} xs={9}>
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
          <Typography variant="subtitle1" className={classes.contentHeader}>
            Organisasjonsnummer:
          </Typography>
          <Typography variant="subtitle1" className={classes.contentHeader}>
            Organisasjonens kontonummer:
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

{
  /* <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>xs=12</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
      </Grid>
    </div> */
}
