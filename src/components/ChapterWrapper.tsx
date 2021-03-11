import { FC } from "react";
import { Typography } from "@material-ui/core";
import { Chapter } from "./Template";
import InputWrapper, { InputField } from "./inputFields/InputWrapper";
import { useStyles } from "../style/chapters";

type ChapterProps = {
  chapter: Chapter;
};
const renderAttributes = (attributes: any) => {
  const inputWrappers: any = [];
  let inputFields: Array<InputField> = [];
  let idNr: number = 0;
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
      inputWrappers.push(
        <InputWrapper
          key={attributes[attribute].title}
          title={attributes[attribute].title}
          mainDesc={attributes[attribute].desc}
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

const ChapterWrapper: FC<ChapterProps> = ({ chapter }) => {
  const classes = useStyles();
  return (
    <div style={{ width: "100%" }}>
      <Typography variant="h4">{chapter.title}</Typography>
      <Typography gutterBottom={true} variant="h6">
        {chapter.desc}
      </Typography>
      <div className={classes.chapter}>
        {renderAttributes(chapter.attributes)}
      </div>
    </div>
  );
};

export default ChapterWrapper;
