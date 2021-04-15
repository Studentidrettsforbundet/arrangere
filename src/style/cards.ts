import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  root: {
    width: 280,
    padding: 20,
    margin: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
});
