import { useEffect, useState } from "react";
import { firestore } from "../../firebase";
import AdminApplications from "./AdminApplications";

export default function ReceivedAppPage() {
  let [snmApplicationIDs, setSnmApplicationIDs] = useState<any>([]);
  let [scApplicationIDs, setScApplicationIDs] = useState<any>([]);
  let [slApplicationIDs, setSlApplicationIDs] = useState<any>([]);

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

  return (
    <div>
      <h1>Innsendte søknader</h1>
      <h2>Student-NM</h2>
      <ReceivedAppCard
        collectionName="snmApplications"
        applicationIDs={snmApplicationIDs}
      />
      <h2>Studentleker</h2>
      <ReceivedAppCard
        collectionName="slApplications"
        applicationIDs={slApplicationIDs}
      />
      <h2>Student-Cup</h2>
      <ReceivedAppCard
        collectionName="scApplications"
        applicationIDs={scApplicationIDs}
      />
    </div>
  );
}
