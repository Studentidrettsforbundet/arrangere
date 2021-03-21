import { render } from "@testing-library/react";
import { type } from "os";
import { exit } from "process";
import React, { useEffect } from "react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { firestore } from "../firebase";
import { NMdataState } from "../stateManagement/firestoreData";

const NmForm = () => {
  //var applicationTemplate = firestore.collection("Søknadsmal").doc("NM");

  const [data, setData] = useRecoilState(NMdataState);

  var docRef = firestore.collection("Søknadsmal").doc("NM");
  // Remove dead code
  /*  async function getNMDocument() {
    await docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const promises: any = [];
          let input: Array<string> = [];
          let type: string;
          let desc: string;
          Object.keys(doc.data()!).forEach((attribute: string) => {
            const InputFieldsObj = doc.data()![attribute];
            console.log("InputFieldsObj", InputFieldsObj);
            console.log("Title", InputFieldsObj.Title);
            console.log(InputFieldsObj.Desc);
            Object.keys(InputFieldsObj).forEach((key) => {
              if (typeof InputFieldsObj[key] === "object") {
                type = InputFieldsObj[key].Type;
                desc = InputFieldsObj[key].Desc;
                console.log("type", type);
                console.log(desc);
              }
            });
          });
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
          throw new Error("no doc");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  } */

  async function getNMDocument() {
    await docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          let inputFields: Array<string[]> = [];
          let title: string = "";
          let mainDesc: string = "";
          let type: string = "";
          let desc: string = "";

          // This cumbersome way of handling data just does not seem quite right. We can discuss this in more detail in
          // a meeting
          Object.keys(doc.data()!).forEach((attribute: string) => {
            const InputFieldsObj = doc.data()![attribute];
            console.log("InputFieldsObj", InputFieldsObj);
            Object.keys(InputFieldsObj).forEach((key) => {
              if (typeof InputFieldsObj[key] === "string") {
                if (title === "") {
                  title = InputFieldsObj.Title;
                } else {
                  mainDesc = InputFieldsObj.Desc;
                }
              } else if (typeof InputFieldsObj[key] === "object") {
                type = InputFieldsObj[key].Type;
                desc = InputFieldsObj[key].Desc;
                inputFields.push([type, desc]);
              }
            });
            console.log("Title", InputFieldsObj.Title);
            console.log(InputFieldsObj.Desc);
            console.log(inputFields);
            inputFields = [];
          });
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
          throw new Error("no doc");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }

  useEffect(() => {
    getNMDocument();
  }, []);

  function displayFields() {
    let field;
    if (data != null) {
      for (field in data) {
        console.log("displayField", field);
      }
    }
  }

  displayFields();

  const onSubmit = (e: any) => {
    e.preventDefault();
    // todo - send data somewhere
  };

  return (
    <div>
      <h1>Her skal det forhåpentligvis rendres noe fra firestore:</h1>
      <form onSubmit={onSubmit}>
        <p>todo...</p>
        {/* {renderType()} */}
      </form>
    </div>
  );
};

export default NmForm;
