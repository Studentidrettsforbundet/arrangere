import { Typography, Box } from "@material-ui/core";
import React from "react";
import FirebaseStorage from "./FirebaseStorage";

export default function Home() {
  return (
    <Box p={10}>
      <Typography variant="h4">Hjem</Typography>
      <p>Dette er hjem siden</p>
      <FirebaseStorage></FirebaseStorage>
    </Box>
  );
}
