import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { currentUserState } from "../stateManagement/userAuth";
import { auth } from "../firebase";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";

import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import { Container, Typography } from "@material-ui/core";
import logo from "../assets/logo-sort.png";
import { BrowserRouter as Router, Link as RouterLink } from "react-router-dom";
import { Link } from "@material-ui/core";

const useStyles = makeStyles({
  container: {
    // margin: "0 auto",
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
    //alignItems: "center",
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
  errorText: {
    color: "red",
  },
});

const LogIn = () => {
  const classes = useStyles();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
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
    setLoading(true);

    if (emailRef.current!.value == "" || passwordRef.current!.value == "") {
      return setErrorText("Fyll inn alle felter");
    }

    await auth
      .signInWithEmailAndPassword(
        emailRef.current!.value,
        passwordRef.current!.value
      )
      .catch(function (error) {
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

  return (
    <Container className={classes.container}>
      <Card className={classes.root}>
        <img className={classes.image} src={logo} alt="logo" />

        <CardContent>
          <Typography variant="h6">Logg inn</Typography>
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
          </form>
          <p className={classes.errorText}> {errorText}</p>

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
