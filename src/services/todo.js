import { firebase } from '@/services/firebase.config.js'
import {
  collection,
  query,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js'

const usersCollection = collection(firebase, 'users')

export default {
  async getTodos() {
    const userId = localStorage.getItem('userId')
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
      console.error('Error getting todos: ', error)
    }
  },
  async updateTodoStatus(todoId, isDone) {
    const userId = localStorage.getItem('userId')
    const userDocRef = doc(usersCollection, userId)
    const todosCollection = collection(userDocRef, 'todos')
    const todoDocRef = doc(todosCollection, todoId)

    try {
      await updateDoc(todoDocRef, { isDone })
      return true
    } catch (error) {
      console.error('Error updating todo status: ', error)
      return false
    }
  },
  async deleteTodo(todoId) {
    const userId = localStorage.getItem('userId')
    const userDocRef = doc(usersCollection, userId)
    const todosCollection = collection(userDocRef, 'todos')
    const todoDocRef = doc(todosCollection, todoId)

    try {
      await deleteDoc(todoDocRef)
      return true
    } catch (error) {
      console.error('Error deleting todo: ', error)
      return false
    }
  },
  async addTodo(todo) {
    const userId = localStorage.getItem('userId')
    const userDocRef = doc(usersCollection, userId)
    const todosCollection = collection(userDocRef, 'todos')

    try {
      const docRef = await addDoc(todosCollection, {
        ...todo,
      })
      return docRef.id
    } catch (error) {
      console.error('Error adding todo: ', error)
      return null
    }
  },
  async updateTodo(todoId, newTodo) {
    const userId = localStorage.getItem('userId')
    const userDocRef = doc(usersCollection, userId)
    const todosCollection = collection(userDocRef, 'todos')
    const todoDocRef = doc(todosCollection, todoId)

    try {
      await updateDoc(todoDocRef, {
        ...newTodo,
      })
    } catch (error) {
      console.error('Error updating todo: ', error)
    }
  },
  async getRegistrationDate() {
    const userId = localStorage.getItem('userId')
    const userDocRef = doc(usersCollection, userId)
    const userDoc = await getDoc(userDocRef)
    if (!userDoc.exists()) {
      throw new Error('User not found')
    }

    return userDoc.data().registrationDate.toDate()
  },
}
