import React, { useEffect, useRef, useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import { useRecoilState } from "recoil";
import { auth } from "../firebase";
import { currentUserState } from "../stateManagement/userAuth";

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  /*
  const login = (email:string, password:string) => {
      if(email == null || password == null){
        auth.signInWithEmailAndPassword("", "")

      }

  }
  */

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
    setError("");
    setLoading(true);

    await auth
      .signInWithEmailAndPassword(
        emailRef.current!.value,
        passwordRef.current!.value
      )
      .catch(function (error) {
        let code = error.code;
        if (code == "auth/user-not-found") {
          setError("Det finnes ingen bruker med denne adressen");
        } else if (code == "auth/wrong-password") {
          setError("Feil passord");
        } else if (code == "auth/invalid-email") {
          setError("Ugyldig epostadresse");
        } else {
          setError("Kunne ikke logge inn");
        }
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
        </form>
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
