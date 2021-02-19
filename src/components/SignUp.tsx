import React, { useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FilledInput from "@material-ui/core/FilledInput";
import { Container, Typography } from "@material-ui/core";
import logo from "../assets/logo-sort.png";
import { atom, useRecoilState } from "recoil";
import { auth } from "../firebase";

const currentUserState = atom({
  key: "user",
  default: null,
});

const useStyles = makeStyles({
  container: {
    margin: "0 auto",
    marginTop: "50px",
  },
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#E8E8E8",
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
});

const SignUp = () => {
  const classes = useStyles();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const passwordConfirmRef = useRef<HTMLInputElement>(null);

  const [currentUser, setCurrentUser] = useRecoilState<any>(currentUserState);

  function SignUpFunc(email: string, password: string) {
    auth.createUserWithEmailAndPassword(email, password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  function handleSubmit(e: any) {
    e.preventDefault();
    SignUpFunc(emailRef?.current?.value!, passwordRef?.current?.value!);
  }

  return (
    <Container className={classes.container}>
      <Card className={classes.root}>
        <img className={classes.image} src={logo} alt="logo" />

        <CardContent className={classes.content}>
          <Typography variant="h6">Registrering</Typography>
          <form className={classes.form}>
            <FormControl className={classes.formfield}>
              <Typography variant="body2">Email</Typography>
              <FilledInput
                inputRef={emailRef}
                id="my-input"
                aria-describedby="my-helper-text"
                size="small"
              />
            </FormControl>
            <FormControl className={classes.formfield}>
              <Typography variant="body2">Passord</Typography>
              <FilledInput
                inputRef={passwordRef}
                id="my-input"
                aria-describedby="my-helper-text"
              />
            </FormControl>
            <FormControl className={classes.formfield}>
              <Typography variant="body2">Gjenta passord</Typography>
              <FilledInput
                inputRef={passwordConfirmRef}
                id="filled-basic"
                aria-describedby="my-helper-text"
              />
            </FormControl>
          </form>
          <CardActions>
            <Button
              onClick={(event) => handleSubmit(event)}
              type="submit"
              variant="outlined"
              className={classes.button}
            >
              Registrer
            </Button>
          </CardActions>
        </CardContent>

        <Typography variant="body1" className={classes.text}>
          Har du allerede en konto? <b>Logg inn her</b>
        </Typography>
      </Card>
    </Container>
  );
};

export default SignUp;
