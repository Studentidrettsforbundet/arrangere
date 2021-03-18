import Template from "./Template";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { choosenApplicationState } from "../stateManagement/choosenApplication";
import { useEffect, useState } from "react";
import saveFieldToStorage from "./FirebaseStorage";
import Box from "@material-ui/core/Box";
import { ChapterWithID } from "./copyDocument";
import AddDocToUser from "./copyDocument";
import { firestore } from "../firebase";
import { selectedAttributeState } from "../stateManagement/attributesState";
import { documentIDState } from "./ApplicationCard";

export const ApplicationForm = () => {
  const setChoosenApplicationForm = useSetRecoilState(choosenApplicationState);
  const selectedAttribute = useRecoilValue(selectedAttributeState);
  let collection = useRecoilValue(choosenApplicationState);
  const newDocId = useRecoilValue(documentIDState);

  let url = window.location.href;
  var str_sub = url.substr(url.lastIndexOf("/") + 1);

  useEffect(() => {
    setApplicationForm();
  }, []);

  useEffect(() => {
    if (newDocId.length != 0) {
      saveFieldToStorage(
        selectedAttribute?.id,
        selectedAttribute?.value,
        collection,
        newDocId
      );
    }
  }, [newDocId, selectedAttribute]);

  AddDocToUser(newDocId);

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
      <Box px={15} pb={8}>
        <Template></Template>
      </Box>
    </div>
  );
};
