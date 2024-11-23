import { firebase } from '@/services/firebase.config.js'
import {
  collection,
  query,
  getDocs,
  getDoc,
  updateDoc,
  doc,
} from 'https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js'

const usersCollection = collection(firebase, 'users')
const userId = localStorage.getItem('userId')

export default {
  async getTodos() {
    const userDocRef = doc(usersCollection, userId)
    const todosCollection = collection(userDocRef, 'todos')

    const todosQuery = query(todosCollection)
    try {
      const querySnapshot = await getDocs(todosQuery)

      const tasks = []
      querySnapshot.forEach((doc) => {
        tasks.push({ id: doc.id, ...doc.data() })
      })
      return tasks
    } catch (error) {
      console.error(error)
    }
  },
  async updateTodoStatus(todoId, isDone) {
    const userDocRef = doc(usersCollection, userId)
    const todosCollection = collection(userDocRef, 'todos')
    const todoDocRef = doc(todosCollection, todoId)

    try {
      await updateDoc(todoDocRef, { isDone })
      return true
    } catch {
      return false
    }
  },
  async getRegistrationDate() {
    const userDocRef = doc(usersCollection, userId)
    const userDoc = await getDoc(userDocRef)
    if (!userDoc.exists()) {
      throw new Error('User not found')
    }

    return userDoc.data().registrationDate.toDate()
  },
}
