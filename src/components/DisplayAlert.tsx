import { FC } from "react";
import { Alert, AlertTitle } from "@material-ui/lab";

type AlertProps = {
  title: string;
  message: string;
};

const DisplayAlert: FC<AlertProps> = ({ title, message }) => {
  console.log("Melding");
  return (
    <div>
      <Alert severity="success">
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </div>
  );
};

export default DisplayAlert;
