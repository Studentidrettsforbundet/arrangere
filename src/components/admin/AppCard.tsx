import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import { useSetRecoilState } from "recoil";
import React from "react";
import { useStyles } from "../../style/cards";
import { Link as RouterLink } from "react-router-dom";
import {
  choosenApplicationState,
  currentApplicationIdState,
  currentCollectionState,
} from "../../stateManagement/choosenApplication";
import { documentState } from "../../stateManagement/attributesState";

type Props = {
  applicationId: string;
  collectionName: string;
  to: string;
};

export default function AppCard(props: Props) {
  // const setCurrentApplicationIdState = useSetRecoilState(
  //   currentApplicationIdState
  // );
  // const setCurrentCollectionState = useSetRecoilState(currentCollectionState);

  const setCurrentApplicationIdState = useSetRecoilState(documentState);
  const setCurrentCollectionState = useSetRecoilState(choosenApplicationState);
  const classes = useStyles();

  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {props.applicationId}
          </Typography>

          <Typography variant="body2" component="p">
            bruker:
          </Typography>
          <Typography variant="body2" component="p">
            dato:
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            component={RouterLink}
            variant="outlined"
            size="small"
            onClick={() => {
              console.log("Props coll name", props.collectionName);
              setCurrentApplicationIdState(props.applicationId);
              setCurrentCollectionState(props.collectionName);
            }}
            to={{
              pathname: props.to,
              state: {
                applicationID: props.applicationId,
                collection: props.collectionName,
              },
            }}
          >
            Vis søknad
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
