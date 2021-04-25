import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../stateManagement/userAuth";

/* Denne componenten skal brukes til å vise brukers innsendte søknader. Mulig den kan samkjøres
mer med koden i RecivedAppPage. Men det kan vi ta etterhvert. */

export const SubmittedApplications = () => {
  const currentUser = useRecoilValue(currentUserState);
  let [applicationList, setApplicationList] = useState<any>([]);
  var db = firebase.firestore();

  useEffect(() => {
    submittedApplications();
  }, [applicationList]);

  /* spørring for å hente ut alle applications som ligger på en bruker */

  async function submittedApplications() {
    if (currentUser != null) {
      await db
        .collection("user")
        .doc(currentUser.uid)
        .get()
        .then((doc: firebase.firestore.DocumentData) => {
          const data = doc?.data();
          if (!data) {
            return null;
          } else {
            setApplicationList((applicationList: any) => [
              ...applicationList,
              data.applications,
            ]);
          }
        });
    }
  }

  /**Under return her kan man displaye søknadene til en bruker etterhvert */
  return <div></div>;
};

export default SubmittedApplications;
