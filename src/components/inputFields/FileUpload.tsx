import { FC } from "react";
import { Typography } from "@material-ui/core";
import { useStyles } from "./inputStyles";
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
  const classes = useStyles();

  const [attribute, setAttribute] = useRecoilState(attributesState(id));
  const setSelectedAttribute = useSetRecoilState(selectedAttributeIdState);

  const selectedAttribute = useRecoilValue(selectedAttributeState);
  const selectedID = useRecoilValue(selectedAttributeIdState);

  console.log(selectedAttribute);
  console.log(selectedID);

  return (
    <div className="uploadContainer">
      <div className={classes.root}>
        <Typography>{desc}</Typography>
        <input
          accept="image/*"
          className={classes.input}
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
      </div>
    </div>
  );
};
export default FileUpload;
