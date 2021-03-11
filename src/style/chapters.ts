import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chapter: {
      paddingTop: 25,
      paddingBottom: 20,
    },
    prevBtn: {
      marginRight: 20,
    },
  })
);
