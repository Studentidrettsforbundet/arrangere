import {
  atom,
} from 'recoil';
import firebase from "firebase/app"

export const currentUserState = atom<firebase.User | null>({
    key: 'currentUserState',
    default: null
})


