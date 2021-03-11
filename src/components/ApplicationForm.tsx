import { Typography } from "@material-ui/core";
import Template from "./Template";
import { useSetRecoilState } from "recoil";
import { choosenApplicationState } from "../stateManagement/choosenApplication";
import { useEffect } from "react";
import Box from "@material-ui/core/Box";

export const ApplicationForm = (props: any) => {
  let title = props.location.state.title;
  let template = props.location.state.template;

  const setChoosenApplicationForm = useSetRecoilState(choosenApplicationState);

  useEffect(() => {
    setChoosenApplicationForm(template);
  });

  return (
    <div id="hallo" style={{ width: "100%" }}>
<<<<<<< HEAD
      <Box px={10}>
=======
      <Box display="flex" flexDirection="row" bgcolor="background.paper">
        <Box p={1} bgcolor="grey.300">
          Item 1
        </Box>
        <Box p={1} bgcolor="grey.300">
          Item 1
        </Box>
        <Box p={1} bgcolor="grey.300">
          Item 1
        </Box>
        <Box p={1} bgcolor="grey.300">
          Item 1
        </Box>
      </Box>
      <Box px={15} py={8}>
>>>>>>> 87e3e6273cecd157ac4b306c1456626aa4da2dc0
        <Template></Template>
      </Box>
    </div>
  );
};
