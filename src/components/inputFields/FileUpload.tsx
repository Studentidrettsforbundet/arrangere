import React, { FC, Fragment } from "react";
import TextField from "@material-ui/core/TextField";
import { IconButton, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import Button from "@material-ui/core/Button";
import { PhotoCamera } from "@material-ui/icons";

type FileUploadProps = {
  desc: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: "block",
    },
  })
);

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
