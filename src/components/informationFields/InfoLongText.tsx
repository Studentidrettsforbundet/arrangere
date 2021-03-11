import { FC } from "react";
import { TextField, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export type InfoLongTextProps = {
  desc: string;
  priority: number;
  title: string;
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: "0.5%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export const InfoLongText: FC<InfoLongTextProps> = ({ desc, title }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{desc}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
