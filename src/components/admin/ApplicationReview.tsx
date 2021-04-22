import { Box, Typography } from "@material-ui/core";
import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { documentState } from "../../stateManagement/attributesState";
import { choosenApplicationState } from "../../stateManagement/choosenApplication";

export const ApplicationReview = () => {
  var db = firebase.firestore();
  let currentApplicationId: string = useRecoilValue(documentState);
  let currentCollection: string = useRecoilValue(choosenApplicationState);
  const [chapterList, setChapterList] = useState<Chapter[]>([]);

  useEffect(() => {
    retriveApplicationData(currentCollection, currentApplicationId);
  }, [currentApplicationId]);

  async function retriveApplicationData(
    currentCollection: string,
    currentApplicationId: string
  ) {
    if (currentCollection == "") {
      console.log("currentCollection is empty");
    } else {
      let chapterListLocal: Array<Chapter> = [];

      await db
        .collection(currentCollection + "Applications")
        .doc(currentApplicationId)
        .get()
        .then((doc) => {
          const docData = doc?.data();
          if (!docData) {
            console.log("no data here");
            return null;
          } else {
            for (let chapter in docData) {
              chapterListLocal.push({
                chapterName: chapter,
                title: docData[chapter].title,
                desc: docData[chapter].desc,
                attributes: docData[chapter].attributes,
                priority: docData[chapter].priority,
                buttons: docData[chapter].buttons,
              });
            }
            setChapterList(chapterListLocal);
          }
        });
    }
  }

  const renderInputFields = (inputFields: Array<InputField>) => {
    let inputFieldList: InputField[] = [];
    for (const inputField in inputFields) {
      inputFieldList.push(inputFields[inputField]);
    }

    inputFieldList.sort(
      (a: InputField, b: InputField) => a.priority - b.priority
    );

    return (
      <div>
        {inputFieldList.map(
          (inputField: firebase.firestore.DocumentData, i: number) => {
            let value = inputField.value;
            if (value != undefined) {
              if (inputField.value.includes("Filename")) {
                let urlAndName = inputField.value.split(".Filename:");
                value = (
                  <a href={urlAndName[0]} download>
                    {urlAndName[1]}
                  </a>
                );
              }
            }
            return (
              <Box pb={3} key={i}>
                <Typography style={{ fontWeight: "bold" }} variant="subtitle1">
                  {inputField.desc}
                </Typography>
                <Typography variant="body1">
                  Svar:
                  {value}
                </Typography>
              </Box>
            );
          }
        )}
      </div>
    );
  };

  const renderAttributes = (attributes: Array<Attribute>) => {
    let attributeList: Attribute[] = [];
    for (const attribute in attributes) {
      attributeList.push(attributes[attribute]);
    }

    attributeList.sort((a: Attribute, b: Attribute) => a.priority - b.priority);

    return (
      <div>
        {attributeList.map(
          (attribute: firebase.firestore.DocumentData, i: number) => {
            return (
              <div key={i}>
                <h2>{attribute.title}</h2>
                <h3>{attribute.desc}</h3>
                {renderInputFields(attribute.input_fields)}
              </div>
            );
          }
        )}
      </div>
    );
  };

  const renderChapters = (chapterList: Array<Chapter>) => {
    chapterList.sort((a: Chapter, b: Chapter) => a.priority - b.priority);
    return (
      <div style={{ width: "100%" }}>
        {chapterList.map((chapter: Chapter, i) => {
          return (
            <div key={i}>
              <Typography style={{ color: "#00adee" }} variant="h4">
                {chapter.title}
              </Typography>
              <Typography gutterBottom={true} variant="h6">
                {chapter.desc}
              </Typography>
              {renderAttributes(chapter.attributes)}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <Box px={10} pt={6}>
        {renderChapters(chapterList)}
      </Box>
    </div>
  );
};

export default ApplicationReview;
