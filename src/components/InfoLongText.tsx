import { FC } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export type InfoLongTextProps = {
  desc: string;
  priority: number;
  title: string;
};

export const InfoLongText: FC<InfoLongTextProps> = ({ desc, title }) => {
  return (
    <Box py={0.5}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{desc}</Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
