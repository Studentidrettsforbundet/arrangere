import ReceivedAppCard from "./ReceivedAppCard";
import { Box } from "@material-ui/core/";

export default function ReceivedAppPage() {
  return (
    <Box px={10} pt={6}>
      <h1>Innsendte søknader</h1>
      <h2>Student-NM</h2>
      <ReceivedAppCard collectionName="snmApplications" />
      <h2>Studentleker</h2>
      <ReceivedAppCard collectionName="slApplications" />
      <h2>Student-Cup</h2>
      <ReceivedAppCard collectionName="scApplications" />
    </Box>
  );
}
