import firebase from "firebase";
import React, { constructor, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import {
  currentApplicationIdState,
  currentCollectionState,
} from "../../stateManagement/choosenApplication";

export const ApplicationReview = () => {
  //console.log(props.data);
  var db = firebase.firestore();
  let [applicationData, setApplicationData] = useState<any>([]);
  let currentApplicationId: string = useRecoilValue(currentApplicationIdState);
  let currentCollection: string = useRecoilValue(currentCollectionState);

  useEffect(() => {
    console.log(currentCollection);
    // console.log(currentApplicationId);
    // console.log(JSON.stringify(props.id));
    // console.log(JSON.stringify(props.collectionName));
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
            // console.log(JSON.stringify(doc.data()));
            //console.log(currentCollection);
            //console.log(currentApplicationId);
            return null;
          } else {
            setApplicationData([...applicationData, doc.data()]);
            // setApplicationData((applicationData: any) => [
            //   ...applicationData,
            //   doc.data(),
            // ]);
            //console.log(applicationData);
            //console.log(JSON.stringify(doc.data()));
          }
        });
    } else {
      console.log("currentCollection is empty");
      console.log(currentCollection);
    }
  }

  // db.collection(currentCollection)
  //   .doc(currentApplicationId)
  //   .get()
  //   .then((doc) => {
  //     if (doc.exists) {
  //       console.log("Document data:", doc.data());
  //       //docData = doc.data();
  //       //setApplicationData(JSON.stringify(doc.data()));
  //       setApplicationData(doc.data());
  //       //docData = doc.data();
  //     } else {
  //       // doc.data() will be undefined in this case
  //       console.log("No such document!");
  //     }
  //   })
  //   .catch((error) => {
  //     console.log("Error getting document:", error);
  //   });

  return (
    <ul>
      {applicationData.map((data: any, i: any) => (
        <li key="i">{JSON.stringify(data)}</li>
      ))}
    </ul>
  );
};

export default ApplicationReview;
