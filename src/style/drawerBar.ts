import { createStyles, makeStyles, Theme } from "@material-ui/core";

const drawerWidth = 300;

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 300,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
    media: {
      height: 22,
      margin: 10,
    },
  })
);
