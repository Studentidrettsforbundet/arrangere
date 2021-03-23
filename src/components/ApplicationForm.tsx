import Template from "./Template";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { choosenApplicationState } from "../stateManagement/choosenApplication";
import { useEffect } from "react";
import saveFieldToDocument from "./FirebaseStorage";
import Box from "@material-ui/core/Box";
import { selectedAttributeState } from "../stateManagement/attributesState";
import { documentState } from "./ApplicationCard";

export const ApplicationForm = () => {
  const setChoosenApplicationForm = useSetRecoilState(choosenApplicationState);
  const selectedAttribute = useRecoilValue(selectedAttributeState);
  let collection = useRecoilValue(choosenApplicationState);
  const newDocId = useRecoilValue(documentState);

  let url = window.location.href;
  var str_sub = url.substr(url.lastIndexOf("/") + 1);

  useEffect(() => {
    setApplicationForm();
  }, []);

  /* 
  TODO: right now saveFieldToDocument are rendered before AddDocToUser
  meaning the docID might be empty, and an error will occur
  */
  /*

  useEffect(() => {
    if (newDocId != " ") {
      saveFieldToDocument(
        selectedAttribute?.id,
        selectedAttribute?.value,
        collection,
        newDocId
      );
    }
  }, [newDocId, selectedAttribute]);

  */

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
      <Box pb={8}>
        <Template></Template>
      </Box>
    </div>
  );
};
