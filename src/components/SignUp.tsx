import React, { useRef, useState } from "react";
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
import { useRecoilValue, useSetRecoilState } from "recoil";
import { auth } from "../firebase";
import {
  BrowserRouter as Router,
  Link as RouterLink,
  Redirect,
  useHistory,
} from "react-router-dom";
import { currentUserState } from "../stateManagement/userAuth";
import { useStyles } from "../style/authentication";
import {
  errorState,
  errorStateSelector,
} from "../stateManagement/errorHandling";

const SignUp = () => {
  const classes = useStyles();
  const history = useHistory();
  const currentUser = useRecoilValue(currentUserState);

  const [loading, setLoading] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);

  const setError = useSetRecoilState(errorState);
  const error = useRecoilValue(errorStateSelector);

  if (currentUser != null) {
    return <Redirect to="/" />;
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (
      emailRef.current!.value === "" ||
      passwordRef.current!.value === "" ||
      passwordConfirmRef.current!.value === ""
    ) {
      return setError("required");
    }
    if (passwordRef.current!.value !== passwordConfirmRef.current!.value) {
      return setError("not-match");
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
      .catch((err: any) => {
        setError(err.code);
      });

    setLoading(false);
  };

  let alertContainer;
  if (error.status != "") {
    alertContainer = (
      <Alert className={classes.formfield} severity="error">
        {error.text}
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
                error={error.status == "email"}
              />
            </FormControl>
            <FormControl className={classes.formfield}>
              <TextField
                required
                label="Passord"
                error={error.status == "password"}
                inputRef={passwordRef}
                variant="outlined"
                type="password"
              />
            </FormControl>
            <FormControl className={classes.formfield}>
              <TextField
                required
                error={error.status == "password"}
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
