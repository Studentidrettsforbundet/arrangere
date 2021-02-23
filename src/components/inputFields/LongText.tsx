import React, { FC } from "react";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";

type LongTextProps = {
  desc: string;
};

const LongText: FC<LongTextProps> = ({ desc }) => {
  return (
    <div className="longTextContainer">
      <Typography>{desc}</Typography>
      <TextField
        id="outlined-basic"
        fullWidth
        multiline
        rows={4}
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
      />
    </div>
  );
};
export default LongText;
