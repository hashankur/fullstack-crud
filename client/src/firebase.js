// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'

const envvar = import.meta.env

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: envvar.VITE_API_KEY,
  authDomain: envvar.VITE_AUTH_DOMAIN,
  projectId: envvar.VITE_PROJECT_ID,
  storageBucket: envvar.VITE_STORAGE_BUCKET,
  messagingSenderId: envvar.VITE_MESSAGING_SENDER_ID,
  appId: envvar.VITE_APP_ID,
  measurementId: envvar.VITE_MESSAGING_SENDER_ID
}

console.log(firebaseConfig)

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export default app
