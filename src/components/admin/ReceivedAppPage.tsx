import { Box } from "@material-ui/core";
import { useEffect, useState } from "react";
import { firestore } from "../../firebase";
import AppCard from "./AppCard";
import Grid from "@material-ui/core/Grid";
import { doc } from "prettier";
import { ControlPointDuplicateSharp } from "@material-ui/icons";
import { getSupportedCodeFixes } from "typescript";

export default function ReceivedAppPage() {
  let [snmApplicationIDs, setSnmApplicationIDs] = useState<any>([]);
  let [scApplicationIDs, setScApplicationIDs] = useState<any>([]);
  let [slApplicationIDs, setSlApplicationIDs] = useState<any>([]);
  let [author, setAuthor] = useState<any>([]);
  let [userId, setUserId] = useState<any>([]);
  let [sport, setSport] = useState<any>([]);

  useEffect(() => {
    snmApplicationIDs = getSnmApplicationsID("snmApplications");
    scApplicationIDs = getScApplicationsID("scApplications");
    slApplicationIDs = getSlApplicationsID("slApplications");
  }, []);

  async function getSnmApplicationsID(collectionName: string) {
    let applicationIDs: Array<string> = [];

    await firestore
      .collection(collectionName)
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
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          applicationIDs.push(`${doc.id}`);
        });
      });
    setSlApplicationIDs(applicationIDs);
  }

  function getUserId(collectionName: string, applicationId: string) {
    let user: string = "";
    firestore
      .collection(collectionName + "Applications")
      .doc(applicationId)
      .get()
      .then((doc) => {
        let docData = doc.data();
        if (docData != undefined) {
          user = docData.userId;
          setUserId(user[1]);
        }
      });
    return userId;
  }

  function getSport(collectionName: string, applicationId: string) {
    let tempsport: string = "";
    firestore
      .collection(collectionName + "Applications")
      .doc(applicationId)
      .get()
      .then((doc) => {
        let docData = doc.data();
        if (docData != undefined) {
          tempsport =
            docData.general.attributes.general.input_fields.input3.value;
          setSport(tempsport);
        }
      });
    return sport;
  }

  return (
    <Box px={10} pt={6}>
      <h1>Innsendte søknader</h1>
      <h2>Student-NM</h2>
      <Grid container alignItems="stretch">
        {snmApplicationIDs.map((applicationID: string) => {
          return (
            <AppCard
              to="/application"
              applicationId={applicationID}
              collectionName="snm"
              user={getUserId("snm", applicationID)}
              sport={getSport("snm", applicationID)}
            />
          );
        })}
      </Grid>
      <h2>Studentleker</h2>
      <Grid container alignItems="stretch">
        {slApplicationIDs.map((applicationID: string) => {
          return (
            <AppCard
              to="/application"
              applicationId={applicationID}
              collectionName="sl"
            />
          );
        })}
      </Grid>
      <h2>Student-Cup</h2>
      <Grid container alignItems="stretch">
        {scApplicationIDs.map((applicationID: string) => {
          return (
            <AppCard
              to="/application"
              applicationId={applicationID}
              collectionName="sc"
            />
          );
        })}
      </Grid>
    </Box>
  );
}
