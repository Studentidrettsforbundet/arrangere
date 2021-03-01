import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    padding: 20,
    margin: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  media: {
    height: 30,
  },
});

export const ApplicationCard = (props: any) => {
  const classes = useStyles();
  return (
    <div>
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
    </div>
  );
};
