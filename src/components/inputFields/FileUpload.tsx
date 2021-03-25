import React, { FC, useState } from "react";
import { Typography, Box, Link } from "@material-ui/core";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import firebase from "firebase";
import { v4 as uuid } from "uuid";
import { documentState } from "../../stateManagement/attributesState";

import { inputFieldObjectState } from "../../stateManagement/attributesState";
import { addFieldInputObject } from "./saveInputFields";

const FileUpload: FC<InputFieldProps> = ({ desc, id, chapterName }) => {
  // const [attribute, setAttribute] = useRecoilState(attributesState(id));
  // const setSelectedAttribute = useSetRecoilState(selectedAttributeIdState);
  // const selectedID = useRecoilValue(selectedAttributeIdState);
  const docID = useRecoilValue(documentState);
  const [fileUrl, setFileUrl] = useState();
  const [fileName, setFileName] = useState("");
  const [inputFieldObject, setInputFieldList] = useRecoilState(
    inputFieldObjectState
  );

  const saveFile = async (target: HTMLInputElement) => {
    var files = target.files;
    var file;
    if (files != null) {
      for (var i = 0; i < files.length; i++) {
        file = files.item(i);
        const fileId = uuid();
        setFileName(file!.name);

        const storageRef = firebase
          .storage()
          .ref("files")
          .child(docID)
          .child(fileId);
        await storageRef.put(file!);
        console.log("file ", file!.name, " saved, with ID: ", fileId);
        console.log("current doc ID: " + docID);

        storageRef.getDownloadURL().then((url) => {
          setFileUrl(url);
        });
      }
    }
  };

  const handleChange = (event: React.ChangeEvent) => {
    var target = event.target as HTMLInputElement;
    console.log("target value: ", target.value);
    saveFile(target);
    // setAttribute({
    //   ...attribute,
    //   value: target.value,
    //   id: selectedID,
    // });
  };
  // const handleChange = (value: string) => {
  //   let object = addFieldInputObject(value, chapterName, inputFieldObject, id);
  //   setInputFieldList(object);
  // };

  return (
    <Box py={2}>
      <Typography>{desc}</Typography>
      <input
        accept="pdf"
        id="contained-button-file"
        multiple
        type="file"
        // onChange={(e) => {
        //   handleChange(e.target.value);
        // }}
      />
      <a href={fileUrl} download>
        {fileName}
      </a>
    </Box>
  );
};

export default FileUpload;
