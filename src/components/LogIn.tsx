import React from "react";
import Card from '@material-ui/core/Card';
import Link from '@material-ui/core/Link';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel'

type props = { 
    message: string;
}; 
const SignUp = ({ message}: props) =>
    <Card>
        <CardContent>

            {message}
            <form>
            <FormControl id='email-input'>
            <InputLabel htmlFor="my-input">E-post</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" />
            </FormControl>

            <FormControl id='passord-input'>
            <InputLabel htmlFor="my-input">Passord</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" />
            </FormControl>

            </form>
        
        </CardContent>
        <CardActions>
            <Button variant="outlined" type='submit'>
                Logg inn
            </Button>
        </CardActions>

    Har du ikke en konto? <Link href='/signup'>Registrer deg her</Link>

    </Card>

export default SignUp;