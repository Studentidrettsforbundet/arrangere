import React, { useEffect, useRef, useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";

import TextField from "@material-ui/core/TextField";

import { makeStyles } from "@material-ui/core/styles";

import { useRecoilState } from "recoil";
import { auth } from "../firebase";
import { currentUserState } from "../stateManagement/userAuth";

const useStyles = makeStyles({
  errorText: {
    color: "red",
  },
});

const Login = () => {
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
    setPassError(false);
    setEmailError(false);
    setLoading(true);

    await auth
      .signInWithEmailAndPassword(
        emailRef.current!.value,
        passwordRef.current!.value
      )
      .catch(function (error) {
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
    <Card>
      <CardContent>
        <form>
          <FormControl>
            <TextField
              required
              label="E-post"
              inputRef={emailRef}
              variant="filled"
              error={emailError}
            />
          </FormControl>
          <FormControl>
            <TextField
              required
              label="Passord"
              error={passError}
              inputRef={passwordRef}
              variant="filled"
              type="password"
            />
          </FormControl>
        </form>
        <p className={classes.errorText}> {errorText}</p>
      </CardContent>
      <CardActions>
        <Button
          disabled={loading}
          onClick={(event) => handleSubmit(event)}
          type="submit"
          variant="outlined"
        >
          log in
        </Button>
        current user is: {currentUser?.email}
      </CardActions>
    </Card>
  );
};

export default Login;
