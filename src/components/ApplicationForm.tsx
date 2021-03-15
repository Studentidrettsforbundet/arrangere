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
      <Box px={15} pb={8}>
        <Template></Template>
      </Box>
    </div>
  );
};
