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
      content: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      },
      formfield: {
        margin: "15px",
      },
});