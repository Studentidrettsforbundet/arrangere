import { FC } from "react";
import { TextField, Typography } from "@material-ui/core";

export type InfoLongTextProps = {
  desc: string;
  priority: number;
  title: string;
};

export const InfoLongText: FC<InfoLongTextProps> = ({ desc, title }) => {
  return (
    <div className="infoLongTextContainer">
      <h1>{title}</h1>
      <Typography>{desc}</Typography>
    </div>
  );
};
