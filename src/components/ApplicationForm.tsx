import Template from "./Template";
import { useSetRecoilState } from "recoil";
import { choosenApplicationState } from "../stateManagement/choosenApplication";
import { useEffect } from "react";
import Box from "@material-ui/core/Box";

export const ApplicationForm = (props: any) => {
  const setChoosenApplicationForm = useSetRecoilState(choosenApplicationState);

  let url = window.location.href;
  var str_sub = url.substr(url.lastIndexOf("/") + 1);

  useEffect(() => {
    if (str_sub == "studentnm") {
      setChoosenApplicationForm("snmTemplate");
    }
    if (str_sub == "studentleker") {
      setChoosenApplicationForm("slTemplate");
    }
    if (str_sub == "studentcup") {
      setChoosenApplicationForm("scTemplate");
    }
  });

  return (
    <div id="hallo" style={{ width: "100%" }}>
      <Box px={15} pb={8}>
        <Template></Template>
      </Box>
    </div>
  );
};
