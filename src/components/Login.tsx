import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FilledInput from "@material-ui/core/FilledInput";
import {
  Container,
  Typography,
  Link,
  Paper,
  TextField,
} from "@material-ui/core";
import { BrowserRouter as Router, Link as RouterLink } from "react-router-dom";
import logo from "../assets/logo-sort.png";

const useStyles = makeStyles({
  /*
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#E8E8E8",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
  },
  form: {
    display: "flex", flexDirection: "column",
  },
  formfield: {
    margin: "15px",
  },
  
  button: {
    width: "150px",
  },
  text: {
    margin: "10px",
  },
 */
  container: {
    margin: "50px auto",
    backgroundColor: "lightgrey",
    height: "500px",
  },
  image: {
    width: "500px",
    margin: "40px",
  },
});
const LogIn = () => {
  const classes = useStyles();

  return (
    <Paper elevation={3} className={classes.container}>
      <Grid container spacing={2}>
        <form>
          <Grid item>
            <img src={logo} alt="logo" className={classes.image} />
          </Grid>{" "}
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  size="small"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  size="small"
                  type="password"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="outlined">
              Logg inn
            </Button>

            <Typography variant="body1">
              Har du ikke konto?{" "}
              <b>
                <Link component={RouterLink} to="/signup">
                  Registrer deg her
                </Link>
              </b>
            </Typography>
          </Grid>
        </form>
      </Grid>
    </Paper>
  );
};

export default LogIn;
