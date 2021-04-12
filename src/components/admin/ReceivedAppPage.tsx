import { useEffect, useState } from "react";
import { firestore } from "../../firebase";
import AdminApplications from "./AdminApplications";

export default function ReceivedAppPage() {
  let [applicationIdList, setApplicationIdList] = useState<any>([]);

  // useEffect(() => {
  //   getSubmittedApplicationsID("snmApplications");
  //   getSubmittedApplicationsID("scApplications");
  //   getSubmittedApplicationsID("slApplications");
  // }, []);

  // async function getSubmittedApplicationsID(collectionName: string) {
  //   await firestore
  //     .collection(collectionName)
  //     .get()
  //     .then((querySnapshot) => {
  //       querySnapshot.forEach((doc) => {
  //         //console.log(`${doc.id}`);
  //         setApplicationIdList((applicationIdList: any) => [
  //           ...applicationIdList,
  //           `${doc.id}`,
  //         ]);
  //       });
  //     });
  //   return applicationIdList;
  // }

  return (
    <div>
      <h1>Innsendte søknader</h1>
      <h2>Student-NM</h2>
      <AdminApplications collectionName="snmApplications" />
      <h2>Studentleker</h2>
      <AdminApplications collectionName="slApplications" />
      <h2>Student-Cup</h2>
      <AdminApplications collectionName="scApplications" />
    </div>
  );
}
