import { FC } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

type ErrorProps = {
  title: string;
  message: string;
};

const DisplayError: FC<ErrorProps> = ({ title, message }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Alert severity="error">
        <AlertTitle>Oisann, det oppsto en feil!</AlertTitle>
        Prøv å last inn siden på nytt.
        {JSON.stringify(message)}
      </Alert>
    </div>
  );
};

export default DisplayError;
