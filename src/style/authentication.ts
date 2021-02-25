import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  container: {
    marginTop: "10%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  root: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 800,
    padding: 30,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formfield: {
    margin: "15px",
  },
  image: {
    padding: "20px",
    width: "40%",
    alignSelf: "center",
  },
  button: {
    display: "flex",
    alignSelf: "center",
  },
  text: {
    margin: "10px",
  },
});
