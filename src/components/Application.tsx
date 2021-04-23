import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import ChapterWrapper from "./ChapterWrapper";
import {
  chapterCounterState,
  currentChapterState,
} from "../stateManagement/applicationState";
import { Box, Button } from "@material-ui/core/";
import { useStyles } from "../style/chapters";
import ChapterButton from "./ChapterButton";
import { saveInput, useDocRef } from "./inputFields/saveInputFields";
import { inputFieldObjectState } from "../stateManagement/attributesState";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { ReactElement } from "react";

const Application = (props: ApplicationProps) => {
  const classes = useStyles();
  const docRef = useDocRef();
  const setCurrentChapterState = useSetRecoilState(currentChapterState);
  const [chapterCounter, setChapterCounter] = useRecoilState(
    chapterCounterState
  );
  const inputFieldObject = useRecoilValue(inputFieldObjectState);

  const renderChapters = (chapterList: Array<Chapter>) => {
    const chapters: ReactElement[] = [];
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
    const chapterButtons: ReactElement[] = [];
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
    if (chapterCounter < props.chapterList.length - 1) {
      setChapterCounter(chapterCounter + 1);
      saveInput(docRef!, inputFieldObject);
    }
  };

  const prevChapter = () => {
    if (chapterCounter > 0) {
      setChapterCounter(chapterCounter - 1);
      saveInput(docRef!, inputFieldObject);
    }
  };

  return (
    <div>
      <div role="navigation" className="chapterButtons">
        <Box className={classes.nav}>{renderButtons(props.chapterList)}</Box>
      </div>
      <div role="main">
        <Box px={15} pb={6} pt={6}>
          {renderChapters(props.chapterList)[chapterCounter]}{" "}
          <Box display="flex" mt={3}>
            <Box width="100%">
              {chapterCounter > 0 ? (
                <Button
                  variant="contained"
                  className={classes.prevBtn}
                  onClick={prevChapter}
                  startIcon={<NavigateBeforeIcon />}
                >
                  Forrige
                </Button>
              ) : (
                <Button
                  disabled
                  variant="contained"
                  className={classes.prevBtn}
                  onClick={prevChapter}
                  startIcon={<NavigateBeforeIcon />}
                >
                  Forrige
                </Button>
              )}{" "}
            </Box>
            <Box flexShrink={0}>
              {chapterCounter < props.chapterList.length - 1 ? (
                <Button
                  variant="contained"
                  onClick={nextChapter}
                  endIcon={<NavigateNextIcon />}
                >
                  Neste
                </Button>
              ) : (
                <Button
                  disabled
                  variant="contained"
                  onClick={nextChapter}
                  endIcon={<NavigateNextIcon />}
                >
                  Neste
                </Button>
              )}{" "}
            </Box>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default Application;
