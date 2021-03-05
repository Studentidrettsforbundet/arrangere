import { Typography } from "@material-ui/core";
import Template from "./Template";

export const ApplicationForm = (props: any) => {
  let title = props.location.state.title;
  return (
    <>
      <Typography gutterBottom variant="h5" component="h2">
        {title}
      </Typography>
      <Template></Template>
    </>
  );
};
