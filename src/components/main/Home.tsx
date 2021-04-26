import { ReactElement, useEffect, useState } from "react";
import { firestore } from "../../firebase";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const Home = () => {
  const [accordions, setAccordions] = useState<HomeAccordionProps[]>([]);
  useEffect(() => {
    generateAccordions();
  }, []);

  async function generateAccordions() {
    let listOfAccordions: Array<HomeAccordionProps> = [];
    await firestore
      .collection("userHomePage")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((accordion) => {
          if (accordion.exists) {
            listOfAccordions.push({
              title: accordion.data().title,
              desc: accordion.data().desc,
              priority: accordion.data().priority,
            });
          }
        });
      });
    setAccordions(listOfAccordions);
    listOfAccordions = [];
  }

  const renderAccordions = (accordionList: Array<HomeAccordionProps>) => {
    const accordions: ReactElement[] = [];
    accordionList.map((accordion: HomeAccordionProps, i) => {
      accordions.push(
        <Box p={0.5} key={i}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{accordion.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{accordion.desc}</Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      );
    });
    accordionList.sort(
      (a: HomeAccordionProps, b: HomeAccordionProps) => a.priority - b.priority
    );
    return accordions;
  };

  return (
    <div role="main">
      <Box p={10}>
        <Typography variant="h1">
          Velkommen til Norges studentidrettsforbunds søknadsportal
        </Typography>
        <Box py={2}>{renderAccordions(accordions)}</Box>
      </Box>
    </div>
  );
};

export default Home;
