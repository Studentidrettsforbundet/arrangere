import { Button, Box } from "@material-ui/core";
import { FC } from "react";

type ButtonProps = {
  title: string;
};
const ChapterButton: FC<ButtonProps> = ({ title }) => {
  return <Button> {title} </Button>;
};

export default ChapterButton;
