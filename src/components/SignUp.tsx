import React, {useEffect, useRef} from "react";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel'
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import { auth } from "../firebase";
import firebase from "firebase/app"


const currentUserState = atom({
    key: 'user',
    default: null,
})



const SignUp = () =>{
   const emailRef = useRef<HTMLInputElement>(null);
   const passwordRef = useRef<HTMLInputElement>(null);

   const passwordConfirmRef = useRef<HTMLInputElement>(null);

   const [currentUser, setCurrentUser] = useRecoilState<any>(currentUserState)
   
   function SignUpFunc(email:string, password:string){
       auth.createUserWithEmailAndPassword(email, password)

   }

   useEffect(() =>{
       const unsubscribe = auth.onAuthStateChanged((user:any) =>{
           setCurrentUser(user)
   })
   return unsubscribe
    },[])

    function handleSubmit(e:any){
        e.preventDefault()
        SignUpFunc(emailRef?.current?.value!, passwordRef?.current?.value!)

    }
return(
    <Card>
        <CardContent>
            <form>
            <FormControl>
            <InputLabel htmlFor="email">Email address</InputLabel>
            <OutlinedInput  inputRef={emailRef} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
            <InputLabel htmlFor="email">password</InputLabel>
            <OutlinedInput  inputRef={passwordRef} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
            <InputLabel htmlFor="email">password confirm</InputLabel>
            <OutlinedInput  inputRef={passwordConfirmRef} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            </form>        
        </CardContent>
        <CardActions>
            <Button onClick={(event) => handleSubmit(event)} type="submit" variant="outlined" >
                Sign up
            </Button>
        </CardActions>
    </Card>
)
}

export default SignUp;