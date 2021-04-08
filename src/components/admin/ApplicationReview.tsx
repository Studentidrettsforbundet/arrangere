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

export type Chapter = {
  chapterName: string;
  title: string;
  desc: string;
  attributes: Array<Attribute>;
  priority: number;
  buttons: Array<string>;
};

export type Attribute = {
  title: string;
  mainDesc: string;
  inputFields: Array<InputField>;
  priority: number;
};

export const ApplicationReview = () => {
  const classes = useStyles();
  var db = firebase.firestore();
  let [applicationData, setApplicationData] = useState<any>([]);
  let currentApplicationId: string = useRecoilValue(currentApplicationIdState);
  let currentCollection: string = useRecoilValue(currentCollectionState);
  const [chapterList, setChapterList] = useState<Chapter[]>([]);

  useEffect(() => {
    retriveApplicationData(currentCollection, currentApplicationId);
    //generateApplicationForm();
    //renderChapters(chapterList);
  }, [currentApplicationId]);

  // function retriveApplicationData(
  //   currentCollection: string,
  //   currentApplicationId: string
  // ) {
  //   if (currentCollection != "") {
  //     db.collection(currentCollection)
  //       .doc(currentApplicationId)
  //       .get()
  //       .then((doc) => {
  //         doc.forEach((ca))
  //         if (!doc.data()) {
  //           console.log("no data here");
  //           return null;
  //         } else {
  //           setApplicationData([...applicationData, doc.data()]);
  //         }
  //       });
  //   } else {
  //     console.log("currentCollection is empty");
  //   }
  // }

  async function retriveApplicationData(
    currentCollection: string,
    currentApplicationId: string
  ) {
    if (currentCollection != "") {
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
            setApplicationData([...applicationData, docData]);
          }
        });
    } else {
      console.log("currentCollection is empty");
    }
  }

  // async function generateApplicationForm() {
  //   let chapterListLocal: Array<Chapter> = [];

  //   await firestore
  //     .collection(currentCollection.replace("Applications", "Template"))
  //     //.doc(currentApplicationId)
  //     .get()
  //     .then((snapshot) => {
  //       snapshot.docs.forEach((chapter) => {
  //         // .then((doc) => {
  //         if (chapter.exists) {
  //           //     const docData = doc?.data();
  //           //     if (!docData) {
  //           //       console.log("no data here");
  //           //       return null;
  //           //     } else {

  //           chapterListLocal.push({
  //             // activities: docData.activities,
  //             // practical: docData.practical,
  //             // economy: docData.economy,
  //             // general: docData.general,
  //             // additional: docData.additional,
  //             chapterName: chapter.id,
  //             buttons: chapter.data().buttons,
  //             title: chapter.data().title,
  //             desc: chapter.data().desc,
  //             attributes: chapter.data().attributes,
  //             priority: chapter.data().priority,
  //             // chapterName: chapter.id,
  //             // title: chapter.data().title,
  //             // desc: chapter.data().desc,
  //             // attributes: chapter.data().attributes,
  //             // priority: chapter.data().priority,
  //           });
  //           console.log(chapterListLocal);
  //         }
  //         // else {
  //         //   console.log("No such document!");
  //         //   throw new Error("No document.");
  //         // }
  //       });
  //     });

  //   setChapterList(chapterListLocal);
  //   chapterListLocal = [];
  // }

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
  //   //console.log(chapterList);
  //   chapterList.sort((a: Chapter, b: Chapter) => a.priority - b.priority);
  //   return chapters;
  // };

  return (
    <>
      <ul>
        {applicationData.map((data: any, i: any) => (
          <li key="i">{JSON.stringify(data)}</li>
        ))}
      </ul>
      {/* <div>
        <div>
          <div>
            <div role="navigation" className="chapterButtons">
              <Box className={classes.nav}>{}</Box>
            </div>
            <div role="main">
              <Box px={15} pt={6}>
                {renderChapters(chapterList)}{" "}
                <Button variant="contained">Neste</Button>
              </Box>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default ApplicationReview;
