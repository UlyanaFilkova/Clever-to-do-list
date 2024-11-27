<template>
  <div class="calendar__container" @wheel.prevent="handleWheel">
    <DayCard
      v-for="(day, index) in days"
      :key="index"
      :date="day.date"
      :dayTaskState="day.dayTaskState"
      :isCurrent="index === currentDayIndex"
      :isActive="day.date.toDateString() === activeDate.toDateString()"
      @click="changeActiveDate(day.date)"
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

  computed: {
    ...mapState([
      'todos',
      'days',
      'activeDate',
      'registrationDate',
      'currentDayIndex',
      'isLoading',
    ]),
  },
  watch: {
    registrationDate: {
      handler() {
        // this.setLoading(true)
        if (this.registrationDate) {
          this.fetchDays()
        }
      },
      deep: true,
    },
    days: {
      handler() {
        if (this.days.length > 0) {
          this.$nextTick(() => {
            this.scrollToCurrentDay()
          })
        }
      },
    },
  },

  methods: {
    ...mapActions(['fetchTodos', 'setActiveDate', 'fetchDays', 'setLoading']),

    changeActiveDate(date) {
      this.setActiveDate(date)
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
      const activeDateIndex = this.days.findIndex(
        (day) => day.date.toDateString() === this.activeDate.toDateString(),
      )

      const activeDayCard = this.$refs.dayCards[activeDateIndex]
      if (activeDayCard) {
        activeDayCard.$el.scrollIntoView({
          inline: 'center',
          behavior: 'auto',
        })
      }
      this.setLoading(false)
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
