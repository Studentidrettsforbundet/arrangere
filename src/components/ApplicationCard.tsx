import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { firestore } from "../firebase";
import { documentState } from "../stateManagement/attributesState";
import { currentUserState } from "../stateManagement/userAuth";
import { useStyles } from "../style/cards";
import { addDocToUser } from "./inputFields/addDocToUser";
import { copyDoc } from "./inputFields/copyDoc";

export const ApplicationCard = (props: CardProps) => {
  const classes = useStyles();

  const setDocID = useSetRecoilState(documentState);
  const currentUser = useRecoilValue(currentUserState);

  const handleOnClick = async () => {
    const newDocId = await copyDoc(props.template);
    setDocID(newDocId);
    addDocToUser(currentUser!.uid, newDocId, props.template);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={props.image} />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          component={RouterLink}
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
