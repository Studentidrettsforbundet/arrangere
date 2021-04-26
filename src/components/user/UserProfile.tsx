import { useEffect, useState } from "react";
import firebase from "firebase";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../../stateManagement/userAuth";
import { useStyles } from "../../style/userProfile";
import {
  Typography,
  Box,
  Divider,
  Grid,
  CircularProgress,
  Paper,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

export default function UserProfile() {
  const [loading, setLoading] = useState(false);
  const currentUser = useRecoilValue(currentUserState);
  let [organizationName, setOrganizationName] = useState<string>();
  let [
    organizationAccountNumber,
    setOrganizationAccountNumber,
  ] = useState<string>();
  let [organizationNumber, setOrganizationNumber] = useState<string>();
  const classes = useStyles();
  var db = firebase.firestore();

  useEffect(() => {
    retriveOrganizationName();
    retriveOrganizationInfo();
  }, [organizationName]);

  async function retriveOrganizationName() {
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
            setOrganizationName(data.organization);
          }
        });
    }
  }

  async function retriveOrganizationInfo() {
    if (organizationName !== "") {
      await db
        .collection("organizations")
        .doc(organizationName)
        .get()
        .then((doc) => {
          const orgData = doc?.data();
          if (!orgData) {
            setOrganizationNumber("");
            setOrganizationAccountNumber("");
            return null;
          } else {
            setOrganizationNumber(orgData.account_number);
            setOrganizationAccountNumber(orgData.organization_number);
          }
        });
      setLoading(false);
    }
  }

  return (
    <div role="main">
      <Box p={12} width={1}>
        <Grid container direction="row" item xs={10} alignItems="center">
          <Typography className={classes.header} variant="h1">
            Min profil
          </Typography>
        </Grid>
        <Divider className={classes.divider} variant="fullWidth" />
        {loading ? (
          <Grid container direction="row" alignItems="center">
            <Grid item sm={2}></Grid>
            <Grid className={classes.contentGrid} item xs={12}>
              <Box p={10}>
                <Typography variant="subtitle2">Laster inn..</Typography>
                <Skeleton />
              </Box>
              <CircularProgress />
            </Grid>
          </Grid>
        ) : (
          <Grid
            className={classes.contentGrid}
            item
            xs={10}
            container
            direction="column"
            justify="center"
            alignItems="flex-start"
          >
            <Paper className={classes.paper} elevation={0}>
              <Grid container direction="column">
                <Typography className={classes.contentHeader}>
                  Email:
                </Typography>
                <Typography className={classes.content}>
                  {currentUser?.email}
                </Typography>
              </Grid>
            </Paper>
            <Paper className={classes.paper} elevation={0}>
              <Grid container direction="column">
                <Typography className={classes.contentHeader}>
                  Idrettsklubb:
                </Typography>
                <Typography className={classes.content}>
                  {organizationName}
                </Typography>
              </Grid>
            </Paper>
            <Paper className={classes.paper} elevation={0}>
              <Grid container direction="column">
                <Typography className={classes.contentHeader}>
                  Organisasjonsnummer:
                </Typography>
                <Typography className={classes.content}>
                  {organizationNumber}
                </Typography>
              </Grid>
            </Paper>
            <Paper className={classes.paper} elevation={0}>
              <Grid container direction="column">
                <Typography className={classes.contentHeader}>
                  Organisasjonens kontonummer:
                </Typography>
                <Typography className={classes.content}>
                  {organizationAccountNumber}
                </Typography>
              </Grid>
            </Paper>
          </Grid>
        )}
      </Box>
    </div>
  );
}
