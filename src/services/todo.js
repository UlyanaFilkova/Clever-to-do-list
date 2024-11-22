import { firebase } from '@/services/firebase.config.js'
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from 'https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js'

const usersCollection = collection(firebase, 'users')
const userId = localStorage.getItem('userId')

export default {
  async getTodos() {
    const userDocRef = doc(usersCollection, userId)
    const todosCollection = collection(userDocRef, 'todos')

    const today = new Date() // today's date
    today.setHours(0, 0, 0, 0) // set time to 00:00

    const todosQuery = query(todosCollection, where('date', '>=', today))
    const querySnapshot = await getDocs(todosQuery)

    const tasks = []
    querySnapshot.forEach((doc) => {
      tasks.push({ id: doc.id, ...doc.data() })
    })
    return tasks
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
}
