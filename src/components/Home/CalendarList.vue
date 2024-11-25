<template>
  <div class="calendar__container" @wheel.prevent="handleWheel">
    <DayCard
      v-for="(day, index) in days"
      :key="index"
      :date="day.date"
      :dayTaskState="day.dayTaskState"
      :isCurrent="index === currentDayIndex"
      :isActive="index === activeDayIndex"
      @click="changeActiveDay(index)"
      ref="dayCards"
    />
  </div>
</template>

<script>
import DayCard from './DayCard.vue'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    DayCard,
  },

  data() {
    return {
      // array of objects: {date, dayTaskState}
      days: [],
      currentDayIndex: 0,
    }
  },
  computed: {
    ...mapState(['todos', 'activeDayIndex', 'registrationDate']),
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
    ...mapActions(['fetchTodos', 'setActiveDayIndex']),
    async getDays() {
      await this.calculateDays()
      this.updateDays()
      this.$nextTick(() => {
        this.scrollToCurrentDay()
      })
    },

    async calculateDays() {
      const today = new Date()

      // Generate days from registration date to current date
      for (let d = new Date(this.registrationDate); d < today; d.setDate(d.getDate() + 1)) {
        this.days.push({ date: new Date(d) })
      }
      // Generate days from current date to 30 days later
      for (let i = 0; i < 30; i++) {
        const nextDay = new Date(today)
        nextDay.setDate(today.getDate() + i)
        this.days.push({ date: nextDay })
      }

      // set currentDayIndex and activeDayIndex
      this.currentDayIndex = this.days.findIndex(
        (day) => day.date.toDateString() === today.toDateString(),
      )

      this.setActiveDayIndex(this.currentDayIndex)
    },

    updateDays() {
      const todosByDate = {}
      this.todos.forEach((todo) => {
        const todoDate = new Date(todo.date.seconds * 1000).toDateString() // convert to milliseconds

        if (!todosByDate[todoDate]) {
          todosByDate[todoDate] = { dayTaskState: '' }
        }

        if (todo.isDone) {
          todosByDate[todoDate].dayTaskState += 'd'
        } else {
          todosByDate[todoDate].dayTaskState += 'u'
        }
      })

      this.days.forEach((day) => {
        const dayDateString = day.date.toDateString()
        day.dayTaskState = todosByDate[dayDateString]?.dayTaskState || ''
      })
    },

    changeActiveDay(index) {
      this.setActiveDayIndex(index)
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
    scrollToCurrentDay() {
      const currentDayCard = this.$refs.dayCards[this.currentDayIndex]
      if (currentDayCard) {
        currentDayCard.$el.scrollIntoView({
          inline: 'center',
        })
      }
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
  background-color: #aaaaaa;
  border-radius: 4px;
}

.calendar__container::-webkit-scrollbar-thumb:hover {
  background-color: #888;
}

/* For Firefox */
.calendar__container {
  scrollbar-width: thin;
  scrollbar-color: #aaaaaa transparent;
}

.calendar__container:hover {
  scrollbar-color: #888 transparent;
}
</style>
