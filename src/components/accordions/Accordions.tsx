import { Box, Button, Typography } from "@material-ui/core";
import { FC, ReactElement, useEffect, useState } from "react";
import firebase from "firebase";
import AccordionComponent from "./AccordionComponent";
import {
  getListOfAttributes,
  copyAttributeFromTemplateToApplication,
} from "./copyAttribute";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import { useDocRef } from "../inputFields/saveInputFields";
import { useRecoilValue } from "recoil";
import { choosenApplicationState } from "../../stateManagement/choosenApplication";

const Accordions: FC<AccordionsProps> = ({
  title,
  mainDesc,
  chapterName,
  attributeName,
  setErrorStatus,
}) => {
  const docRef = useDocRef();
  const chosenApplication = useRecoilValue(choosenApplicationState);
  const [newFields, setNewFields] = useState<any>([]);
  const [isAccordionDeleted, setIsAccordionDeleted] = useState<boolean>(false);

  useEffect(() => {
    renderAccordions();
    setIsAccordionDeleted(false);
  }, [isAccordionDeleted]);

  const accordionDeleted = (isDeleted: boolean) => {
    setIsAccordionDeleted(isDeleted);
  };

  const renderAccordions = async () => {
    let accordions: ReactElement[] = [];
    await getListOfAttributes(docRef!, attributeName, chapterName)
      .then((attributeObjectList) => {
        attributeObjectList.forEach((attribute) => {
          Object.entries(attribute).forEach(([key, value]) => {
            accordions.push(
              <AccordionComponent
                key={key}
                name={key}
                inputFields={value.input_fields}
                priority={value.priority}
                title={title}
                mainDesc={mainDesc}
                chapterName={chapterName}
                onAccordionDelete={accordionDeleted}
              ></AccordionComponent>
            );
          });
        });
        accordions.sort((a: any, b: any) => a.key - b.key);
        setNewFields(accordions);
      })
      .catch(() => {
        setErrorStatus({
          status: "error",
          text: "Kunne ikke hente data. Prøv å last inn siden på nytt.",
        });
      });
  };

  const copyField = async (
    docRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>,
    attributeName: string,
    chapterName: string
  ) => {
    await copyAttributeFromTemplateToApplication(
      chosenApplication,
      docRef,
      attributeName,
      chapterName
    ).then((attributeList) => {
      if (attributeList.length <= 0) {
        setErrorStatus({
          status: "error",
          text: "Kunne ikke utføre handlingen.",
        });
      } else {
        var accordion;

        Object.entries(attributeList[0]).forEach(([key, value]) => {
          accordion = (
            <AccordionComponent
              key={key}
              name={key}
              inputFields={value.input_fields}
              priority={value.priority}
              title={title}
              mainDesc={mainDesc}
              chapterName={chapterName}
              onAccordionDelete={accordionDeleted}
            ></AccordionComponent>
          );
        });

        var accordions = [...newFields];
        accordions.push(accordion);
        setNewFields(accordions);
      }
    });
  };
  return (
    <div>
      <div>{newFields}</div>
      <Box pl={1} mt={2}>
        <Typography>
          Husk å klikk på lagre om du har gjort noen endringer i en{" "}
          {title.toLowerCase()}, før du sletter en annen {title.toLowerCase()}
        </Typography>
      </Box>
      <Box mt={3} mb={1}>
        <Button
          onClick={() => copyField(docRef!, attributeName, chapterName)}
          variant="outlined"
          startIcon={<AddCircleOutlineOutlinedIcon />}
        >
          Legg til {title}
        </Button>
      </Box>
    </div>
  );
};

export default Accordions;
