import { Box, Button, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Attribute, Chapter } from "./Template";
import InputWrapper, { InputField } from "./inputFields/InputWrapper";
import { useRecoilState } from "recoil";
import { inputFieldObjectState } from "../stateManagement/attributesState";
import { saveInput, useDocRef } from "./inputFields/saveInputFields";
import { is_numeric } from "./utils";
import { Alert } from "@material-ui/lab";

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
  const [showAlert, setShowAlert] = useState(false);
  const [showError, setshowError] = useState(false);
  const [attributeList, setAttributeList] = useState<AttributeObject[]>([]);
  const docRef = useDocRef();
  const [inputFieldObject, setInputFieldObject] = useRecoilState(
    inputFieldObjectState
  );

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
          key={
            attributeObject.attribute.name + attributeObject.attribute.priority
          }
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

  let descContainer = (
    <Typography gutterBottom={true} variant="h6">
      {chapter.desc}
    </Typography>
  );

  const saveAndAlertUser = async () => {
    try {
      try {
        saveInput(docRef, inputFieldObject);
      } catch (error) {
        setshowError(true);
      }
      setShowAlert(true);
    } catch (error) {
      setshowError(true);
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <Typography style={{ color: "#00adee" }} variant="h4">
        {chapter.title}
      </Typography>
      {chapter.desc != "" ? <div>{descContainer}</div> : <p></p>}
      <div>
        {renderInputFields(attributeList, chapter.buttons, chapterName)}
      </div>

      <Box mt={3} mb={3}>
        <Button variant="contained" onClick={() => saveAndAlertUser()}>
          Lagre
        </Button>
        {showAlert ? (
          <Alert
            severity="success"
            onClose={() => {
              setShowAlert(false);
            }}
          >
            {"Lagret!"}
          </Alert>
        ) : null}
        {showError ? (
          <Alert
            severity="error"
            onClose={() => {
              setShowAlert(false);
            }}
          >
            {"Ups, det skjedde en feil. Ikke lagret!"}
          </Alert>
        ) : null}
      </Box>
    </div>
  );
};

export default ChapterWrapper;
