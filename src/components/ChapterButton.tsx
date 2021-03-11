import { Button } from "@material-ui/core";
import { FC } from "react";
import Box from "@material-ui/core/Box";

type ButtonProps = {
  title: string;
};
const ChapterButton: FC<ButtonProps> = ({ title }) => {
  return <Button> {title} </Button>;
};

export default ChapterButton;
