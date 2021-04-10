import { FC } from "react";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";

type AlertProps = {
  title: string;
  message: string;
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const DisplayAlert: FC<AlertProps> = ({ title, message }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Alert severity="success" onClose={() => {}}>
        {message}
      </Alert>
    </div>
  );
};

export default DisplayAlert;
