import React, { FC, useState } from "react";
import { Typography, Box, Link } from "@material-ui/core";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  attributesState,
  selectedAttributeIdState,
} from "../../stateManagement/attributesState";
import firebase from "firebase";
import { v4 as uuid } from "uuid";
import { documentState } from "../ApplicationCard";

type FileUploadProps = {
  desc: string;
  id: string;
};

const FileUpload: FC<FileUploadProps> = ({ desc, id }) => {
  const [attribute, setAttribute] = useRecoilState(attributesState(id));
  const setSelectedAttribute = useSetRecoilState(selectedAttributeIdState);
  const selectedID = useRecoilValue(selectedAttributeIdState);
  const docID = useRecoilValue(documentState);
  const [url, setUrl] = useState(null);

  const saveFile = async (target: HTMLInputElement) => {
    var files = target.files;
    var file;
    if (files != null) {
      for (var i = 0; i < files.length; i++) {
        file = files.item(i);
        const fileId = uuid();
        const fileRef = firebase
          .storage()
          .ref("files")
          .child(docID)
          .child(fileId);
        fileRef.put(file!);
        console.log("file ", file!.name, " saved, with ID: ", fileId);
        console.log("current doc ID: " + docID);

        //TODO: Fix "Premission denied, code 403"
        fileRef
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
            console.log("File url: ", url);
          })
          .catch(Error);
      }
    }
  };

  const handleChange = (event: React.ChangeEvent) => {
    var target = event.target as HTMLInputElement;
    console.log("target value: ", target.value);
    saveFile(target);
    setAttribute({
      ...attribute,
      value: target.value,
      id: selectedID,
    });
    console.log("attribute value inni: ", attribute.value);
  };
  console.log("attribute value utenfor: ", attribute.value);

  return (
    <Box py={2}>
      <Typography>{desc}</Typography>
      <input
        accept="pdf"
        id="contained-button-file"
        multiple
        type="file"
        onFocus={() => setSelectedAttribute(id)}
        onChange={(event) => handleChange(event)}
      />
      <Link>{url}</Link>
    </Box>
  );
};
export default FileUpload;
function setState(arg0: { selectedFileName: string }) {
  throw new Error("Function not implemented.");
}
