import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC0PkNIf6JBbzq1Q6DnjZidYA1-13JQGKA",
  authDomain: "street-cuisine-review.firebaseapp.com",
  projectId: "street-cuisine-review",
  storageBucket: "street-cuisine-review.appspot.com",
  messagingSenderId: "92201867756",
  appId: "1:92201867756:web:96051e5e68e14bf4eb48c9",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
