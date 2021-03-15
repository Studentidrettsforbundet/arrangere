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
import { useStyles } from "../style/cards";

type Props = {
  image: string;
  title: string;
  to: string;
  template: string;
};

export const ApplicationCard = (props: Props) => {
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
          component={RouterLink}
          to={{
            pathname: props.to,
          }}
          size="small"
          color="primary"
        >
          Ny søknad
        </Button>
      </CardActions>
    </Card>
  );
};
