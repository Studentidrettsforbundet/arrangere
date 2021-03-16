import { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import { Chapter, Attribute } from "./Template";
import InputWrapper, { InputField } from "./inputFields/InputWrapper";
import { useStyles } from "../style/chapters";

type ChapterProps = {
  chapter: Chapter;
};

const ChapterWrapper = (props: ChapterProps) => {
  let chapter = props.chapter;
  const [loading, setLoading] = useState(true);
  const [attributeList, setAttributeList] = useState<Attribute[]>([]);
  const classes = useStyles();

  useEffect(() => {
    attributesToList(chapter.attributes);
  }, [loading]);

  const attributesToList = (attributes: any) => {
    setLoading(true);
    const attributeListLocal: any = [];
    if (attributes) {
      Object.keys(attributes).forEach((attribute: string) => {
        attributeListLocal.push(attributes[attribute]);
        attributeListLocal.sort((a: any, b: any) => a.priority - b.priority);
      });
    } else {
      console.log("No attributes!");
    }
    setAttributeList(attributeListLocal);
    setLoading(false);
  };

  const renderInputFields = (attributeList: any) => {
    const inputWrappers: any = [];
    let inputFields: Array<InputField> = [];
    let idNr: number = 1;
    attributeList.map((attribute: any) => {
      Object.keys(attribute.input_fields).forEach((inputField: string) => {
        inputFields.push({
          type: attribute.input_fields[inputField].type,
          desc: attribute.input_fields[inputField].desc,
          priority: attribute.input_fields[inputField].priority,
          id: attribute + idNr,
        });
      });
      idNr++;
      inputFields.sort((a: any, b: any) => a.priority - b.priority);
      inputWrappers.push(
        <InputWrapper
          key={attribute.title}
          title={attribute.title}
          mainDesc={attribute.desc}
          inputFields={inputFields}
          priority={attribute.priority}
        />
      );
      inputFields = [];
      idNr = 0;
    });
    return inputWrappers;
  };

  return (
    <div style={{ width: "100%" }}>
      <Typography variant="h4">{chapter.title}</Typography>
      <Typography gutterBottom={true} variant="h6">
        {chapter.desc}
      </Typography>
      <div className={classes.chapter}></div>
      <div>{renderInputFields(attributeList)}</div>
    </div>
  );
};

export default ChapterWrapper;
