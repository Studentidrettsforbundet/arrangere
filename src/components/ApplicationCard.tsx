import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { useStyles } from "../style/cards";
import { Link as RouterLink } from "react-router-dom";

export const ApplicationCard = (props: CardProps) => {
  const classes = useStyles();
  return (
    <Card className={classes.root} style={{ width: 250, padding: 25 }}>
      <CardContent>
        <CardMedia className={classes.media} image={props.image} />
        <Typography variant="body2" color="textSecondary" component="p">
          {props.title}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          component={RouterLink}
          to={{
            pathname: props.to,
            state: { collection: props.collection },
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
