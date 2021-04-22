import { Button } from "@material-ui/core";
import { FC } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { inputFieldObjectState } from "../stateManagement/attributesState";
import {
  chapterCounterState,
  currentChapterState,
} from "../stateManagement/choosenApplication";
import { useStyles } from "../style/chapters";
import { saveInput, useDocRef } from "./inputFields/saveInputFields";

const ChapterButton: FC<ButtonProps> = ({ title, priority }) => {
  const currentChapter = useRecoilValue(currentChapterState);
  const [chapterCounter, setChapterCounter] = useRecoilState(
    chapterCounterState
  );
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
