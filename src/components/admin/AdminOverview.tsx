import { useEffect, useState } from "react";
import { Box, Grid } from "@material-ui/core";
import { firestore } from "../../firebase";
import ApplicationCard from "../application/ApplicationCard";

export default function AdminOverview() {
  let [snmApplicationIDs, setSnmApplicationIDs] = useState<string[]>();
  let [scApplicationIDs, setScApplicationIDs] = useState<string[]>();
  let [slApplicationIDs, setSlApplicationIDs] = useState<string[]>();
  const [updateState, setUpdateState] = useState(false);

  useEffect(() => {
    getSnmApplicationsID("snmApplications");
    getScApplicationsID("scApplications");
    getSlApplicationsID("slApplications");
    if (updateState) {
      setUpdateState(false);
    }
  }, [updateState]);

  const updateApplications = (isUpdate: boolean) => {
    setUpdateState(isUpdate);
  };

  async function getSnmApplicationsID(collectionName: string) {
    let applicationIDs: Array<string> = [];

    await firestore
      .collection(collectionName)
      .orderBy("date", "desc")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          applicationIDs.push(`${doc.id}`);
        });
      });
    setSnmApplicationIDs(applicationIDs);
  }

  async function getScApplicationsID(collectionName: string) {
    let applicationIDs: Array<string> = [];
    await firestore
      .collection(collectionName)
      .orderBy("date", "desc")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          applicationIDs.push(`${doc.id}`);
        });
      });
    setScApplicationIDs(applicationIDs);
  }

  async function getSlApplicationsID(collectionName: string) {
    let applicationIDs: Array<string> = [];
    await firestore
      .collection(collectionName)
      .orderBy("date", "desc")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          applicationIDs.push(`${doc.id}`);
        });
      });
    setSlApplicationIDs(applicationIDs);
  }

  return (
    <Box px={10} pt={6}>
      <h1>Administrer søknader</h1>
      <h2>Student-NM</h2>
      <Grid container alignItems="stretch">
        {snmApplicationIDs?.map((applicationID: string) => {
          return (
            <ApplicationCard
              key={applicationID}
              to="/review"
              applicationId={applicationID}
              collectionName="snm"
              onChange={updateApplications}
            />
          );
        })}
      </Grid>
      <h2>Studentleker</h2>
      <Grid container alignItems="stretch">
        {slApplicationIDs?.map((applicationID: string) => {
          return (
            <ApplicationCard
              key={applicationID}
              to="/review"
              applicationId={applicationID}
              collectionName="sl"
              onChange={updateApplications}
            />
          );
        })}
      </Grid>
      <h2>Student-Cup</h2>
      <Grid container alignItems="stretch">
        {scApplicationIDs?.map((applicationID: string) => {
          return (
            <ApplicationCard
              key={applicationID}
              to="/review"
              applicationId={applicationID}
              collectionName="sc"
              onChange={updateApplications}
            />
          );
        })}
      </Grid>
    </Box>
  );
}
