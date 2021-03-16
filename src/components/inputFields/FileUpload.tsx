import { FC } from "react";
import { Typography, Box } from "@material-ui/core";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  attributesState,
  selectedAttributeIdState,
  selectedAttributeState,
} from "../../stateManagement/attributesState";

type FileUploadProps = {
  desc: string;
  id: string;
};

const FileUpload: FC<FileUploadProps> = ({ desc, id }) => {
  const [attribute, setAttribute] = useRecoilState(attributesState(id));
  const setSelectedAttribute = useSetRecoilState(selectedAttributeIdState);

  const selectedAttribute = useRecoilValue(selectedAttributeState);
  const selectedID = useRecoilValue(selectedAttributeIdState);

  //console.log(selectedAttribute);
  //console.log(selectedID);

  return (
    <Box py={2}>
      <Typography>{desc}</Typography>
      <input
        accept="image/*"
        id="contained-button-file"
        multiple
        type="file"
        onFocus={() => setSelectedAttribute(id)}
        onChange={(event) =>
          setAttribute({
            ...attribute,
            value: event.target.value,
            id: selectedID,
          })
        }
      />
    </Box>
  );
};
export default FileUpload;
