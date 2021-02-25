import React from "react";
import { useState } from "react";
import { firestore } from "../firebase";

const NmForm = () => {
  var applicationTemplate = firestore.collection("Søknadsmal");

  const [data, setData] = useState();

  /*   applicationTemplate
    .where("type", "==", "shortText")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const temp = [];
        console.log("Docuemnt data:", doc.data());
        temp.push(doc.data());

        console.log(temp);
      });
    })
    .catch((error) => {
      console.log("Error getting docuemnt;", error);
    }); */

  /*  async function getInputFields() {
    await firestore
      .collection("Søknadsmal")
      .get()
      .then((querySnapshot) => {
        const input: any[] | PromiseLike<any[]> = [];
        querySnapshot.forEach((doc) => {
          input.push({
            ...doc.data(),
            id: doc.id,
            ref: doc.ref,
          });
        });
        return input;
      });
  }

  getInputFields().then((inputArray) => {
    console.log(inputArray);
    inputArray.map((user: { displayName: any; }) => {
      console.log("name: ", user.displayName);
    });
  }); */

  firestore
    .collection("Søknadsmal")
    .get()
    .then(function (querySnapshot) {
      const data = querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        //setData(data);
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
        {data}
      </form>
    </div>
  );
};

export default NmForm;
