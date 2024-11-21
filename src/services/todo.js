import { firebase } from '@/firebase.config.js'
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from 'https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js'

const usersCollection = collection(firebase, 'users')

export const todoService = {
  async getTodos(userId) {
    const userDocRef = doc(usersCollection, userId)
    const todosCollection = collection(userDocRef, 'todos')
    const querySnapshot = await getDocs(todosCollection)

    const tasks = []
    querySnapshot.forEach((doc) => {
      tasks.push({ id: doc.id, ...doc.data() })
    })
    return tasks
  },
  async updateTodoStatus(userId, todoId, isDone) {
    const userDocRef = doc(usersCollection, userId)
    const todosCollection = collection(userDocRef, 'todos')
    const todoDocRef = doc(todosCollection, todoId)

    try {
      await updateDoc(todoDocRef, {
        isDone: !isDone,
      })
      return true
    } catch {
      return false
    }
  },
}
