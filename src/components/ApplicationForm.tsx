import Template from "./Template";
import { useEffect, useState } from "react";
import { Skeleton } from "@material-ui/lab";
import { Box, Typography } from "@material-ui/core";

export const ApplicationForm = () => {
  const [choosenApplicationForm, setChoosenApplicationForm] = useState(" ");

  let url = window.location.href;
  var str_sub = url.substr(url.lastIndexOf("/") + 1);

  useEffect(() => {
    setApplicationForm();
  }, []);

  function setApplicationForm() {
    if (str_sub === "studentnm") {
      setChoosenApplicationForm("snm");
    }
    if (str_sub === "studentleker") {
      setChoosenApplicationForm("sl");
    }
    if (str_sub === "studentcup") {
      setChoosenApplicationForm("sc");
    }
  }
  return (
    <div style={{ width: "100%" }}>
      {choosenApplicationForm === " " ? (
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
