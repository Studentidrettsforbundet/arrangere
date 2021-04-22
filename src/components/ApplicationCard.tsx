import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { documentState } from "../stateManagement/attributesState";
import { choosenApplicationState } from "../stateManagement/choosenApplication";
import { currentUserState } from "../stateManagement/userAuth";
import { useStyles } from "../style/cards";
import { addDocToUser } from "./inputFields/addDocToUser";
import { copyDoc } from "./inputFields/copyDoc";

export const ApplicationCard = (props: CardProps) => {
  const classes = useStyles();

  const currentUser = useRecoilValue(currentUserState);
  const setDocID = useSetRecoilState(documentState);
  const setApplicationForm = useSetRecoilState(choosenApplicationState);

  const handleOnClick = async () => {
    const newDocId = await copyDoc(props.template);
    setDocID(newDocId);
    addDocToUser(currentUser!.uid, newDocId, props.template);
    setApplicationForm(props.template);
  };

  return (
    <Card className={classes.root} style={{ width: 250, padding: 25 }}>
      <CardContent>
        <CardMedia className={classes.media} image={props.image} />
        <Typography variant="body2" color="textSecondary" component="p">
          {props.title}
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button
          className={classes.cardButton}
          component={RouterLink}
          variant="outlined"
          to={{
            pathname: props.to,
            state: { template: props.template },
          }}
          size="small"
          color="primary"
          onClick={() => handleOnClick()}
        >
          Ny søknad
        </Button>
      </CardActions>
    </Card>
  );
};
