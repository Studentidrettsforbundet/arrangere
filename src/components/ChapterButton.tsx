import { Button, Box } from "@material-ui/core";
import { FC } from "react";
import { useRecoilValue } from "recoil";
import { currentChapterState } from "../stateManagement/choosenApplication";

type ButtonProps = {
  title: string;
};
const ChapterButton: FC<ButtonProps> = ({ title }) => {
  const currentChapter = useRecoilValue(currentChapterState);
  if (title == currentChapter) {
    return <Button variant="contained">{title}</Button>;
  }
  return <Button> {title} </Button>;
};

export default ChapterButton;
