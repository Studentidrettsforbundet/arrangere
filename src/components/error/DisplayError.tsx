import React, { FC, useState } from "react";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Box, Button } from "@material-ui/core";

const DisplayError: FC<ErrorProps> = ({ error, showModal }) => {
  return (
    <Box style={{ width: "100%" }} mt={2}>
      <Alert
        severity={error.status}
        onClose={() => {
          showModal(false);
        }}
      >
        {error.text}
      </Alert>
    </Box>
  );
};

export default DisplayError;
