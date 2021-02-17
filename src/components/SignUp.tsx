import React, {useEffect, useRef} from "react";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel'
import { Typography } from "@material-ui/core";
import logo from '../assets/logo-sort.png';


const Signup = () =>{
   
return(
    <Card>
        <img src={logo} alt="logo"/>
        <Typography>Registrering</Typography>
        <CardContent>
            <form>
            <FormControl>
            <InputLabel htmlFor="email">Email address</InputLabel>
            <OutlinedInput   id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
            <InputLabel htmlFor="email">password</InputLabel>
            <OutlinedInput   id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
            <InputLabel htmlFor="email">password confirm</InputLabel>
            <OutlinedInput  id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            </form>        
        </CardContent>
        <CardActions>
            <Button  type="submit" variant="outlined" >
                Sign up
            </Button>
        </CardActions>
        <Typography>Har du allerede en konto? Logg inn her</Typography>
    </Card>
)
}

export default Signup;