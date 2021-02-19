import React, { useEffect, useRef, useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import { useSetRecoilState } from "recoil";
import { auth } from "../firebase";
import firebase from "firebase/app";

import { currentUserState } from "../stateManagement/userAuth";

const SignUp = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);

  const setCurrentUser = useSetRecoilState(currentUserState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

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

    if (passwordRef.current!.value != passwordConfirmRef.current!.value) {
      return setError("Passwords do not match");
    }
    setError("");
    setLoading(true);
    await auth
      .createUserWithEmailAndPassword(
        emailRef?.current?.value!,
        passwordRef?.current?.value!
      )
      .catch(function (error) {
        setError(error.message);
      });
    setLoading(false);
  }

  return (
    <Card>
      <CardContent>
        <form>
          <FormControl>
            {error}
            <InputLabel htmlFor="email">Email address</InputLabel>
            <OutlinedInput
              inputRef={emailRef}
              id="my-input"
              aria-describedby="my-helper-text"
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="email">password</InputLabel>
            <OutlinedInput
              inputRef={passwordRef}
              id="my-input"
              aria-describedby="my-helper-text"
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="email">password confirm</InputLabel>
            <OutlinedInput
              inputRef={passwordConfirmRef}
              id="my-input"
              aria-describedby="my-helper-text"
              required
            />
          </FormControl>
        </form>
      </CardContent>
      <CardActions>
        <Button
          disabled={loading}
          onClick={(event) => handleSubmit(event)}
          type="submit"
          variant="outlined"
        >
          Sign up
        </Button>
      </CardActions>
    </Card>
  );
};

export default SignUp;
