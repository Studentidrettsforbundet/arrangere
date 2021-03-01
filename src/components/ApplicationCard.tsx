import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { useStyles } from "../style/cards";

type Props = {
  image: string;
  text: string;
  to: string;
};

export const ApplicationCard = (props: Props) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={props.image} />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.text}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button component={Link} to={props.to} size="small" color="primary">
          Ny søknad
        </Button>
      </CardActions>
    </Card>
  );
};
