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
      return userData.password === password // Compare passwords
    }
    return false // User not found
  },

  async registerUser(username, password) {
    const docRef = await addDoc(usersCollection, {
      username,
      password,
    })

    // Добавление первой задачи в подколлекцию todos
    const todosCollection = collection(docRef, 'todos') // Получаем ссылку на подколлекцию todos
    await addDoc(todosCollection, {
      title: 'Welcome to your task list!', // Заголовок задачи
      description: 'description', // Статус задачи
      date: new Date(), // Дата создания задачи
    })

    return docRef.id
  },

  async checkUsernameExists(username) {
    const q = query(usersCollection, where('username', '==', username))
    const querySnapshot = await getDocs(q)
    return !querySnapshot.empty // true if user exists
  },

  async getUserTasks(userId) {
    const userDocRef = doc(usersCollection, userId) // Получаем ссылку на документ пользователя
    const todosCollection = collection(userDocRef, 'todos') // Получаем ссылку на подколлекцию todos
    const querySnapshot = await getDocs(todosCollection) // Получаем все документы из подколлекции

    const tasks = []
    querySnapshot.forEach((doc) => {
      tasks.push({ id: doc.id, ...doc.data() }) // Добавляем данные задачи в массив
    })
    console.dir(tasks)
    return tasks // Возвращаем массив задач
  },
}
