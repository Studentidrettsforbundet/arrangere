import React from "react";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel'

type props = { 
    message: string,
    //emailRef: ref;
}; 
const SignUp = ({ message}: props) =>
    <Card>
        <CardContent>
            <form>
            <FormControl>
            <InputLabel htmlFor="my-input">Email address</InputLabel>
            <OutlinedInput   id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
    

            </form>
                {message}
        
        </CardContent>
        <CardActions>
            <Button variant="outlined" >
                Sign up
            </Button>
        </CardActions>
    </Card>

export default SignUp;