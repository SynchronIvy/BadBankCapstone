import { 
    getAuth, 
    createUserWithEmailAndPassword, signInWithEmailAndPassword 
} from 'firebase/auth';

import app from '../firebase.js';

const auth = getAuth(app);

export const registerUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};