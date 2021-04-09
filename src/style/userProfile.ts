import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  container: {
    marginTop: "6vw",
    display: "flex",
    alignItems: "center",
    /*  justifyContent: "center", */
  },
  root: {
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    maxWidth: 800,
    padding: 30,
  },
  contentGrid: {},
  header: {
    marginBottom: "10px",
  },
  contentHeader: {
    marginTop: "30px",
  },
  content: {
    marginTop: "5px",
  },
  divider: {
    marginBottom: "15px",
  },
  icon: {
    width: "80px",
    height: "100px",
  },
});
