import { Box, Button, Typography } from "@material-ui/core";
import { DockRounded } from "@material-ui/icons";
import firebase from "firebase";
import React, { constructor, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { firestore } from "../../firebase";
import {
  currentApplicationIdState,
  currentCollectionState,
} from "../../stateManagement/choosenApplication";
import { useStyles } from "../../style/chapters";
import ChapterWrapper from "../ChapterWrapper";
import { InputField } from "../inputFields/InputWrapper";
import { Chapter, Attribute } from "../Template";

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

  // const renderChapters = (chapterList: Array<Chapter>) => {
  //   const chapters: any = [];
  //   chapterList.map((chapter: Chapter) => {
  //     chapters.push(
  //       <ChapterWrapper
  //         key={chapter.title}
  //         chapterName={chapter.chapterName}
  //         chapter={chapter}
  //       />
  //     );
  //   });
  //   chapterList.sort((a: Chapter, b: Chapter) => a.priority - b.priority);
  //   //setCurrentChapterState(chapterList[chapterCounter].title);
  //   return chapters;
  // };

  // async function getInputField(fieldPath: string) {
  //   let value = "";
  //   await firestore
  //     .collection(currentCollection)
  //     .doc(currentApplicationId)
  //     .get()
  //     .then((res) => {
  //       value = res.get(fieldPath);
  //       return value;
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   return value;
  // }

  // const renderInputFields = (chapterList: Array<Chapter>) => {
  //   let attributeList: Array<any> = [];
  //   let fieldPaths: Array<string> = [];
  //   chapterList.forEach((chapter: Chapter) => {
  //     attributeList.push(chapter.attributes);
  //     //let chapterName = chapter;
  //     attributeList.forEach((attributes: any) => {
  //       for (const attribute in attributes) {
  //         let inputFields = attributes[attribute].input_fields;
  //         for (const inputField in inputFields) {
  //           // console.log(inputField);
  //           let fieldPath = `${chapter.chapterName}.attributes.${attribute}.input_fields.${inputField}`;
  //           //console.log(fieldPath);
  //           fieldPaths.push(fieldPath);
  //         }
  //         // console.log(attributes[attribute].input_fields);
  //         // Har fått ut fieldpath (må fikses på med input slik at den ikke er hardkodet)

  //         // const inputField = getInputField(fieldPath);
  //         // console.log(inputField);
  //       }
  //       //console.log(attributes);
  //     });
  //   });
  //   //console.log(fieldPaths);
  //   return fieldPaths;
  // };

  const renderInputFields = (inputFields: any) => {
    let inputs: Array<any> = [];

    for (const inputField in inputFields) {
      inputs.push(inputFields[inputField]);
    }

    let i = (
      <div>
        {inputs.map((input) => {
          return (
            <div>
              <p>{input.desc}</p>
              <p style={{ color: "red" }}>{input.value}</p>
            </div>
          );
        })}
      </div>
    );

    return i;
  };

  const renderAttributes = (attributes: any) => {
    let inputFields: Array<string> = [];
    let attr: Array<any> = [];
    for (const attribute in attributes) {
      attr.push(attributes[attribute]);
      inputFields.push(attributes[attribute].input_fields);
    }

    let attri = (
      <div>
        {attr.map((attribute) => {
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
    return attri;
  };

  const renderChapters = (chapterList: Array<Chapter>) => {
    let chapters = (
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
    return chapters;
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
