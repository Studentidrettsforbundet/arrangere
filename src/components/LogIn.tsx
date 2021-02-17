import React, {useEffect, useRef} from "react";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel'
import { Typography } from "@material-ui/core";


const Login = () =>{
   
return(
    <Card>
        <CardContent>
        <Typography>Logg inn</Typography>
            <form>
            <FormControl>
            <InputLabel htmlFor="email">Email address</InputLabel>
            <OutlinedInput  id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
            <InputLabel htmlFor="email">password</InputLabel>
            <OutlinedInput  id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            </form>        
        </CardContent>
        <CardActions>
            <Button  type="submit" variant="outlined" >
                Logg inn
            </Button>
        </CardActions>
        <Typography>Har du ikke en konto? Registrer deg her</Typography>
    </Card>
)
}

export default Login;