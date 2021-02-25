import React from "react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { firestore } from "../firebase";
import { NMdataState } from "../stateManagement/firestoreData";

const NmForm = () => {
  //var applicationTemplate = firestore.collection("Søknadsmal").doc("NM");

  const [data, setData] = useRecoilState(NMdataState);

  firestore
    .collection("Søknadsmal")
    .get()
    .then(function (querySnapshot) {
      const data = querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        console.log(JSON.stringify(doc.data()));
        setData(JSON.stringify(doc.data()));
      });
    });

  const onSubmit = (e: any) => {
    e.preventDefault();
    // todo - send data somewhere
  };

  return (
    <div>
      <h1>Her skal det forhåpentligvis rendres noe fra firestore:</h1>
      <form onSubmit={onSubmit}>
        <p>todo...</p>
        {/*         data.map((info) => (
          )); */}
        {data}
      </form>
    </div>
  );
};

export default NmForm;
