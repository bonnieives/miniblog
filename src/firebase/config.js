import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_Qzko1RY6PQBm3WNdwogxfdwXiDsuyAg",
  authDomain: "miniblog-8e3a6.firebaseapp.com",
  projectId: "miniblog-8e3a6",
  storageBucket: "miniblog-8e3a6.appspot.com",
  messagingSenderId: "506833654768",
  appId: "1:506833654768:web:a70ec3b7086696f7ec4335"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export { db };
