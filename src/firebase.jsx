import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore,collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDYujF7erbOtDI7522MiUOHLj-rvzqbbY8",
  authDomain: "invoice-app-990cb.firebaseapp.com",
  projectId: "invoice-app-990cb",
  storageBucket: "invoice-app-990cb.appspot.com",
  messagingSenderId: "201987502932",
  appId: "1:201987502932:web:8883488964c391a66e0ec1",
  measurementId: "G-7DH8QM0ZPN"
};
export const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export const storage=getStorage();
export const db=getFirestore(app);
export { collection, addDoc };
