import React, { FC } from "react";
import { Typography } from "@material-ui/core";
import { Chapter } from "./Template";
import InputWrapper, { InputField } from "./inputFields/InputWrapper";

type ChapterProps = {
  chapter: Chapter;
};

const renderAttributes = (attributes: any) => {
  const inputWrappers: any = [];
  let inputFields: Array<InputField> = [];
  if (attributes) {
    Object.keys(attributes).forEach((attribute: string) => {
      Object.keys(attributes[attribute].inputFields).forEach(
        (inputField: string) => {
          inputFields.push({
            type: attributes[attribute].inputFields[inputField].type,
            desc: attributes[attribute].inputFields[inputField].desc,
          });
        }
      );
      inputWrappers.push(
        <InputWrapper
          key={attributes[attribute].title}
          title={attributes[attribute].title}
          mainDesc={attributes[attribute].desc}
          inputFields={inputFields}
        />
      );
      inputFields = [];
    });
  } else {
    console.log("No attributes!");
  }
  return inputWrappers;
};

const ChapterWrapper: FC<ChapterProps> = ({ chapter }) => {
  return (
    <div>
      <Typography variant="h2">{chapter.title}</Typography>
      <Typography variant="h4">{chapter.desc}</Typography>
      <div>{renderAttributes(chapter.attributes)}</div>
    </div>
  );
};

export default ChapterWrapper;
