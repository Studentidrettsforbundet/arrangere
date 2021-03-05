import { Typography } from "@material-ui/core";
import React from "react";

// type Props = {
//   title: object;
// };

export const ApplicationForm = (props: any) => {
  console.log("application", props.location.state);
  return (
    <>
      <Typography gutterBottom variant="h5" component="h2">
        {props.location.state.title}
        Hei
      </Typography>
    </>
  );
};
