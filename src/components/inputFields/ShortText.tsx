import React, { FC } from "react";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";

type ShortTextProps = {
  desc: string;
};

const ShortText: FC<ShortTextProps> = ({ desc }) => {
  return (
    <div className="shortTextContainer">
      <Typography>{desc}</Typography>
      <TextField id="outlined-basic" variant="outlined" fullWidth />
    </div>
  );
};
export default ShortText;
