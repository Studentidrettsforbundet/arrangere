import { Button, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Attribute, Chapter } from "./Template";
import InputWrapper, { InputField } from "./inputFields/InputWrapper";
import { useStyles } from "../style/chapters";
import { useRecoilState } from "recoil";
import { inputFieldObjectState } from "../stateManagement/attributesState";
import { saveInput, useDocRef } from "./inputFields/saveInputFields";
import { is_numeric } from "./utils";

type ChapterProps = {
  chapter: Chapter;
  chapterName: string;
};

type AttributeObject = {
  name: string;
  attribute: Attribute[];
};

const ChapterWrapper = (props: ChapterProps) => {
  let chapter = props.chapter;
  let chapterName = props.chapterName;
  const [loading, setLoading] = useState(true);
  const [attributeList, setAttributeList] = useState<AttributeObject[]>([]);
  const docRef = useDocRef();
  const [inputFieldObject, setInputFieldObject] = useRecoilState(
    inputFieldObjectState
  );

  const classes = useStyles();

  useEffect(() => {
    attributesToList(chapter.attributes);
    setInputFieldObject({});
  }, [loading]);

  const attributesToList = (attributes: any) => {
    setLoading(true);
    const attributeListLocal: any = [];
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

  const renderInputFields = (
    attributeList: Array<AttributeObject>,
    buttons: Array<string>,
    chapterName: string
  ) => {
    const inputWrappers: any = [];
    let inputFields: Array<InputField> = [];
    let inputNr: string = "";
    attributeList.map((attributeObject: any) => {
      Object.keys(attributeObject.attribute.input_fields).forEach(
        (inputField: string) => {
          inputField.split("").forEach((character: any) => {
            if (is_numeric(character)) {
              inputNr += character;
            }
          });
          inputFields.push({
            type: attributeObject.attribute.input_fields[inputField].type,
            desc: attributeObject.attribute.input_fields[inputField].desc,
            priority:
              attributeObject.attribute.input_fields[inputField].priority,
            id: attributeObject.name + inputNr,
          });
          inputNr = "";
        }
      );
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
    });
    return inputWrappers;
  };

  return (
    <div style={{ width: "100%" }}>
      <Typography style={{ color: "#00adee" }} variant="h4">
        {chapter.title}
      </Typography>
      <Typography gutterBottom={true} variant="h6">
        {chapter.desc}
      </Typography>
      <div className={classes.chapter}></div>
      <div>
        {renderInputFields(attributeList, chapter.buttons, chapterName)}
      </div>
      <Button
        variant="contained"
        onClick={() => saveInput(docRef, inputFieldObject)}
      >
        Lagre
      </Button>
    </div>
  );
};

export default ChapterWrapper;
