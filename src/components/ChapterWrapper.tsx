import { Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Attribute, Chapter } from "./Template";
import InputWrapper, { InputField } from "./inputFields/InputWrapper";
import { useStyles } from "../style/chapters";
import { useRecoilState, useRecoilValue } from "recoil";
import { inputFieldObjectState } from "../stateManagement/attributesState";
import { saveInput, useDocRef } from "./inputFields/saveInputFields";
import {
  currentChapterState,
  chapterCounterState,
} from "../stateManagement/choosenApplication";

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
  const currentChapter = useRecoilValue(currentChapterState);
  const [chapterCounter, setChapterCounter] = useRecoilState(
    chapterCounterState
  );

  const classes = useStyles();

  console.log("cuirrentc", currentChapter + " " + chapterCounter);

  useEffect(() => {
    attributesToList(chapter.attributes);
    saveInput(docRef, inputFieldObject);
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
    let idNr: number = 1;
    attributeList.map((attributeObject: any) => {
      Object.keys(attributeObject.attribute.input_fields).forEach(
        (inputField: string) => {
          inputFields.push({
            type: attributeObject.attribute.input_fields[inputField].type,
            desc: attributeObject.attribute.input_fields[inputField].desc,
            priority:
              attributeObject.attribute.input_fields[inputField].priority,
            id: attributeObject.name + idNr,
          });
          idNr++;
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
      idNr = 1;
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
    </div>
  );
};

export default ChapterWrapper;
