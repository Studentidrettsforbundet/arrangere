import Template from "./Template";
import { useRecoilValue } from "recoil";
import { choosenApplicationState } from "../stateManagement/choosenApplication";
import { Skeleton } from "@material-ui/lab";
import { Box, Typography } from "@material-ui/core";

export const ApplicationForm = () => {
  const applicationForm = useRecoilValue(choosenApplicationState);

  return (
    <div style={{ width: "100%" }}>
      {applicationForm == " " ? (
        <Box p={10}>
          <Typography variant="subtitle2">Laster inn..</Typography>
          <Skeleton />
        </Box>
      ) : (
        <Box pb={8}>
          <Template choosenApplicationForm={applicationForm}></Template>
        </Box>
      )}
    </div>
  );
};
