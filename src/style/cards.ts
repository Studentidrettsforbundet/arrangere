import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 300,
      margin: 20,
      padding: 20,
      display: "flex",
      flexDirection: "column",
    },
    content: {
      flexDirection: "column",
    },
    header: {
      alignItems: "center",
    },
    actions: {
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "center",
    },
    cardButton: {
      color: theme.palette.secondary.dark,
      borderColor: theme.palette.secondary.dark,
    },
    media: {
      height: 30,
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    inProgressColor: {
      color: "white",
      backgroundColor: "#F4BC1C",
    },
    submittedColor: {
      color: "white",
      backgroundColor: "#8DB600",
    },
    avatar: {
      backgroundColor: "black",
      fontSize: 18,
    },
  })
);
