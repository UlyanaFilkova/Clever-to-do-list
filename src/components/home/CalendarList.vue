<template>
  <div class="calendar__container" @wheel.prevent="handleWheel" @scroll="handleScroll">
    <DayCard
      v-for="(day, index) in days"
      ref="dayCards"
      :key="index"
      :date="day.date"
      :dayTaskState="day.dayTaskState"
      :isCurrent="index === currentDayIndex"
      :isActive="day.date.toDateString() === activeDate.toDateString()"
      @click="changeActiveDate(day.date)"
    />
  </div>
</template>

<script>
import DayCard from '@/components/home/DayCard.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    DayCard,
  },

  computed: {
    ...mapGetters([
      'currentTodo',
      'days',
      'todos',
      'activeDate',
      'registrationDate',
      'currentDayIndex',
      'isLoading',
    ]),
  },

  methods: {
    ...mapActions([
      'fetchTodos',
      'setActiveDate',
      'fetchDays',
      'setLoading',
      'loadNextDays',
      'loadPreviousDays',
    ]),

    changeActiveDate(date) {
      this.setActiveDate(date)
    },
    handleScroll(event) {
      const container = event.target
      const scrollLeft = container.scrollLeft
      const scrollWidth = container.scrollWidth
      const clientWidth = container.clientWidth

      // Checking if the end of the container has been reached
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        this.loadNextDays()
      }

      if (scrollLeft <= 10) {
        this.loadPreviousDays() // Call the method to load previous days
      }
    },

    // for smooth scrolling of the calendar list using the mouse wheel
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
        const progress = Math.min(timeElapsed / duration, 1) // Normalize progress from 0 to 1
        const easeInOut =
          progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress // easing function

        container.scrollLeft = start + (end - start) * easeInOut

        if (progress < 1) {
          requestAnimationFrame(animateScroll) // Request the next frame of animation
        }
      }

      requestAnimationFrame(animateScroll) // start the animation
    },
    scrollToCurrentDay() {
      const activeDateIndex = this.days.findIndex(
        (day) => day.date.toDateString() === this.activeDate.toDateString(),
      )

      const activeDayCard = this.$refs.dayCards[activeDateIndex]

      if (activeDayCard && activeDayCard.$el) {
        activeDayCard.$el.scrollIntoView({
          inline: 'center',
          behavior: 'auto',
        })
      }
      this.setLoading(false)
    },
  },
  watch: {
    todos: {
      handler() {
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

.calendar__container::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.calendar__container::-webkit-scrollbar-thumb {
  background-color: var(--color-forth);
  border-radius: 4px;
}

.calendar__container::-webkit-scrollbar-thumb:hover {
  background-color: var(--color-forth-hover);
}

.calendar__container {
  scrollbar-width: thin;
  scrollbar-color: var(--color-forth) transparent;
}

.calendar__container:hover {
  scrollbar-color: var(--color-forth-hover) transparent;
}
</style>
