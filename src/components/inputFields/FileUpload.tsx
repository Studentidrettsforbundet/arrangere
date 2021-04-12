import { FC, useEffect, useRef, useState } from "react";
import { Typography, Box } from "@material-ui/core";
import { addFieldInputObject, useDocRef } from "./saveInputFields";
import { getInputValue } from "./getInputValue";
import { useRecoilState, useRecoilValue } from "recoil";
import firebase from "firebase";
import { v4 as uuid } from "uuid";
import {
  documentState,
  inputFieldObjectState,
} from "../../stateManagement/attributesState";

const FileUpload: FC<InputFieldProps> = ({ desc, id, chapterName }) => {
  const docID = useRecoilValue(documentState);
  const [fileUrl, setFileUrl] = useState();
  const [fileName, setFileName] = useState("");
  const [inputFieldObject, setInputFieldList] = useRecoilState(
    inputFieldObjectState
  );

  const [value, setValue] = useState("");
  const isInitialMount = useRef(true);
  const docRef = useDocRef();

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      getInputValue(docRef, chapterName, id).then((value) => {
        setValue(value);
      });
    }
  });

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

        await storageRef.getDownloadURL().then((url) => {
          setFileUrl(url);
          handleChangeValue(String(url));
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
    console.log("input value: " + value);
  };

  const handleValueChange = (value: string) => {
    setValue(value);
  };

  return (
    <Box py={2}>
      <Typography>{desc}</Typography>
      <input
        accept="pdf"
        id="contained-button-file"
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
