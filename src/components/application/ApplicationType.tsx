import { Link as RouterLink } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { useStyles } from "../../style/cards";

export const ApplicationType = (props: CardProps) => {
  const classes = useStyles();
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
