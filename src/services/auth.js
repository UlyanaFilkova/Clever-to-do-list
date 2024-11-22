import { firebase } from '@/firebase.config.js'
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from 'https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js'

const usersCollection = collection(firebase, 'users')

export const checkUser = async (username, password) => {
  try {
    const q = query(usersCollection, where('username', '==', username))
    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data()
      // if passwords match
      if (userData.password === password) {
        localStorage.setItem('userId', querySnapshot.docs[0].id)
        return true
      }
    }
    // If the user is not found or the passwords do not match
    return 'Invalid email or password'
  } catch (error) {
    console.error('Error checking user:', error)
    return ''
  }
}

export const registerUser = async (username, password) => {
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
}

export const checkUsernameExists = async (username) => {
  const q = query(usersCollection, where('username', '==', username))
  const querySnapshot = await getDocs(q)
  return !querySnapshot.empty // true if user exists
}
