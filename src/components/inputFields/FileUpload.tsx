import { FC } from "react";
import { Typography, Box } from "@material-ui/core";
import {
  DefaultValue,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import {
  attributesState,
  selectedAttributeIdState,
} from "../../stateManagement/attributesState";
import firebase from "firebase";

type FileUploadProps = {
  desc: string;
  id: string;
};

const FileUpload: FC<FileUploadProps> = ({ desc, id }) => {
  const [attribute, setAttribute] = useRecoilState(attributesState(id));
  const setSelectedAttribute = useSetRecoilState(selectedAttributeIdState);

  const selectedID = useRecoilValue(selectedAttributeIdState);

  const saveFile = async (event: any) => {
    const file = event.target.files;
    const fileLocation = firebase.storage().ref("files").child(selectedID);
    fileLocation.put(file);
    console.log("file attribute saved: ", file);
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
