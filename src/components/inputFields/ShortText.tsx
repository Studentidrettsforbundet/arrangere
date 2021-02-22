import React, { FC } from "react";
import TextField from "@material-ui/core/TextField";

type ShortTextProps = {
  desc: string;
  label: string;
};

const ShortText: FC<ShortTextProps> = ({ desc, label }) => {
  return (
    <div className="shortText">
      <p>{desc}</p>
      <TextField id="outlined-basic" label={label} variant="outlined" />
    </div>
  );
};
export default ShortText;
