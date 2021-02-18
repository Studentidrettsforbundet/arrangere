import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FilledInput from "@material-ui/core/FilledInput";
import { Container, Typography } from "@material-ui/core";
import logo from "../assets/logo-sort.png";

const useStyles = makeStyles({
  container: {
    paddingTop: "50px",
  },
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formfield: {
    margin: "15px",
  },
  image: {
    padding: "50px",
    width: "40%",
  },
  button: {
    width: "150px",
  },
  text: {
    margin: "10px",
  },
});

const Signup = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Card className={classes.root}>
        <img className={classes.image} src={logo} alt="logo" />

        <CardContent className={classes.content}>
          <Typography variant="h6">Registrering</Typography>
          <form className={classes.form}>
            <FormControl className={classes.formfield}>
              <Typography variant="body2">Email</Typography>
              <FilledInput id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl className={classes.formfield}>
              <Typography variant="body2">Passord</Typography>
              <FilledInput id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl className={classes.formfield}>
              <Typography variant="body2">Gjenta passord</Typography>
              <FilledInput
                id="filled-basic"
                aria-describedby="my-helper-text"
              />
            </FormControl>
          </form>
          <CardActions>
            <Button type="submit" variant="outlined" className={classes.button}>
              Registrer
            </Button>
          </CardActions>
        </CardContent>

        <Typography variant="body1" className={classes.text}>
          Har du allerede en konto? <b>Logg inn her</b>
        </Typography>
      </Card>
    </Container>
  );
};

export default Signup;
