import Template from "./Template";
import { useRecoilValue } from "recoil";
import { choosenApplicationState } from "../stateManagement/choosenApplication";
import { Skeleton } from "@material-ui/lab";
import { Box, Typography } from "@material-ui/core";

export const ApplicationForm = (props: any) => {
  //const applicationForm = useRecoilValue(choosenApplicationState);
  console.log("props.location.template", props.location.state.template);

  return (
    <div style={{ width: "100%" }}>
      {props.location.template != undefined ? (
        <Box p={10}>
          <Typography variant="subtitle2">Laster inn..</Typography>
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
