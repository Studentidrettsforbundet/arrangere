import { Typography } from "@material-ui/core";
import Template from "./Template";
import { useSetRecoilState } from "recoil";
import { choosenApplicationState } from "../stateManagement/choosenApplication";
import { useEffect } from "react";

export const ApplicationForm = (props: any) => {
  let title = props.location.state.title;
  let template = props.location.state.template;

  const setChoosenApplicationForm = useSetRecoilState(choosenApplicationState);

  useEffect(() => {
    setChoosenApplicationForm(template);
  });

  return (
    <>
      <Typography gutterBottom variant="h5" component="h2">
        {title}
      </Typography>
      <Template></Template>
    </>
  );
};
