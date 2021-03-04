import React, { useEffect } from "react";
import { Typography } from "@material-ui/core";
import { choosenApplicationState } from "../stateManagement/choosenApplication";
import { useSetRecoilState } from "recoil";

export default function StudentCupForm() {
  const setChoosenApplicationState = useSetRecoilState(choosenApplicationState);

  setChoosenApplicationState("snmTemplate");

  console.log(setChoosenApplicationState);

  return (
    <Typography gutterBottom variant="h5" component="h2">
      Studentcup Form
    </Typography>
  );
}
