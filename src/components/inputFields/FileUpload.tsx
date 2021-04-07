import React, { FC, useState } from "react";
import { Typography, Box } from "@material-ui/core";
import { useRecoilState, useRecoilValue } from "recoil";
import firebase from "firebase";
import { v4 as uuid } from "uuid";
import {
  documentState,
  inputFieldObjectState,
} from "../../stateManagement/attributesState";
import { addFieldInputObject } from "./saveInputFields";

const FileUpload: FC<InputFieldProps> = ({ desc, id, chapterName }) => {
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

        await storageRef.getDownloadURL().then((url) => {
          setFileUrl(url);
        });
        console.log("storageRef: " + storageRef);
        handleChangeValue(storageRef.toString());
      }
    }
  };

  const handleChange = (event: React.ChangeEvent) => {
    var target = event.target as HTMLInputElement;
    saveFile(target);
    // handleChangeValue(target.value);
  };

  const handleChangeValue = (value: string) => {
    let object = addFieldInputObject(value, chapterName, inputFieldObject, id);
    setInputFieldList(object);
    console.log("input value: " + value);
  };

  return (
    <Box py={2}>
      <Typography>{desc}</Typography>
      <input
        accept="pdf"
        id="contained-button-file"
        multiple
        type="file"
        onChange={(e) => {
          handleChange(e);
        }}
      />
      <a href={fileUrl} download>
        {fileName}
      </a>
    </Box>
  );
};

export default FileUpload;
