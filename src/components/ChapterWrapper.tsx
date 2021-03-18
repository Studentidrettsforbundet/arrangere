import React, { Attributes, FC } from "react";
import { Button, ButtonBase, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Attribute, Chapter } from "./Template";
import InputWrapper, { InputField } from "./inputFields/InputWrapper";
import { useStyles } from "../style/chapters";
import { copyAttribute } from "./inputFields/inputButtonFunctions";

type ChapterProps = {
  chapter: Chapter;
  chapterName: string;
};

type AttributesObject = {
  name: string,
  attributes: Attribute[]
}


const ChapterWrapper = (props: ChapterProps) => {
  let chapter = props.chapter;
  let chapterName = props.chapterName;
  const [loading, setLoading] = useState(true);
  const [attributeList, setAttributeList] = useState<AttributesObject[]>([]);
  const [attributeName, setAttributeName] = useState<string>("")
  const classes = useStyles();

  useEffect(() => {
    attributesToList(chapter.attributes);
  }, [loading]);

  const attributesToList = (attributes: any) => {
    setLoading(true);
    const attributeListLocal: any = [];
    if (attributes) {
      Object.keys(attributes).forEach((attribute: string, index: number) => {
        setAttributeName(Object.keys(attributes)[index]);
        attributeListLocal.push({
          name: Object.keys(attributes)[index],
          attributes: attributes[attribute]
        });
        attributeListLocal.sort((a: any, b: any) => a.priority - b.priority);
      });
    } else {
      console.log("No attributes!");
    }
    setAttributeList(attributeListLocal);

    setLoading(false);
    //console.log("list: ", attributeList[0].title);
  };

  const renderInputFields = (attributeList: Array<AttributesObject>, buttons: Array<string>, chapterName: string, attributeName: string) => {
    const inputWrappers: any = [];
    let inputFields: Array<InputField> = [];
    let idNr: number = 1;
    attributeList.map((attributesObject: any) => {
      Object.keys(attributesObject.attributes.attribute.input_fields).forEach((inputField: string) => {
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
          chapterName={chapterName}
          attributeName={attributeName}
          buttons={buttons}
          key={attribute.title}
          title={attribute.title}
          mainDesc={attribute.desc}
          inputFields={inputFields}
          priority={attribute.priority}
        />
      );
      inputFields = [];
      idNr = 1;
    });
    return inputWrappers;
  };

  console.log("buttons", chapter.buttons)
  return (
    <div style={{ width: "100%" }}>
      <Typography style={{ color: "#00adee" }} variant="h4">
        {chapter.title}
      </Typography>
      <Typography gutterBottom={true} variant="h6">
        {chapter.desc}
      </Typography>
      <div className={classes.chapter}></div>
      <div>{renderInputFields(attributeList, chapter.buttons, chapterName, attributeName)}</div>
    </div>
  );
};

export default ChapterWrapper;
