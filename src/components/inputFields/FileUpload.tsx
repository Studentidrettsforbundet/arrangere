import React, { FC } from "react";
import { Typography } from "@material-ui/core";
import { useStyles } from "./inputStyles";

type FileUploadProps = {
  desc: string;
};

const FileUpload: FC<FileUploadProps> = ({ desc }) => {
  const classes = useStyles();
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
        />
      </div>
    </div>
  );
};
export default FileUpload;
