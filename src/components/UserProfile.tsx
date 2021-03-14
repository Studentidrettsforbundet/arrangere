import { useRecoilValue } from "recoil";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  Container,
  Typography,
  Box,
} from "@material-ui/core";
import { currentUserState } from "../stateManagement/userAuth";
import { auth } from "../firebase";
import { useStyles } from "../style/userProfile";

export default function UserProfile() {
  const currentUser = useRecoilValue(currentUserState);
  const classes = useStyles();

  let user: string | null = "ingen bruker";
  if (currentUser != null) {
    user = currentUser.email;
  }

  function handleLogout(e: any) {
    e.preventDefault();
    auth
      .signOut()
      .then(function () {
        console.log("signout complete");
      })
      .catch((error) => {
        console.log("Kunne ikke logge ut");
      });
  }

  return (
    /* <Box p={20}>
      <Typography variant="h4" className={classes.formfield}>
        Min profil
      </Typography>
      <Typography variant="subtitle1" className={classes.formfield}>
        Email: {currentUser?.email}
      </Typography>
      <Typography variant="subtitle1" className={classes.formfield}>
        Telefon:
      </Typography>
      <Typography variant="subtitle1" className={classes.formfield}>
        Idrettsklubb:
      </Typography>
      <Typography variant="subtitle1" className={classes.formfield}>
        Organisasjonsnummer:
      </Typography>
      <Typography variant="subtitle1" className={classes.formfield}>
        Organisasjonens kontonummer:
      </Typography>
    </Box> */
    <Container className={classes.container}>
      <Card className={classes.root}>
        <CardContent className={classes.content}>
          <Typography
            variant="h6"
            className={classes.formfield}
            color="secondary"
          >
            Brukerprofil
          </Typography>
          <Typography variant="body1" className={classes.formfield}>
            Email: {currentUser?.email}
          </Typography>
          <Typography variant="body1" className={classes.formfield}>
            Telefon:
          </Typography>
          <Typography variant="body1" className={classes.formfield}>
            Idrettsklubb:
          </Typography>
          <Typography variant="body1" className={classes.formfield}>
            Organisasjonsnummer:
          </Typography>
          <Typography variant="body1" className={classes.formfield}>
            Organisasjonens kontonummer:
          </Typography>
        </CardContent>
        <Button component={Link} to="/login" onClick={handleLogout}>
          Logg ut
        </Button>
      </Card>
    </Container>
  );
}
