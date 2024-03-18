import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
//     apiKey: "AIzaSyBvl2dF-Z6lDfb8PR1hpegWiKrJQv8q2yE",
//   authDomain: "document-app-6c4f3.firebaseapp.com",
//   projectId: "document-app-6c4f3",
//   storageBucket: "document-app-6c4f3.appspot.com",
//   messagingSenderId: "933311222523",
//   appId: "1:933311222523:web:dbc7e3176c0e20e430165e"
    // measurementId: "G-MH8ENX5D4D"

  apiKey: "AIzaSyCpITnmBPiTs-xryfRrKH9IN__7QK2iWec",

  authDomain: "documentapp-878bd.firebaseapp.com",
  projectId: "documentapp-878bd",
  storageBucket: "documentapp-878bd.appspot.com",
  messagingSenderId: "664226631611",
  appId: "1:664226631611:web:79e48320be710c5b65fe9e",
  measurementId: "G-MH8ENX5D4D"
};

// const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
const app = initializeApp(firebaseConfig);
export const datas = getFirestore(app)