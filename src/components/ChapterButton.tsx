import { Button, Box } from "@material-ui/core";
import { FC } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  chapterCounterState,
  currentChapterState,
} from "../stateManagement/choosenApplication";

type ButtonProps = {
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
      <Button onClick={navToChapter} variant="contained">
        {title}
      </Button>
    );
  }
  return <Button onClick={navToChapter}> {title} </Button>;
};

export default ChapterButton;
