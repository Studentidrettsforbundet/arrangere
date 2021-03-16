import Template from "./Template";
import { useSetRecoilState } from "recoil";
import { choosenApplicationState } from "../stateManagement/choosenApplication";
import { useEffect } from "react";
import FirebaseStorage from "./FirebaseStorage";
import Box from "@material-ui/core/Box";

export const ApplicationForm = (props: any) => {
  const setChoosenApplicationForm = useSetRecoilState(choosenApplicationState);

  let url = window.location.href;
  var str_sub = url.substr(url.lastIndexOf("/") + 1);

  useEffect(() => {
    if (str_sub == "studentnm") {
      setChoosenApplicationForm("snm");
    }
    if (str_sub == "studentleker") {
      setChoosenApplicationForm("sl");
    }
    if (str_sub == "studentcup") {
      setChoosenApplicationForm("sc");
    }
  });

  FirebaseStorage();

  return (
    <div style={{ width: "100%" }}>
      <Box pb={8}>
        <Template></Template>
      </Box>
    </div>
  );
};
