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
      <Box px={10}>
        <Template></Template>
      </Box>
    </div>
  );
};
