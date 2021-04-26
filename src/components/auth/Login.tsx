import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  currentUserState,
  loadingUserState,
} from "../../stateManagement/userAuth";
import {
  errorState,
  errorStateSelector,
} from "../../stateManagement/errorHandling";
import { auth } from "../../firebase";
import Alert from "@material-ui/lab/Alert";
import {
  Container,
  Typography,
  Link,
  FormControl,
  Button,
  TextField,
  CardContent,
  CardActions,
  Card,
} from "@material-ui/core";
import logo from "../../images/logo-sort.png";
import {
  BrowserRouter as Router,
  Link as RouterLink,
  Redirect,
  useHistory,
} from "react-router-dom";
import { useStyles } from "../../style/authentication";

const LogIn = () => {
  const currentUser = useRecoilValue(currentUserState);

  const history = useHistory();
  const classes = useStyles();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const userLoading = useRecoilValue(loadingUserState);
  const error = useRecoilValue(errorStateSelector);
  const setError = useSetRecoilState(errorState);

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      setError("");
    }
  });

  if (currentUser !== null && !userLoading) {
    return <Redirect to="/" />;
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (emailRef.current!.value == "" || passwordRef.current!.value == "") {
      return setError("required");
    }

    setLoading(true);
    auth
      .signInWithEmailAndPassword(
        emailRef.current!.value,
        passwordRef.current!.value
      )
      .then(() => {
        history.push("/");
      })
      .catch(() => {
        setError("login");
      });

    setLoading(false);
  };

  let alertContainer;
  if (error.status !== "") {
    alertContainer = (
      <Alert className={classes.formfield} severity="error">
        {error.text}
      </Alert>
    );
  }

  return (
    <Container role="main" className={classes.container}>
      <Card className={classes.root}>
        <img className={classes.image} src={logo} alt="logo" />

        <CardContent>
          <Typography variant="h6" component="h1" className={classes.formfield}>
            Logg inn
          </Typography>
          <form className={classes.form}>
            <FormControl className={classes.formfield}>
              <TextField
                required
                inputProps={{ "aria-label": "E-post" }}
                label="E-post"
                inputRef={emailRef}
                variant="outlined"
              />
            </FormControl>
            <FormControl className={classes.formfield}>
              <TextField
                required
                inputProps={{ "aria-label": "Passord" }}
                label="Passord"
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
