import { Button } from "@material-ui/core";
import { FC } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  chapterCounterState,
  currentChapterState,
} from "../stateManagement/choosenApplication";

type ButtonProps = {
  key: number;
  title: string;
  priority: number;
};

const ChapterButton: FC<ButtonProps> = ({ title, priority }) => {
  const currentChapter = useRecoilValue(currentChapterState);
  const [chapterCounter, setChapterCounter] = useRecoilState(
    chapterCounterState
  );
  const navToChapter = () => {
    setChapterCounter(priority - 1);
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
