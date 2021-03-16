import React, { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { firestore } from "../firebase";
import ChapterWrapper from "./ChapterWrapper";
import {
  chapterCounterState,
  choosenApplicationState,
  currentChapterState,
} from "../stateManagement/choosenApplication";
import { InputField } from "./inputFields/InputWrapper";
import { Box, Button } from "@material-ui/core/";
import { useStyles } from "../style/chapters";
import ChapterButton from "./ChapterButton";

export type Chapter = {
  title: string;
  desc: string;
  attributes: Array<Attribute>;
  priority: number;
};

export type Attribute = {
  title: string;
  mainDesc: string;
  inputFields: Array<InputField>;
};

const Template = () => {
  const classes = useStyles();
  const isInitialMount = useRef(true);
  const [loading, setLoading] = useState(true);
  const [chapterList, setChapterList] = useState<Chapter[]>([]);
  const choosenApplicationForm = useRecoilValue(choosenApplicationState);
  const setCurrentChapterState = useSetRecoilState(currentChapterState);
  const [chapterCounter, setChapterCounter] = useRecoilState(
    chapterCounterState
  );

  useEffect(() => {
    generateApplicationForm();
  }, [choosenApplicationForm]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      setChapterCounter(0);
    }
  });

  async function generateApplicationForm() {
    setLoading(true);
    let chapterListLocal: Array<Chapter> = [];

    await firestore
      .collection(choosenApplicationForm + "Template")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((chapter) => {
          if (chapter.exists) {
            chapterListLocal.push({
              title: chapter.data().title,
              desc: chapter.data().desc,
              attributes: chapter.data().attributes,
              priority: chapter.data().priority,
            });
          } else {
            console.log("No such document!");
            throw new Error("No document.");
          }
        });
      })
      .catch((error) => {
        console.log("Error getting document: ", error);
      });
    setChapterList(chapterListLocal);
    chapterListLocal = [];
    setLoading(false);
  }

  const renderChapters = (chapterList: Array<Chapter>) => {
    const chapters: any = [];
    chapterList.map((chapter: Chapter) => {
      chapters.push(<ChapterWrapper key={chapter.title} chapter={chapter} />);
    });
    chapterList.sort((a: Chapter, b: Chapter) => a.priority - b.priority);
    setCurrentChapterState(chapterList[chapterCounter].title);
    return chapters;
  };

  const renderButtons = (chapterList: Array<Chapter>) => {
    const chapterButtons: any = [];
    chapterList.map((chapter: Chapter) => {
      chapterButtons.push(
        <ChapterButton title={chapter.title} priority={chapter.priority} />
      );
    });
    return chapterButtons;
  };

  const nextChapter = () => {
    if (chapterCounter < chapterList.length - 1) {
      setChapterCounter(chapterCounter + 1);
    }
  };

  const prevChapter = () => {
    if (chapterCounter > 0) {
      setChapterCounter(chapterCounter - 1);
    }
  };
  return (
    <div>
      {loading ? (
        <p>Laster inn..</p>
      ) : (
        <div>
          <div>
            <div>{renderButtons(chapterList)}</div>
            <Box px={15} pt={6}>
              {renderChapters(chapterList)[chapterCounter]}{" "}
              <Button
                variant="contained"
                className={classes.prevBtn}
                onClick={prevChapter}
              >
                Forrige
              </Button>
              <Button variant="contained" onClick={nextChapter}>
                Neste
              </Button>
            </Box>
          </div>
        </div>
      )}
    </div>
  );
};

export default Template;
