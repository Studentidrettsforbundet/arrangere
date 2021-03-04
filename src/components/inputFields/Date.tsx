import React, { FC } from "react";
import { useStyles } from "./inputStyles";
import { Typography, TextField } from "@material-ui/core";

type DateProps = {
  desc: string;
};

const Date: FC<DateProps> = ({ desc }) => {
  const classes = useStyles();
  return (
    <div className="dateContainer">
      <Typography>{desc}</Typography>
      <form className={classes.container} noValidate>
        <TextField
          id="date"
          label="Dato"
          type="date"
          defaultValue="2017-05-24"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </form>
    </div>
  );
};
export default Date;
