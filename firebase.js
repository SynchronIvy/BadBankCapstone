import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyAQO93Q8PgDTnaom_35nftRnCm0WmBINf0",
    authDomain: "badbank-82ba6.firebaseapp.com",
    projectId: "badbank-82ba6",
    storageBucket: "badbank-82ba6.appspot.com",
    messagingSenderId: "841912538344",
    appId: "1:841912538344:web:de5a8bce37b2f662a4255d"
  };
  
  const app = initializeApp(firebaseConfig);
  export default app;