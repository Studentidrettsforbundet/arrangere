import Template from "./Template";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { choosenApplicationState } from "../stateManagement/choosenApplication";
import { Skeleton } from "@material-ui/lab";
import { Box, Typography } from "@material-ui/core";

export const ApplicationForm = () => {
  const [choosenApplicationForm, setChoosenApplicationForm] = useState(" ");
  const setCorrectApplicationForm = useSetRecoilState(choosenApplicationState);

  let url = window.location.href;
  var str_sub = url.substr(url.lastIndexOf("/") + 1);

  useEffect(() => {
    setApplicationForm();
  }, []);

  function setApplicationForm() {
    if (str_sub == "studentnm") {
      setCorrectApplicationForm("snm");
      console.log("Collection in application", choosenApplicationForm);
      setChoosenApplicationForm("snm");
    }
    if (str_sub == "studentleker") {
      setCorrectApplicationForm("sl");
      setChoosenApplicationForm("sl");
    }
    if (str_sub == "studentcup") {
      setCorrectApplicationForm("sc");
      setChoosenApplicationForm("sc");
    }
  }
  return (
    <div style={{ width: "100%" }}>
      {choosenApplicationForm == " " ? (
        <Box p={10}>
          <Typography variant="subtitle2">Laster inn..</Typography>
          <Skeleton />
        </Box>
      ) : (
        <Box pb={8}>
          <Template choosenApplicationForm={choosenApplicationForm}></Template>
        </Box>
      )}
    </div>
  );
};
