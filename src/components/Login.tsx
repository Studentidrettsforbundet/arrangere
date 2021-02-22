import React, {useEffect, useRef,useState} from "react";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel'
import {
    useSetRecoilState,
  } from 'recoil';
  import { auth } from "../firebase";
  import {currentUserState} from "../stateManagement/userAuth"


const Login = () =>{
   const emailRef = useRef<HTMLInputElement>(null);
   const passwordRef = useRef<HTMLInputElement>(null);

   const setCurrentUser = useSetRecoilState(currentUserState)
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState<string>("")


   useEffect(() =>{
       const unsubscribe = auth.onAuthStateChanged( ( user :  any ) =>{
           setCurrentUser(user.toJSON())
           setLoading(false)
   })
   return unsubscribe
    },[])

    async function handleSubmit(e:any){
        try{
            setError("")
            setLoading(true)
            await auth.signInWithEmailAndPassword(emailRef?.current?.value!, passwordRef?.current?.value!)
        }catch{
            setError("failed to log in")
        }
        setLoading(false)
    }
    
return(
    <Card>
        <CardContent>
            <form>
            <FormControl>
                {error}
            <InputLabel htmlFor="email">Email address</InputLabel>
            <OutlinedInput  inputRef={emailRef} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
            <InputLabel htmlFor="email">password</InputLabel>
            <OutlinedInput  inputRef={passwordRef} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            </form>        
        </CardContent>
        <CardActions>
            <Button disabled={loading} onClick={(event) => handleSubmit(event)} type="submit" variant="outlined" >
                Sign up
            </Button>
        </CardActions>
    </Card>
)
}

export default Login;