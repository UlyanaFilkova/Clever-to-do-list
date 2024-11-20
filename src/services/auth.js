import { firebase } from '@/firebase.config.js'
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from 'https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js'

const usersCollection = collection(firebase, 'users');

export const authService = {
  async checkUser (username, password) {
    const q = query(usersCollection, where('username', '==', username));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();
      return userData.password === password; // Compare passwords
    }
    return false; // User not found
  },

  async registerUser (username, password) {
    const docRef = await addDoc(usersCollection, {
      username,
      password, 
    });
    return docRef.id; 
  },

  async checkUsernameExists(username) {
    const q = query(usersCollection, where('username', '==', username));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty; // true if user exists
  },
};