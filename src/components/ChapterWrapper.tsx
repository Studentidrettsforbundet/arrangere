import { FC } from "react";
import { Typography } from "@material-ui/core";
import { Chapter } from "./Template";
import InputWrapper, { InputField } from "./inputFields/InputWrapper";
import { useStyles } from "../style/chapters";

type ChapterProps = {
  chapter: Chapter;
  chapterName: string;
};
const renderAttributes = (attributes: any, chapterName: string) => {
  const inputWrappers: any = [];
  let inputFields: Array<InputField> = [];
  let idNr: number = 0;
  let attributeName: string;

  if (attributes) {
    Object.keys(attributes).forEach((attribute: string) => {
      Object.keys(attributes[attribute].input_fields).forEach(
        (inputField: string) => {
          inputFields.push({
            type: attributes[attribute].input_fields[inputField].type,
            desc: attributes[attribute].input_fields[inputField].desc,
            id: attribute + idNr,
          });
          idNr++;
        }
      );
      attributeName = Object.keys(attributes)[0];

      inputWrappers.push(
        <InputWrapper
          key={attributeName}
          attributeName={attributeName}
          title={attributes[attribute].title}
          button={attributes[attribute].button}
          mainDesc={attributes[attribute].desc}
          chapterName={chapterName}
          inputFields={inputFields}
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
        {renderAttributes(chapter.attributes, chapterName)}
      </div>
    </div>
  );
};

export default ChapterWrapper;
