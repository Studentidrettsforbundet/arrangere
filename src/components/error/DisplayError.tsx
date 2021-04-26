import { FC } from "react";
import { Box } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

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
