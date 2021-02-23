import React, { FC } from "react";
import TextField from "@material-ui/core/TextField";

type LongTextProps = {
  desc: string;
};

const LongText: FC<LongTextProps> = ({ desc }) => {
  return (
    <div className="longText">
      <p>{desc}</p>
      <TextField
        id="outlined-full-width"
        fullWidth
        multiline
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
      />
    </div>
  );
};
export default LongText;
