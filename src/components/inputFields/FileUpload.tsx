import React, { FC, useEffect, useRef, useState } from "react";
import { Box, Button } from "@material-ui/core";
import { addFieldInputObject, useDocRef } from "./saveInputFields";
import { getInputValue } from "./getInputValue";
import { useRecoilState, useRecoilValue } from "recoil";
import firebase from "firebase";
import { v4 as uuid } from "uuid";
import {
  applicationIDState,
  inputFieldObjectState,
} from "../../stateManagement/attributesState";

const FileUpload: FC<InputProps> = ({ desc, id, chapterName }) => {
  const docID = useRecoilValue(applicationIDState);
  const [fileUrl, setFileUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [inputFieldObject, setInputFieldList] = useRecoilState(
    inputFieldObjectState
  );

  const isInitialMount = useRef(true);
  const docRef = useDocRef();

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      getInputValue(docRef!, chapterName, id).then((value) => {
        if (value != undefined) {
          let urlAndName = value.split(".Filename:");
          setFileUrl(urlAndName[0]);
          setFileName(urlAndName[1]);
        }
      });
    }
  }, [fileUrl, fileName]);

  const saveFile = async (target: HTMLInputElement) => {
    var files = target.files;
    var file: File | null;
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

        await storageRef.getDownloadURL().then((url) => {
          setFileUrl(url);
          handleChangeValue(String(url) + ".Filename:" + String(file!.name));
        });
      }
    }
  };

  const handleChange = async (event: React.ChangeEvent) => {
    var target = event.target as HTMLInputElement;
    saveFile(target);
  };

  const handleChangeValue = (value: string) => {
    let object = addFieldInputObject(value, chapterName, inputFieldObject, id);
    setInputFieldList(object);
  };

  return (
    <Box py={2}>
      <Button variant="outlined">
        <label htmlFor={id}>Last opp fil</label>
      </Button>

      <input
        style={{ display: "none" }}
        accept="pdf"
        aria-label={`Last opp fil for ${id}`}
        id={id}
        type="file"
        onChange={(e) => {
          handleChange(e);
        }}
      />
      <Box pt={2}>
        <a href={fileUrl} download>
          {fileName}
        </a>
      </Box>
    </Box>
  );
};

export default FileUpload;
