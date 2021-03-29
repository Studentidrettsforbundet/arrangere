import { useEffect, useState } from "react";
import firebase from "firebase";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../stateManagement/userAuth";
import { useStyles } from "../style/userProfile";
import {
  Typography,
  Box,
  Divider,
  Grid,
  CircularProgress,
} from "@material-ui/core";

export default function UserProfile() {
  const [loading, setLoading] = useState(false);
  const currentUser = useRecoilValue(currentUserState);
  let [organizationName, setOrganizationName] = useState<any>();
  let [
    organizationAccountNumber,
    setOrganizationAccountNumber,
  ] = useState<String>();
  let [organizationNumber, setOrganizationNumber] = useState<String>();
  const classes = useStyles();
  var db = firebase.firestore();

  useEffect(() => {
    retriveOrganizationName();
    retriveOrganizationInfo();
  }, [organizationName]);

  async function retriveOrganizationName() {
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
            setOrganizationName(data.organization);
          }
        });
    }
  }

  async function retriveOrganizationInfo() {
    if (organizationName != "") {
      //setLoading(true);
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
        <Grid container direction="row" alignItems="center">
          <Grid item xs={10}>
            <Typography className={classes.header} variant="h1">
              Min profil:
            </Typography>
            <Divider className={classes.divider} variant="fullWidth" />
          </Grid>
        </Grid>
        {loading ? (
          <Grid container direction="row" alignItems="center">
            <Grid item sm={2}></Grid>
            <Grid className={classes.contentGrid} item xs={12}>
              <p>Laster inn..</p>
              <CircularProgress />
            </Grid>
          </Grid>
        ) : (
          <Grid container direction="row" alignItems="center">
            <Grid className={classes.contentGrid} item xs={10}>
              <Typography className={classes.contentHeader}>Email:</Typography>
              <Typography className={classes.content}>
                {currentUser?.email}
              </Typography>
              <Typography className={classes.contentHeader}>
                Idrettsklubb:
              </Typography>
              <Typography className={classes.content}>
                {organizationName}
              </Typography>
              <Typography className={classes.contentHeader}>
                Organisasjonsnummer:
              </Typography>
              <Typography className={classes.content}>
                {organizationNumber}
              </Typography>
              <Typography className={classes.contentHeader}>
                Organisasjonens kontonummer:
              </Typography>
              <Typography className={classes.content}>
                {organizationAccountNumber}
              </Typography>
            </Grid>
          </Grid>
        )}
      </Box>
    </div>
  );
}
