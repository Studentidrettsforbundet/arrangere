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

  const setCurrentUser = useSetRecoilState(currentUserState);
  const [loading, setLoading] = useState(false);
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

  async function handleSubmit(e: any) {
    e.preventDefault();
    setErrorText("");
    setPassError(false);
    setEmailError(false);

    if (emailRef.current!.value == "" || passwordRef.current!.value == "") {
      return setErrorText("Fyll inn alle feltene");
    }

    setLoading(true);
    await Promise.all([
      auth.signInWithEmailAndPassword(
        emailRef.current!.value,
        passwordRef.current!.value
      ),
      history.push("/"),
    ]).catch(function (error) {
      setLoading(false);

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
