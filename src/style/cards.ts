import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
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
    // borderColor: "#EC9706",
    // color: "#EC9706",
  },
  submittedColor: {
    color: "white",
    backgroundColor: "#8DB600",
    // borderColor: "#66a113",
    // color: "#66a113",
  },
  avatar: {
    backgroundColor: "black",
    fontSize: 18,
  },
});
