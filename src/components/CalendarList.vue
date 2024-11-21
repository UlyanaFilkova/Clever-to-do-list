<template>
  <div class="calendar__container">
    <DayCard
      v-for="(day, index) in days"
      :key="index"
      :date="day.date"
      :hasDone="day.hasDone"
      :hasUndone="day.hasUndone"
      :isCurrent="index === currentDayIndex"
      :isActive="index === activeDayIndex"
      @click="setActiveDayIndex(index)"
    />
  </div>
</template>

<script>
import DayCard from './DayCard.vue'
import { authService } from '@/services/auth.js'

export default {
  components: {
    DayCard,
  },
  data() {
    return {
      //массив объектов {date, hasDone, hasUndone}
      days: [],
      currentDayIndex: 0,
      activeDayIndex: null,
    }
  },
  created() {
    this.getDays(localStorage.getItem('userId'))
  },
  methods: {
    calculateDays() {
      const today = new Date()
      const currentMonth = today.getMonth()
      const currentYear = today.getFullYear()
      const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

      for (let day = today.getDate(); day <= lastDayOfMonth; day++) {
        const date = new Date(currentYear, currentMonth, day)
        // const dayOfWeek = date.toLocaleString('en-US', { weekday: 'short' })
        // this.days.push({ date: day, dayOfWeek })
        this.days.push({ date: date })
      }
    },
    setActiveDayIndex(index) {
      this.activeDayIndex = index
    },
    async getDays(userId) {
      this.calculateDays()
      const todos = await authService.getTodos(userId)

      this.days.forEach((day) => {
        day.hasDone = false
        day.hasUndone = false

        const todosForDay = todos.filter((todo) => {
          const todoDate = new Date(todo.date.seconds * 1000) // convert to milliseconds
          return todoDate.toDateString() === day.date.toDateString()
        })

        todosForDay.forEach((task) => {
          if (task.isDone) {
            day.hasDone = true
          } else {
            day.hasUndone = true
          }
        })
      })
    },
  },
}
</script>
<style scoped>
.calendar__container {
  display: flex;
  gap: 10px;
  justify-content: left;
  max-width: 100%;
  overflow-x: auto;
  padding-bottom: 8px;
}
/* For WebKit browsers (Chrome, Safari) */
.calendar__container::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.calendar__container::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 4px;
}

.calendar__container::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}

/* For Firefox */
.calendar__container {
  scrollbar-width: thin;
  scrollbar-color: #888 transparent;
}

.calendar__container:hover {
  scrollbar-color: #555 transparent;
}
</style>
