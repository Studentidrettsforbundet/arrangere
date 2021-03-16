import React, { Attributes, FC } from "react";
import { Button, ButtonBase, Typography } from "@material-ui/core";
import { Chapter } from "./Template";
import InputWrapper, { InputField } from "./inputFields/InputWrapper";
import { useStyles } from "../style/chapters";
import { copyAttribute } from "./inputFields/inputButtonFunctions";

type ChapterProps = {
  chapter: Chapter;
  chapterName: string;
};
const renderAttributes = (
  attributes: any,
  buttons: Array<string>,
  chapterName: string
) => {
  const inputWrappers: any = [];
  let inputFields: Array<InputField> = [];
  let idNr: number = 0;

  if (attributes) {
    Object.keys(attributes).forEach((attribute: string, index: number) => {
      let attributeName = Object.keys(attributes)[index];
      Object.keys(attributes[attribute].input_fields).forEach(
        //let attributeName = Object.keys(chapter.attributes)[0];

        (inputField: string) => {
          inputFields.push({
            type: attributes[attribute].input_fields[inputField].type,
            desc: attributes[attribute].input_fields[inputField].desc,
            id: attribute + idNr,
          });
          idNr++;
        }
      );

      inputWrappers.push(
        <InputWrapper
          key={attributes[attribute].title}
          title={attributes[attribute].title}
          mainDesc={attributes[attribute].desc}
          inputFields={inputFields}
          buttons={buttons}
          chapterName={chapterName}
          attributeName={attributeName}
        />
      );
      inputFields = [];
      idNr = 0;
    });
  } else {
    console.log("No attributes!");
  }
  return inputWrappers;
};

const ChapterWrapper: FC<ChapterProps> = ({ chapter, chapterName }) => {
  const classes = useStyles();
  return (
    <div style={{ width: "100%" }}>
      <Typography variant="h4">{chapter.title}</Typography>
      <Typography gutterBottom={true} variant="h6">
        {chapter.desc}
      </Typography>
      <div className={classes.chapter}>
        {renderAttributes(chapter.attributes, chapter.buttons, chapterName)}
      </div>
    </div>
  );
};

export default ChapterWrapper;
