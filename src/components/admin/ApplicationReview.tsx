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
import { Chapter } from "../Template";

export const ApplicationReview = () => {
  const classes = useStyles();
  var db = firebase.firestore();
  let [applicationData, setApplicationData] = useState<any>([]);
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
            console.log(chapterListLocal);

            setApplicationData([...applicationData, docData]);
          }
        });
    }
  }

  const renderChapters = (chapterList: Array<Chapter>) => {
    const chapters: any = [];
    chapterList.map((chapter: Chapter) => {
      chapters.push(
        <ChapterWrapper
          key={chapter.title}
          chapterName={chapter.chapterName}
          chapter={chapter}
        />
      );
    });
    chapterList.sort((a: Chapter, b: Chapter) => a.priority - b.priority);
    //setCurrentChapterState(chapterList[chapterCounter].title);
    return chapters;
  };

  return (
    <div>
      {/* <ul>
        {applicationData.map((data: any, i: any) => (
          <li key="i">{JSON.stringify(data)}</li>
        ))}
      </ul> */}
      <Box px={15} pt={6}>
        {renderChapters(chapterList)}
      </Box>
    </div>
  );
};

export default ApplicationReview;
