<template>
  <div class="calendar__container" @wheel.prevent="handleWheel">
    <DayCard
      v-for="(day, index) in days"
      :key="index"
      :date="day.date"
      :hasDone="day.hasDone"
      :hasUndone="day.hasUndone"
      :isCurrent="index === 0"
      :isActive="index === activeDayIndex"
      @click="this.$emit('changeActiveDay', index)"
    />
  </div>
</template>

<script>
import DayCard from './DayCard.vue'

export default {
  components: {
    DayCard,
  },
  props: {
    todos: {
      type: Array,
      required: true,
    },
    activeDayIndex: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      // array of objects: {date, hasDone, hasUndone}
      days: [],
    }
  },
  watch: {
    todos: {
      handler() {
        this.days.length === 0 ? this.getDays() : this.updateDays()
      },
      deep: true,
    },
  },
  methods: {
    getDays() {
      this.calculateDays()
      this.updateDays()
    },
    // returns days from the current day to the end of the month
    calculateDays() {
      const today = new Date()
      const currentMonth = today.getMonth()
      const currentYear = today.getFullYear()
      const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

      for (let day = today.getDate(); day <= lastDayOfMonth; day++) {
        const date = new Date(currentYear, currentMonth, day)
        this.days.push({ date })
      }
    },

    updateDays() {
      const todosByDate = {}
      this.todos.forEach((todo) => {
        const todoDate = new Date(todo.date.seconds * 1000).toDateString() // convert to milliseconds

        if (!todosByDate[todoDate]) {
          todosByDate[todoDate] = { hasDone: false, hasUndone: false }
        }

        if (todo.isDone) {
          todosByDate[todoDate].hasDone = true
        } else {
          todosByDate[todoDate].hasUndone = true
        }
      })

      this.days.forEach((day) => {
        const dayDateString = day.date.toDateString()
        day.hasDone = todosByDate[dayDateString]?.hasDone || false
        day.hasUndone = todosByDate[dayDateString]?.hasUndone || false
      })
    },

    handleWheel(event) {
      this.smoothScroll(event.deltaY)
    },

    smoothScroll(amount) {
      const container = this.$el
      const start = container.scrollLeft
      const end = start + amount
      const duration = 300
      const startTime = performance.now()

      const animateScroll = (currentTime) => {
        const timeElapsed = currentTime - startTime
        const progress = Math.min(timeElapsed / duration, 1) // Нормализуем прогресс от 0 до 1
        const easeInOut =
          progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress // Функция easing

        container.scrollLeft = start + (end - start) * easeInOut // Обновляем scrollLeft

        if (progress < 1) {
          requestAnimationFrame(animateScroll) // Запрашиваем следующий кадр анимации
        }
      }

      requestAnimationFrame(animateScroll) // Запускаем анимацию
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
  margin-bottom: 20px;
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
