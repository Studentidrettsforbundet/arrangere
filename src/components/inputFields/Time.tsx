import React, { FC } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";

type TimeProps = {
  desc: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  })
);

const Time: FC<TimeProps> = ({ desc }) => {
  const classes = useStyles();
  return (
    <div className="timeContainer">
      <form className={classes.container} noValidate>
        <TextField
          id="time"
          label={desc}
          type="time"
          defaultValue="07:30"
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
