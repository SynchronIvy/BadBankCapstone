import { onAuthStateChanged } from 'firebase/auth';
import app from '../firebase.js';

const auth = getAuth(app);

export const handleAuthStateChange = (callback) => {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};