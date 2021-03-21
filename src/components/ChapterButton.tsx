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
  // This seems somewhat more complex than necessary. Why do you need the chapter counter?
  // My take on this would be to have a current chapter-state on the parent component, and then use props to pass the
  // value to this component. Then there would not be any need for the counter, and you could have a more robust and
  // readable if-clause.
  const currentChapter = useRecoilValue(currentChapterState);
  const [chapterCounter, setChapterCounter] = useRecoilState(
    chapterCounterState
  );
  const navToChapter = () => {
    setChapterCounter(priority - 1);
  };

  // Personally I find something like this to be more readable.
  let button = (title == currentChapter) ? (
    <Button
      color="secondary"
      size="large"
      onClick={navToChapter}
      style={{ fontWeight: "bold" }}
    >
      {title}
    </Button>
    ) : (
    <Button size="large" onClick={navToChapter}>
      {title}
    </Button>
  );

  return button
};

export default ChapterButton;
