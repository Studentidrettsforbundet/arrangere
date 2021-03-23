import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  Link,
  TextField,
  Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import logo from "../images/logo-sort.png";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  BrowserRouter as Router,
  Link as RouterLink,
  Redirect,
  useHistory,
} from "react-router-dom";
import { auth } from "../firebase";
import {
  currentUserState,
  loadingUserState,
} from "../stateManagement/userAuth";
import { useStyles } from "../style/authentication";
import {
  errorState,
  errorStateSelector,
} from "../stateManagement/errorHandling";
import firebase from "firebase";

const SignUp = () => {
  var db = firebase.firestore();
  const classes = useStyles();
  const history = useHistory();
  const currentUser = useRecoilValue(currentUserState);

  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);

  const error = useRecoilValue(errorStateSelector);
  const setError = useSetRecoilState(errorState);
  const userLoading = useRecoilValue(loadingUserState);

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      setError("");
    }
  });

  if (currentUser != null && !userLoading) {
    return <Redirect to="/" />;
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

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
    if (!checked) {
      return setError("privacy");
    }

    setLoading(true);
    auth
      .createUserWithEmailAndPassword(
        emailRef.current!.value,
        passwordRef.current!.value
      )
      .then((cred) => {
        if (cred.user != null) {
          return db.collection("user").doc(cred.user.uid).set({
            organization: "",
            role: "",
            email: emailRef.current!.value,
            applications: {},
          });
        }
      })
      .then(() => {
        history.push("/");
      })
      .catch((err: any) => {
        setError(err.code);
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
                error={error.status === "email"}
              />
            </FormControl>
            <FormControl className={classes.formfield}>
              <TextField
                required
                label="Passord"
                error={error.status === "password"}
                inputRef={passwordRef}
                variant="outlined"
                type="password"
              />
            </FormControl>
            <FormControl className={classes.formfield}>
              <TextField
                required
                error={error.status === "password"}
                label="Gjenta passord"
                inputRef={passwordConfirmRef}
                variant="outlined"
                type="password"
              />
            </FormControl>
            <FormControlLabel
              className={classes.checkbox}
              value="end"
              control={
                <Checkbox
                  color="primary"
                  checked={checked}
                  onChange={handleChange}
                />
              }
              label={
                <div>
                  <span>
                    Jeg samtykker til at «arrangere» behandler
                    personopplysninger på vegne av NSI i henhold til{" "}
                  </span>
                  <Link href={"www.studentidrett.no/personvern"}>
                    NSIs gjeldenede peronvernspolicy
                  </Link>
                </div>
              }
              labelPlacement="end"
            />
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
