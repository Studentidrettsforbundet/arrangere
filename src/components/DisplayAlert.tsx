import { FC, useState } from "react";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { Collapse } from "@material-ui/core";

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
  const [open, setOpen] = useState(true);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Collapse in={open} exit>
        <Alert
          severity="success"
          onClose={() => {
            setOpen(!open);
          }}
        >
          {message}
        </Alert>
      </Collapse>
    </div>
  );
};

export default DisplayAlert;
