import { Button } from "@material-ui/core";
import { FC } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { inputFieldObjectState } from "../../stateManagement/attributesState";
import {
  chapterCounterState,
  currentChapterState,
} from "../../stateManagement/applicationState";
import { useStyles } from "../../style/chapters";
import { saveInput, useDocRef } from "../application/saveInputFields";

const ChapterButton: FC<ButtonProps> = ({ title, priority }) => {
  const currentChapter = useRecoilValue(currentChapterState);
  const setChapterCounter = useSetRecoilState(chapterCounterState);
  const docRef = useDocRef();
  const inputFieldObject = useRecoilValue(inputFieldObjectState);
  const classes = useStyles();

  const navToChapter = () => {
    setChapterCounter(priority - 1);
    saveInput(docRef!, inputFieldObject);
  };

  if (title == currentChapter) {
    return (
      <Button
        key={priority}
        className={classes.currentButton}
        size="large"
        onClick={navToChapter}
      >
        {title}
      </Button>
    );
  }
  return (
    <Button
      className={classes.chapterButton}
      size="large"
      onClick={navToChapter}
    >
      {title}
    </Button>
  );
};

export default ChapterButton;
