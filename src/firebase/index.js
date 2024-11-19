import {firebaseConfig} from './firebase.config.js'
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js'
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js'

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };