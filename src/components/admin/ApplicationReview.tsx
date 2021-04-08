import firebase from "firebase";
import React, { constructor, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import {
  currentApplicationIdState,
  currentCollectionState,
} from "../../stateManagement/choosenApplication";

export const ApplicationReview = () => {
  var db = firebase.firestore();
  let [applicationData, setApplicationData] = useState<any>([]);
  let currentApplicationId: string = useRecoilValue(currentApplicationIdState);
  let currentCollection: string = useRecoilValue(currentCollectionState);

  useEffect(() => {
    retriveApplicationData(currentCollection, currentApplicationId);
  }, [currentApplicationId]);

  function retriveApplicationData(
    currentCollection: string,
    currentApplicationId: string
  ) {
    if (currentCollection != "") {
      db.collection(currentCollection)
        .doc(currentApplicationId)
        .get()
        .then((doc) => {
          if (!doc.data()) {
            console.log("no data here");
            return null;
          } else {
            setApplicationData([...applicationData, doc.data()]);
          }
        });
    } else {
      console.log("currentCollection is empty");
    }
  }

  return (
    <ul>
      {applicationData.map((data: any, i: any) => (
        <li key="i">{JSON.stringify(data)}</li>
      ))}
    </ul>
  );
};

export default ApplicationReview;
