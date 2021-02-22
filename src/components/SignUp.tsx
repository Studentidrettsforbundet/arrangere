import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";

import { Container, Typography } from "@material-ui/core";

import FilledInput from "@material-ui/core/FilledInput";
import { Container, Link, Typography } from "@material-ui/core";

import logo from "../assets/logo-sort.png";
import { useSetRecoilState } from "recoil";
import { auth } from "../firebase";
import { BrowserRouter as Router, Link as RouterLink } from "react-router-dom";

import { currentUserState } from "../stateManagement/userAuth";

const useStyles = makeStyles({
  container: {
    margin: "0 auto",
    marginTop: "50px",
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
  errorText: {
    color: "red",
  },
});

const SignUp = () => {
  const classes = useStyles();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);

  const setCurrentUser = useSetRecoilState(currentUserState);
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passError, setPassError] = useState<boolean>(false);

  useEffect(() => {
    auth.onAuthStateChanged((user: any) => {
      if (user != null) {
        setCurrentUser(user.toJSON());
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });
  }, []);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setErrorText("");
    setPassError(false);
    setEmailError(false);
    setLoading(true);

    if (
      emailRef.current!.value == "" ||
      passwordRef.current!.value == "" ||
      passwordConfirmRef.current!.value == ""
    ) {
      return setErrorText("Fyll inn alle felter");
    }

    await auth
      .createUserWithEmailAndPassword(
        emailRef.current!.value,
        passwordRef.current!.value
      )
      .catch(function (error: any) {
        let code = error.code;
        if (code === "auth/email-already-in-use") {
          setErrorText("En bruker er allerede knyttet til denne adressen");
          return setEmailError(true);
        } else if (code === "auth/invalid-email") {
          setErrorText("Ugyldig epostadresse");
          return setEmailError(true);
        } else if (code === "auth/weak-password") {
          setErrorText("Passordet må bestå av minst seks bokstaver eller tegn");
          return setPassError(true);
        } else {
          return setErrorText("Konto ble ikke opprettet");
        }
      });
    if (passwordRef.current!.value !== passwordConfirmRef.current!.value) {
      setPassError(true);
      return setErrorText("Passordene er ikke like");
    }
    setLoading(false);
  }

  return (
    <Container className={classes.container}>
      <Card className={classes.root}>
        <img className={classes.image} src={logo} alt="logo" />

        <CardContent className={classes.content}>
          <form className={classes.form}>
            <FormControl className={classes.formfield}>
              <TextField
                required
                label="E-post"
                inputRef={emailRef}
                variant="filled"
                error={emailError}
              />
            </FormControl>
            <FormControl className={classes.formfield}>
              <TextField
                required
                label="Passord"
                error={passError}
                inputRef={passwordRef}
                variant="filled"
                type="password"
              />
            </FormControl>
            <FormControl className={classes.formfield}>
              <TextField
                required
                error={passError}
                label="Gjenta passord"
                inputRef={passwordConfirmRef}
                variant="filled"
                type="password"
              />
            </FormControl>
          </form>
          <p className={classes.errorText}> {errorText}</p>

          <CardActions>
            <Button
              onClick={(event) => handleSubmit(event)}
              type="submit"
              variant="outlined"
              disabled={loading}
              className={classes.button}
            >
              Registrer
            </Button>
          </CardActions>
        </CardContent>

        <Typography variant="body1" className={classes.text}>
          Har du allerede en konto?{" "}
          <b>
            <Link component={RouterLink} to="/">
              Logg inn her
            </Link>
          </b>
        </Typography>
      </Card>
    </Container>
  );
};

export default SignUp;
