import React from "react";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../stateManagement/userAuth";

export default function UserProfile() {
  const currentUser = useRecoilValue(currentUserState);
  let user: string | null = "ingen bruker";
  if (currentUser != null) {
    user = currentUser.email;
  }
  return (
    <div>
      <p>Brukerprofil {user}</p>
    </div>
  );
}
