import { Box } from "@material-ui/core";
import { useEffect, useState } from "react";
import { firestore } from "../../firebase";
import AppCard from "./AppCard";

export default function ReceivedAppPage() {
  let [snmApplicationIDs, setSnmApplicationIDs] = useState<any>([]);
  let [scApplicationIDs, setScApplicationIDs] = useState<any>([]);
  let [slApplicationIDs, setSlApplicationIDs] = useState<any>([]);

  const [updateState, setUpdateState] = useState(false);

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
  const updateApplications = (isUpdate: boolean) => {
    setUpdateState(isUpdate);
  };

  return (
    <Box px={10} pt={6}>
      <h1>Innsendte søknader</h1>
      <h2>Student-NM</h2>
      {snmApplicationIDs.map((applicationID: string) => {
        return (
          <AppCard
            to="/application"
            applicationId={applicationID}
            collectionName="snm"
            onChange={updateApplications}
          />
        );
      })}

      <h2>Studentleker</h2>
      {slApplicationIDs.map((applicationID: string) => {
        return (
          <AppCard
            to="/application"
            applicationId={applicationID}
            collectionName="sl"
            onChange={updateApplications}
          />
        );
      })}
      <h2>Student-Cup</h2>
      {scApplicationIDs.map((applicationID: string) => {
        return (
          <AppCard
            to="/application"
            applicationId={applicationID}
            collectionName="sc"
            onChange={updateApplications}
          />
        );
      })}
    </Box>
  );
}
