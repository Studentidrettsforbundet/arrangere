import Template from "./Template";
import { useSetRecoilState } from "recoil";
import { choosenApplicationState } from "../stateManagement/choosenApplication";
import { useEffect } from "react";
import FirebaseStorage from "./FirebaseStorage";
import Box from "@material-ui/core/Box";

export const ApplicationForm = () => {
  const setChoosenApplicationForm = useSetRecoilState(choosenApplicationState);

  // This seems like a code smell. Why not use an enum as a prop instead? I would imagine that it will be less
  // error-prone as you will utilize stronger types. In addition it would communicate intent more clearly.
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

  // What is the intent behind this function call? From my understanding you store application-specific information in
  // a global state and the loads the global state in this function before saving it to Firebase.
  // What is your reasoning for utilizing this complex pattern over dropping global state, and rather save
  // local variables directly to Firebase?
  FirebaseStorage();

  return (
    <div style={{ width: "100%" }}>
      <Box pb={8}>
        <Template></Template>
      </Box>
    </div>
  );
};
