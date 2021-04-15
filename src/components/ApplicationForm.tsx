import Template from "./Template";
import { useRecoilCallback, useSetRecoilState } from "recoil";
import { choosenApplicationState } from "../stateManagement/choosenApplication";
import { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";

export const ApplicationForm = () => {
  const [choosenApplicationForm, setChoosenApplicationForm] = useState(" ");

  let url = window.location.href;
  var str_sub = url.substr(url.lastIndexOf("/") + 1);

  useEffect(() => {
    setApplicationForm();
  }, [url]);

  function setApplicationForm() {
    if (str_sub == "studentnm") {
      setChoosenApplicationForm("snm");
    }
    if (str_sub == "studentleker") {
      setChoosenApplicationForm("sl");
    }
    if (str_sub == "studentcup") {
      setChoosenApplicationForm("sc");
    }
  }

  return (
    <div style={{ width: "100%" }}>
      {choosenApplicationForm == " " ? (
        <p>Laster inn..</p>
      ) : (
        <Box pb={8}>
          <Template choosenApplicationForm={choosenApplicationForm}></Template>
        </Box>
      )}
    </div>
  );
};
