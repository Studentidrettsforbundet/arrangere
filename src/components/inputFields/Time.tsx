import React, { FC } from "react";
import { useStyles } from "./inputStyles";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";

type TimeProps = {
  desc: string;
};

const Time: FC<TimeProps> = ({ desc }) => {
  const classes = useStyles();
  return (
    <div className="timeContainer">
      <Typography>{desc}</Typography>
      <form className={classes.container} noValidate>
        <TextField
          id="time"
          label="Tidspunkt"
          type="time"
          defaultValue="12:00"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
        />
      </form>
    </div>
  );
};
export default Time;
