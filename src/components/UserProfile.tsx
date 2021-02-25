import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentUserState } from "../stateManagement/userAuth";
import { auth } from "../firebase";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

export default function UserProfile() {
  const currentUserValue = useRecoilValue(currentUserState);

  let user: string | null = "ingen bruker";
  let firebaseUser: string | null = "ingen";
  if (currentUserValue != null) {
    user = currentUserValue.email;
  }

  console.log(user);
  console.log(firebaseUser);
  return (
    <div>
      <p>
        Brukerprofil {user}
        firebaseuser: {firebaseUser}
      </p>
    </div>
  );
}
