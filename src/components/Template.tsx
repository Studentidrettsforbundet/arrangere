import React, { useEffect, useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import { firestore } from "../firebase";
import { chapterCounterState } from "../stateManagement/choosenApplication";
import DisplayError from "./DisplayError";
import Application from "./Application";
import Skeleton from "@material-ui/lab/Skeleton";
import Box from "@material-ui/core/Box";
import { Typography } from "@material-ui/core";

type TemplateProps = {
  choosenApplicationForm: string;
};

const Template = (props: TemplateProps) => {
  const isInitialMount = useRef(true || "");
  const [loading, setLoading] = useState(true);
  const [chapterList, setChapterList] = useState<Chapter[]>([]);
  const setChapterCounter = useSetRecoilState(chapterCounterState);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      setChapterCounter(0);
    }
    generateApplicationForm();
  }, [props.choosenApplicationForm]);

  async function generateApplicationForm() {
    setLoading(true);
    let chapterListLocal: Array<Chapter> = [];

    await firestore
      .collection(props.choosenApplicationForm + "Template")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((chapter) => {
          if (chapter.exists) {
            chapterListLocal.push({
              chapterName: chapter.id,
              buttons: chapter.data().buttons,
              title: chapter.data().title,
              desc: chapter.data().desc,
              attributes: chapter.data().attributes,
              priority: chapter.data().priority,
            });
          } else {
            throw new Error("No document.");
          }
        });
      })
      .catch((error) => {
        console.error("Error getting document: ", error);
      });

    setChapterList(chapterListLocal);
    setLoading(false);
  }

  return (
    <div style={{ width: "100%" }}>
      {loading ? (
        <Box m={10}>
          <Typography>Laster inn</Typography>
          <Skeleton />
        </Box>
      ) : (
        <Application chapterList={chapterList}></Application>
      )}
    </div>
  );
};

export default Template;
