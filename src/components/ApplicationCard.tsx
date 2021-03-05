import React from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { Link, Link as RouterLink } from "react-router-dom";
import { useStyles } from "../style/cards";
import { ApplicationForm } from "./ApplicationForm";

// type Props = {
//   image: string;
//   title: any;
//   to: object;
// };

export const ApplicationCard = (props: any) => {
  const classes = useStyles();
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
          //component={RouterLink}
          //to={{ pathname: "/application", AppProps: { title: "julie" } }}
          size="small"
          color="primary"
        >
          <Link
            to={{ pathname: "/application", state: { title: props.title } }}
          >
            About
          </Link>
          Ny søknad
        </Button>
      </CardActions>
    </Card>
  );
};
