import React, { FC } from "react";
import TextField from "@material-ui/core/TextField";

type LongTextProps = {
  desc: string;
  label: string;
};

const LongText: FC<LongTextProps> = ({ desc, label }) => {
  return (
    <div className="longText">
      <p>{desc}</p>
      <TextField
        id="outlined-full-width"
        label={label}
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
