import React, { useEffect, useState } from "react";
import { firestore } from "../firebase";
import InputWrapper, { InputField } from "./inputFields/InputWrapper";

type Attribute = {
  title: string;
  mainDesc: string;
  inputFields: Array<InputField>;
};

const Template = () => {
  const [loading, setLoading] = useState(false);
  const [attributeList, setAttributeList] = useState<Attribute[]>([]);
  var NM = firestore.collection("Søknadsmal").doc("NM");

  useEffect(() => {
    generateApplicationForm();
  }, []);

  async function generateApplicationForm() {
    setLoading(true);

    let attributeList: Array<Attribute> = [];

    await NM.get()
      .then((doc) => {
        if (doc.exists) {
          let inputFields: Array<InputField> = [];
          let title: string = "";
          let mainDesc: string = "";
          let type: string = "";
          let desc: string = "";
          //Iterates through each attribute and its field, then push to attributeList
          Object.keys(doc.data()!).forEach((attribute: string) => {
            const AttributeObj = doc.data()![attribute];
            Object.keys(AttributeObj).forEach((key) => {
              if (typeof AttributeObj[key] === "string") {
                title = AttributeObj.Title;
                mainDesc = AttributeObj.Desc;
              } else if (typeof AttributeObj[key] === "object") {
                type = AttributeObj[key].Type;
                desc = AttributeObj[key].Desc;
                inputFields.push({ type: type, desc: desc });
              }
            });
            attributeList.push({
              title: title,
              mainDesc: desc,
              inputFields: inputFields,
            });
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
    setAttributeList(attributeList);
    setLoading(false);
  }

  const renderAttributes = (attributeList: any) => {
    const attributes: any = [];
    attributeList.map((attribute: Attribute) => {
      attributes.push(
        <InputWrapper
          key={attribute.title}
          title={attribute.title}
          mainDesc={attribute.mainDesc}
          inputFields={attribute.inputFields}
        />
      );
    });
    console.log("attributes", attributes);
    return attributes;
  };

  return (
    <div>
      <h1>Her skal det forhåpentligvis rendres noe fra firestore:</h1>
      {loading ? (
        <p>Laster inn</p>
      ) : (
        <div>{renderAttributes(attributeList)}</div>
      )}
    </div>
  );
};

export default Template;
