import { Box, Typography } from "@material-ui/core";
import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import {
  currentApplicationIdState,
  currentCollectionState,
} from "../../stateManagement/choosenApplication";
import { useStyles } from "../../style/chapters";

export const ApplicationReview = () => {
  const classes = useStyles();
  var db = firebase.firestore();
  let currentApplicationId: string = useRecoilValue(currentApplicationIdState);
  let currentCollection: string = useRecoilValue(currentCollectionState);
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
        .collection(currentCollection)
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
    let inputFieldList: Array<any> = [];
    for (const inputField in inputFields) {
      inputFieldList.push(inputFields[inputField]);
    }

    inputFieldList.sort(
      (a: InputField, b: InputField) => a.priority - b.priority
    );

    return (
      <div>
        {inputFieldList.map((inputField) => {
          return (
            <Box>
              <Typography variant="subtitle1">{inputField.desc}</Typography>
              <Typography style={{ color: "red" }} variant="body2">
                Svar: {inputField.value}
              </Typography>
            </Box>
          );
        })}
      </div>
    );
  };

  const renderAttributes = (attributes: Array<Attribute>) => {
    let attributeList: Array<any> = [];
    for (const attribute in attributes) {
      attributeList.push(attributes[attribute]);
    }

    attributeList.sort((a: Attribute, b: Attribute) => a.priority - b.priority);

    return (
      <div>
        {attributeList.map((attribute) => {
          return (
            <div>
              <h2>{attribute.title}</h2>
              <h3>{attribute.desc}</h3>
              {renderInputFields(attribute.input_fields)}
            </div>
          );
        })}
      </div>
    );
  };

  const renderChapters = (chapterList: Array<Chapter>) => {
    chapterList.sort((a: Chapter, b: Chapter) => a.priority - b.priority);
    return (
      <div style={{ width: "100%" }}>
        {chapterList.map((chapter: Chapter) => {
          return (
            <div>
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
      <Box px={15} pt={6}>
        {renderChapters(chapterList)}
      </Box>
    </div>
  );
};

export default ApplicationReview;
