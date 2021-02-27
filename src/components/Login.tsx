import React, { useEffect, useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import { currentUserState } from "../stateManagement/userAuth";
import { auth } from "../firebase";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import { Typography } from "@material-ui/core";
import { Container } from "@material-ui/core";
import { Link } from "@material-ui/core";

import logo from "../assets/logo-sort.png";
import {
  BrowserRouter as Router,
  Link as RouterLink,
  useHistory,
} from "react-router-dom";
import { useStyles } from "../style/authentication";

const LogIn = () => {
  const history = useHistory();
  const classes = useStyles();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // consider using state here
  const setCurrentUser = useSetRecoilState(currentUserState);
  const [loading, setLoading] = useState(false);

  // consider creating an interface or type named FirebaseError/LoginError/or similar,
  // and collecting all of these errors in one state
  // of type useState<FirebaseError> if only one error can occur at one time
  // or useState<FirebaseError[]> if multiple can occur simultaneously.
  const [errorText, setErrorText] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passError, setPassError] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      if (user != null) {
        setCurrentUser(user.toJSON());
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // e is a possible error? would be nice to use a proper type here
  async function handleSubmit(e: any) {
    e.preventDefault();
    setErrorText("");
    setPassError(false);
    setEmailError(false);

    if (emailRef.current!.value == "" || passwordRef.current!.value == "") {
      return setErrorText("Fyll inn alle feltene");
    }

    setLoading(true);
    await auth
      .signInWithEmailAndPassword(
        emailRef.current!.value,
        passwordRef.current!.value
      )
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        // it is better pratice to use switch-cases here. It communicates your intent more clearly, and
        // guarantees that every case is handled.
        let code = error.code;
        if (code == "auth/user-not-found") {
          setErrorText("Det finnes ingen bruker med denne adressen");
          return setEmailError(true);
        } else if (code == "auth/wrong-password") {
          setErrorText("Feil passord");
          return setPassError(true);
        } else if (code == "auth/invalid-email") {
          setErrorText("Ugyldig epostadresse");

          return setEmailError(true);
        } else {
          setErrorText("Kunne ikke logge inn");
        }
      });

    setLoading(false);
  }
  let alertContainer;
  if (errorText != "") {
    alertContainer = (
      <Alert className={classes.formfield} severity="error">
        {errorText}
      </Alert>
    );
  }

  // there is a lot of logic and a lot of UI in this file. I think it would be beneficial to seperate it
  // by refactoring the following into a separate component. I don't want to think about login logic when I am
  // improving the UI, and I certainly do not want to have all this UI-code if I am debugging login-logic.

  return (
    <Container className={classes.container}>
      <Card className={classes.root}>
        <img className={classes.image} src={logo} alt="logo" />

        <CardContent>
          <Typography variant="h6" className={classes.formfield}>
            Logg inn
          </Typography>
          <form className={classes.form}>
            <FormControl className={classes.formfield}>
              <TextField
                required
                label="E-post"
                inputRef={emailRef}
                variant="outlined"
                error={emailError}
              />
            </FormControl>
            <FormControl className={classes.formfield}>
              <TextField
                required
                label="Passord"
                error={passError}
                inputRef={passwordRef}
                variant="outlined"
                type="password"
              />
            </FormControl>
            {alertContainer}
          </form>

          <CardActions className={classes.content}>
            <Button
              onClick={(event) => handleSubmit(event)}
              type="submit"
              variant="outlined"
              disabled={loading}
              className={classes.button}
            >
              Logg inn
            </Button>
          </CardActions>
        </CardContent>

        <div className={classes.content}>
          <Typography variant="body1">
            Har du ikke konto?{" "}
            <b>
              <Link component={RouterLink} to="/signup">
                Register deg her
              </Link>
            </b>
          </Typography>
        </div>
      </Card>
    </Container>
  );
};

export default LogIn;
