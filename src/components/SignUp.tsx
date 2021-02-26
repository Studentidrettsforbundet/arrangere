import React, {  useRef, useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import { Typography } from "@material-ui/core";
import { Container } from "@material-ui/core";
import { Link } from "@material-ui/core";

import logo from "../assets/logo-sort.png";
import { useRecoilValue  } from "recoil";
import { auth } from "../firebase";
import {
  BrowserRouter as Router,
  Link as RouterLink,
  Redirect,
  useHistory,
} from "react-router-dom";
import { currentUserState } from "../stateManagement/userAuth";
import { useStyles } from "../style/authentication";

const SignUp = () => {
  const classes = useStyles();
  const currentUser = useRecoilValue(currentUserState);


  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);

  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passError, setPassError] = useState<boolean>(false);

  if (currentUser != null) {
    return <Redirect to="/" />;
  }

  const handleSubmit = (e: any)  => {
    e.preventDefault();
    setErrorText("");
    setPassError(false);
    setEmailError(false);

    if (
      emailRef.current!.value == "" ||
      passwordRef.current!.value == "" ||
      passwordConfirmRef.current!.value == ""
    ) {
      return setErrorText("Fyll inn alle feltene");
    }
    if (passwordRef.current!.value !== passwordConfirmRef.current!.value) {
      setPassError(true);
      return setErrorText("Passordene er ikke like");
    }
    setLoading(true);
   auth
      .createUserWithEmailAndPassword(
        emailRef.current!.value,
        passwordRef.current!.value
      )
      .then(() => {
        history.push("/");
      })
      .catch((error: any) => {
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
            Registrer bruker
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
            <FormControl className={classes.formfield}>
              <TextField
                required
                error={passError}
                label="Gjenta passord"
                inputRef={passwordConfirmRef}
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
              Registrer
            </Button>
          </CardActions>
        </CardContent>

        <div className={classes.content}>
          <Typography variant="body1">
            Har du allerede en konto?{" "}
            <b>
              <Link component={RouterLink} to="/login">
                Logg inn her
              </Link>
            </b>
          </Typography>
        </div>
      </Card>
    </Container>
  );
};

export default SignUp;
