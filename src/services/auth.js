import { firebase } from '@/firebase.config.js'
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
} from 'https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js'

const usersCollection = collection(firebase, 'users')

export const authService = {
  async checkUser(username, password) {
    const q = query(usersCollection, where('username', '==', username))
    const querySnapshot = await getDocs(q)
    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data()
      if (userData.password === password) {
        return querySnapshot.docs[0].id // return userId, if passwords match
      }
    }
    return false
  },

  async registerUser(username, password) {
    const docRef = await addDoc(usersCollection, {
      username,
      password,
    })

    // Добавление первых задач в подколлекцию todos
    const todosCollection = collection(docRef, 'todos') // Получаем ссылку на подколлекцию todos
    await addDoc(todosCollection, {
      title: 'Register on Clever To-do App',
      description: 'Welcome to your task list!',
      isDone: true,
      date: new Date(),
    })
    await addDoc(todosCollection, {
      title: 'Create you first to-do',
      description:
        'Click "Add a new task" button and create your first to-do! Then mark this task as completed',
      isDone: false,
      date: new Date(),
    })

    return docRef.id
  },

  async checkUsernameExists(username) {
    const q = query(usersCollection, where('username', '==', username))
    const querySnapshot = await getDocs(q)
    return !querySnapshot.empty // true if user exists
  },

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
}
