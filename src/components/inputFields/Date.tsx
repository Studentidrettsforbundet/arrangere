import React, { FC } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";

type DateProps = {
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
