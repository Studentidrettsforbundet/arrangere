import { makeStyles } from "@material-ui/core/styles";
import { theme } from "./typography";

export const useStyles = makeStyles({
  container: {
    marginTop: "6vw",
    display: "flex",
    alignItems: "center",
  },
  root: {
    width: "100vw",
    display: "flex",
    flexDirection: "row",
    maxWidth: 800,
    padding: 30,
  },
  contentGrid: {},
  header: {
    marginBottom: "10px",
  },
  contentHeader: {
    marginTop: "1rem",
    marginLeft: "1rem;",
    fontWeight: "bold",
  },
  content: {
    marginLeft: "1rem;",
    marginBottom: "0.8rem",
  },
  divider: {
    marginBottom: "1rem",
  },
  paper: {
    width: "45rem",
    border: "1px solid",
    borderColor: "lightblue",
    marginTop: "1rem",
    borderRadius: "8px",
  },
});
