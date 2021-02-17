import React, { useEffect, useRef } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import { Container, makeStyles, Typography } from "@material-ui/core";
import logo from "../assets/logo-sort.png";

const useStyles = makeStyles({
  container: {
    paddingTop: "20",
  },
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  image: {
    height: 30,
  },
});

const Login = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Card className={classes.root}>
        <img className={classes.image} src={logo} alt="logo" />
        <Typography>Logg inn</Typography>
        <CardContent>
          <form>
            <FormControl>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="email">Passord</InputLabel>
              <Input id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
          </form>
        </CardContent>
        <CardActions>
          <Button type="submit" variant="outlined">
            Logg inn
          </Button>
        </CardActions>
        <Typography>Har du ikke en konto? Registrer deg her</Typography>
      </Card>
    </Container>
  );
};

export default Login;
