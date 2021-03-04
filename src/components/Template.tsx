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

  useEffect(() => {
    generateApplicationForm();
  }, []);

  async function generateApplicationForm() {
    let attributeListLocal: Array<any> = [];
    console.log("attributeListLocal start", attributeListLocal);

    await firestore
      .collection("snmTemplate")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((chapter) => {
          if (chapter.exists) {
            let inputFields: Array<InputField> = [];
            let title: string = "";
            let mainDesc: string = "";
            let type: string = "";
            let desc: string = "";
            //Iterates through each attribute and its field, then push to attributeList
            Object.keys(chapter.data()!).forEach((attribute: string) => {
              const AttributeObj = chapter.data()![attribute];
              console.log("AttributeObj", AttributeObj);
              Object.keys(AttributeObj).forEach((key) => {
                if (typeof AttributeObj[key] === "string") {
                  //console.log("AttributeObj[key]", AttributeObj[key]);
                  title = AttributeObj.title;
                  mainDesc = AttributeObj.desc;
                } else if (typeof AttributeObj[key] === "object") {
                  type = AttributeObj[key].type;
                  desc = AttributeObj[key].desc;
                  inputFields.push({ type: type, desc: desc });
                }
              });
              attributeListLocal.push({
                title: title,
                mainDesc: mainDesc,
                inputFields: inputFields,
              });
              title = "";
              mainDesc = "";
              inputFields = [];
            });
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            throw new Error("no doc");
          }
        });
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
    setAttributeList(attributeListLocal);
    console.log("attributeListLocal", attributeListLocal);
    attributeListLocal = [];
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
    return attributes;
  };

  return (
    <div>
      {loading ? (
        <p>Laster inn</p>
      ) : (
        <div>{renderAttributes(attributeList)}</div>
      )}
    </div>
  );
};

export default Template;
