import React from "react";
import Card from '@material-ui/core/Card';
import Link from '@material-ui/core/Link';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import logo from '../assets/logo-sort.png'

type props = { 
    message: string,
}; 
const SignUp = ({ message}: props) =>
    <Card>
        <CardContent>
            <img src={logo} alt="Logo" id='logo' width='70%'/>

            <h4>Registrer</h4>

            {message}
            <form>
            <FormControl id='email-input' fullWidth>
            <InputLabel htmlFor="my-input">E-post</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" />
            </FormControl>

            <FormControl id='password-input' fullWidth>
            <InputLabel htmlFor="my-input">Passord</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" />
            </FormControl>

            <FormControl id='password-confirmation-input' fullWidth>
            <InputLabel htmlFor="my-input" >Gjenta passord</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            </form>
        
        </CardContent>
        <CardActions>
            <Button variant="outlined" type='submit'>
                Sign up
            </Button>
        </CardActions>

        Har du allerede en konto? <Link href='/signin'>Logg inn her</Link>
    </Card>

export default SignUp;