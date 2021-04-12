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
  currentApplicationIdState,
  currentCollectionState,
} from "../../stateManagement/choosenApplication";

type Props = {
  applicationId: string;
  collectionName?: any;
};

export default function AppCard(props: Props) {
  const setCurrentApplicationIdState = useSetRecoilState(
    currentApplicationIdState
  );
  const setCurrentCollectionState = useSetRecoilState(currentCollectionState);
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
              setCurrentApplicationIdState(props.applicationId);
              setCurrentCollectionState(props.collectionName);
            }}
            to={{
              pathname: "/application",
            }}
          >
            Vis søknad
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
