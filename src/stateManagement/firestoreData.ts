import {
    atom,
  } from 'recoil';
  import firebase from "firebase/app"
  
  export const NMdataState = atom<string | null>({
      key: 'NMdataState',
      default: null
  })
  