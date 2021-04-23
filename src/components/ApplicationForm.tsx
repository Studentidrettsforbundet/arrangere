import Template from "./Template";
import { Skeleton } from "@material-ui/lab";
import { Box, Typography } from "@material-ui/core";

export const ApplicationForm = (props: any) => {
  return (
    <div style={{ width: "100%" }}>
      {props.location.template != undefined ? (
        <Box p={10}>
          <Typography component="p">Laster inn..</Typography>
          <Skeleton />
        </Box>
      ) : (
        <Box pb={8}>
          <Template
            choosenApplicationForm={props.location.state.template}
          ></Template>
        </Box>
      )}
    </div>
  );
};
