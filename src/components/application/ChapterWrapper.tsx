import { ReactElement, useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { Typography } from "@material-ui/core";
import { inputFieldObjectState } from "../../stateManagement/attributesState";
import { useStyles } from "../../style/chapters";
import { is_numeric } from "../utils";
import InputWrapper from "./InputWrapper";

const ChapterWrapper = ({
  chapter: { attributes, buttons, desc, title },
  chapterName,
  setErrorStatus,
}: ChapterWithName) => {
  const [loading, setLoading] = useState(true);
  const [attributeList, setAttributeList] = useState<AttributeObject[]>([]);
  const setInputFieldObject = useSetRecoilState(inputFieldObjectState);

  const classes = useStyles();

  useEffect(() => {
    convertAttributesIntoList(attributes);
    setInputFieldObject({});
  }, [loading]);

  const convertAttributesIntoList = (attributes: any) => {
    setLoading(true);
    const attributeListLocal: AttributeObject[] = [];
    if (attributes) {
      Object.keys(attributes).forEach((attribute: string, index: number) => {
        attributeListLocal.push({
          name: Object.keys(attributes)[index],
          attribute: attributes[attribute],
        });
        attributeListLocal.sort((a: any, b: any) => a.priority - b.priority);
      });
    }
    setAttributeList(attributeListLocal);
    setLoading(false);
  };

  const renderInputFields = (
    attributeList: Array<AttributeObject>,
    buttons: Array<string>,
    chapterName: string
  ) => {
    const inputWrappers: ReactElement[] = [];
    let inputFields: Array<InputField> = [];
    let inputNr = "";
    attributeList.map((attributeObject: any) => {
      Object.keys(attributeObject.attribute.input_fields).forEach(
        (inputField: string) => {
          inputField.split("").forEach((character: string) => {
            if (is_numeric(character)) {
              inputNr += character;
            }
          });
          inputFields.push({
            type: attributeObject.attribute.input_fields[inputField].type,
            desc: attributeObject.attribute.input_fields[inputField].desc,
            priority:
              attributeObject.attribute.input_fields[inputField].priority,
            id: attributeObject.name + "-" + inputNr,
          });
          inputNr = "";
        }
      );

      inputFields.sort(
        (a: InputField, b: InputField) => a.priority - b.priority
      );

      inputWrappers.push(
        <InputWrapper
          setErrorStatus={onSetError}
          chapterName={chapterName}
          attributeName={attributeObject.name}
          buttons={buttons}
          key={attributeObject.name}
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

  const onSetError = (error: { status: any; text: string }) => {
    setErrorStatus(error);
  };

  return (
    <div style={{ width: "100%" }}>
      <Typography className={classes.heading} variant="h1">
        {title}
      </Typography>
      {desc !== "" ? (
        <Typography gutterBottom={true} variant="h6">
          {desc}
        </Typography>
      ) : (
        <p></p>
      )}
      <div>{renderInputFields(attributeList, buttons, chapterName)}</div>
    </div>
  );
};

export default ChapterWrapper;
