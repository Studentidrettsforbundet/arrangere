import { makeStyles, createStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: "block",
    },
  })
);

export const useStyles2 = makeStyles({
  deleteButton: {
    margin: "3px",
    padding: "15px",
    color: "rgba(0, 0, 0, 0.54)",
  },
  accordions: {
    margin: "3px",
  },
});
