import React, { FC } from "react";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";

type NumberProps = {
  desc: string;
};

const Number: FC<NumberProps> = ({ desc }) => {
  return (
    <div className="NumberContainer">
      <Typography>{desc}</Typography>
      <TextField
        id="outlined-basic"
        variant="outlined"
        fullWidth
        type="number"
      />
    </div>
  );
};
export default Number;
