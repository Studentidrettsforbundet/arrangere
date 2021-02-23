import React, { FC } from "react";
import TextField from "@material-ui/core/TextField";

type ShortTextProps = {
  desc: string;
};

const ShortText: FC<ShortTextProps> = ({ desc }) => {
  return (
    <div className="shortText">
      <p>{desc}</p>
      <TextField id="outlined-basic" variant="outlined" />
    </div>
  );
};
export default ShortText;
