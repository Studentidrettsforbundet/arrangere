import { FC } from "react";
import { Typography, Box } from "@material-ui/core";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  attributesState,
  selectedAttributeIdState,
} from "../../stateManagement/attributesState";
import firebase from "firebase";
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
  console.log("utenfor ID", docID);

  const saveFile = async (event: any) => {
    const files = event.target.files;
    for (let file of files) {
      const fileLocation = firebase
        .storage()
        .ref("files")
        .child(docID)
        .child(file.name);
      fileLocation.put(file);
      console.log("file saved: ", file.name);
      console.log("current doc ID" + docID);
    }
  };

  const handleChange = (event: any) => {
    saveFile(event);
    setAttribute({
      ...attribute,
      value: event.target.value,
      id: selectedID,
    });
  };

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
    </Box>
  );
};
export default FileUpload;
function setState(arg0: { selectedFileName: any }) {
  throw new Error("Function not implemented.");
}
