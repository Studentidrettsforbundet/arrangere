import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@material-ui/core";
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
      <Box mb={3}>
        <Typography
          aria-label="Søknader"
          align="left"
          component="h1"
          variant="h5"
        >
          Administrer søknader
        </Typography>
      </Box>
      <Typography gutterBottom variant="h5" component="h2">
        Student-NM
      </Typography>
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
      <Typography gutterBottom variant="h5" component="h2">
        Studentleker
      </Typography>
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
      <Typography gutterBottom variant="h5" component="h2">
        Student-Cup
      </Typography>
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
