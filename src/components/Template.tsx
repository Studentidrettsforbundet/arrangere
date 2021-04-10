import React, { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { firestore } from "../firebase";
import ChapterWrapper from "./ChapterWrapper";
import {
  chapterCounterState,
  choosenApplicationState,
  currentChapterState,
} from "../stateManagement/choosenApplication";
import { Box, Button, Grid } from "@material-ui/core/";
import { useStyles } from "../style/chapters";
import ChapterButton from "./ChapterButton";

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
    if (isInitialMount.current) {
      isInitialMount.current = false;
      setChapterCounter(0);
    }
    generateApplicationForm();
  }, [choosenApplicationForm]);

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
              chapterName: chapter.id,
              buttons: chapter.data().buttons,
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
        setChapterList(chapterListLocal);
      })
      .catch((error) => {
        console.log("Error getting document: ", error);
      });

    chapterListLocal = [];
    setLoading(false);
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
    setCurrentChapterState(chapterList[chapterCounter].title);
    return chapters;
  };

  const renderButtons = (chapterList: Array<Chapter>) => {
    const chapterButtons: any = [];
    chapterList.map((chapter: Chapter) => {
      chapterButtons.push(
        <ChapterButton
          key={chapter.priority}
          title={chapter.title}
          priority={chapter.priority}
        />
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
            <div role="navigation" className="chapterButtons">
              <Box className={classes.nav}>{renderButtons(chapterList)}</Box>
            </div>
            <div role="main">
              <Box px={15} pt={6}>
                {renderChapters(chapterList)[chapterCounter]}{" "}
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                >
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
                </Grid>
              </Box>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Template;
