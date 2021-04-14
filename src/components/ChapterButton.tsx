import { Button } from "@material-ui/core";
import { FC } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { inputFieldObjectState } from "../stateManagement/attributesState";
import {
  chapterCounterState,
  currentChapterState,
} from "../stateManagement/choosenApplication";
import { saveInput, useDocRef } from "./inputFields/saveInputFields";

const ChapterButton: FC<ButtonProps> = ({ title, priority }) => {
  const currentChapter = useRecoilValue(currentChapterState);
  const [chapterCounter, setChapterCounter] = useRecoilState(
    chapterCounterState
  );
  const docRef = useDocRef();
  const inputFieldObject = useRecoilValue(inputFieldObjectState);

  const navToChapter = () => {
    setChapterCounter(priority - 1);
    saveInput(docRef, inputFieldObject);
  };

  if (title == currentChapter) {
    return (
      <Button
        key={priority}
        color="secondary"
        size="large"
        onClick={navToChapter}
        style={{ fontWeight: "bold" }}
      >
        {title}
      </Button>
    );
  }
  return (
    <Button size="large" onClick={navToChapter}>
      {title}
    </Button>
  );
};

export default ChapterButton;
