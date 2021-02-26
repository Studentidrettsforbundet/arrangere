import React, { useEffect } from "react";
import { firestore } from "../firebase";

const NmForm = () => {
  var NMTemplate = firestore.collection("Søknadsmal").doc("NM");

  async function generateNMDocument() {
    await NMTemplate.get()
      .then((doc) => {
        if (doc.exists) {
          let inputFields: Array<string[]> = [];
          let title: string = "";
          let mainDesc: string = "";
          let type: string = "";
          let desc: string = "";

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
    generateNMDocument();
  }, []);

  const onSubmit = (e: any) => {
    e.preventDefault();
    // todo - send data somewhere
  };

  return (
    <div>
      <h1>Her skal det forhåpentligvis rendres noe fra firestore:</h1>
      <form onSubmit={onSubmit}>
        <p>todo...</p>
      </form>
    </div>
  );
};

export default NmForm;
