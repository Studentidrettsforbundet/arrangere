import { FC } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
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
          <Typography>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{desc}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
