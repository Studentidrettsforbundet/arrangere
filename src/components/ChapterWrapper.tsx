import React, { Attributes, FC } from "react";
import { Button, ButtonBase, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Attribute, Chapter } from "./Template";
import InputWrapper, { InputField } from "./inputFields/InputWrapper";
import { useStyles } from "../style/chapters";
// remember to remove unused imports. Hopefully this will be easier when Github Action is fixed.

type ChapterProps = {
  chapter: Chapter;
  chapterName: string;
};

type AttributeObject = {
  name: string;
  attribute: Attribute[];
};

// object destructuring is one of the nicest features of TypeScript :) You can either use it like this:
const ChapterWrapper = ({chapter: {attributes, buttons, desc, title}, chapterName}: ChapterProps) => {

  // or like this:
  // const {attributes, buttons, desc, title} = chapter

  const [loading, setLoading] = useState(true);
  const [attributeList, setAttributeList] = useState<AttributeObject[]>([]);
  const classes = useStyles();

  useEffect(() => {
    attributesToList(attributes);
  }, [loading]);

  // This code block is unnecessary complex. Is this understandable for the other team members?
  // It should be possible to do this in a simpler and more readable way.
  const attributesToList = (attributes: any) => {
    setLoading(true);

    // Use of any is bad practice. What is the intent behind this local variable?
    const attributeListLocal: AttributeObject[] = [];
    // So is unused constants
    // This could maybe replaced by a map?
    if (attributes) {
      Object.keys(attributes).forEach((attribute: string, index: number) => {
        attributeListLocal.push({
          name: Object.keys(attributes)[index],
          attribute: attributes[attribute],
        });
        attributeListLocal.sort((a: any, b: any) => a.priority - b.priority);
      });
    } else {
      console.log("No attributes!");
    }
    setAttributeList(attributeListLocal);

    setLoading(false);
  };

  // This function seems too big
  const renderInputFields = (
    attributeList: Array<AttributeObject>,
    buttons: Array<string>,
    chapterName: string
  ) => {
    // Use a proper type if possible
    const inputWrappers: any = [];
    let inputFields: Array<InputField> = [];
    let idNr = 1;
    // Maybe use a foreach here?
    // Also, it is really confusing naming here. The variable name is identical to a type, but the content is not...
    attributeList.map((attributeObject: any) => {
      Object.keys(attributeObject.attribute.input_fields).forEach(
        (inputField: string) => {
          inputFields.push({
            type: attributeObject.attribute.input_fields[inputField].type,
            desc: attributeObject.attribute.input_fields[inputField].desc,
            priority:
              attributeObject.attribute.input_fields[inputField].priority,
            id: attributeObject.attribute + idNr,
          });
        }
      );
      idNr++;
      inputFields.sort((a: any, b: any) => a.priority - b.priority);
      inputWrappers.push(
        <InputWrapper
          chapterName={chapterName}
          attributeName={attributeObject.name}
          buttons={buttons}
          key={attributeObject.attribute.title}
          title={attributeObject.attribute.title}
          mainDesc={attributeObject.attribute.desc}
          inputFields={inputFields}
          priority={attributeObject.attribute.priority}
        />
      );
      inputFields = [];
      idNr = 1;
    });
    return inputWrappers;
  };

  return (
    <div style={{ width: "100%" }}>
      <Typography style={{ color: "#00adee" }} variant="h4">
        {title}
      </Typography>
      <Typography gutterBottom={true} variant="h6">
        {desc}
      </Typography>
      <div className={classes.chapter}></div>
      <div>
        {renderInputFields(attributeList, buttons, chapterName)}
      </div>
    </div>
  );
};

export default ChapterWrapper;
