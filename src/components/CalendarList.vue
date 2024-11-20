<template>
  <div class="calendar__container">
    <DayCard
      v-for="(day, index) in days"
      :key="index"
      :date="day.date"
      :dayOfWeek="day.dayOfWeek"
      :hasDone="day.hasDone"
      :isCurrent="index === currentDayIndex"
      :isActive="index === activeDayIndex"
      @click="setActiveDayIndex(index)"
    />
  </div>
</template>

<script>
import DayCard from './DayCard.vue'

export default {
  components: {
    DayCard,
  },
  data() {
    return {
      days: [],
      currentDayIndex: 0,
      activeDayIndex: null,
    }
  },
  created() {
    this.calculateDays()
  },
  methods: {
    calculateDays() {
      const today = new Date()
      const currentMonth = today.getMonth()
      const currentYear = today.getFullYear()
      const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

      for (let day = today.getDate(); day <= lastDayOfMonth; day++) {
        const date = new Date(currentYear, currentMonth, day)
        const dayOfWeek = date.toLocaleString('en-US', { weekday: 'short' })
        this.days.push({ date: day, dayOfWeek })
        // this.days.push({ date: day, dayOfWeek })
      }
    },
    setActiveDayIndex(index) {
      this.activeDayIndex = index
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
  width: 8px; /* Width of the scrollbar */
  height: 8px; /* Height of the scrollbar */
}

.calendar__container::-webkit-scrollbar-thumb {
  background-color: #888; /* Color of the scrollbar thumb */
  border-radius: 4px; /* Rounded corners for the scrollbar thumb */
}

.calendar__container::-webkit-scrollbar-thumb:hover {
  background-color: #555; /* Color of the scrollbar thumb on hover */
}

/* For Firefox */
.calendar__container {
  scrollbar-width: thin; /* Make the scrollbar thin */
  scrollbar-color: #888 transparent; /* Color of the scrollbar thumb and track */
}

.calendar__container:hover {
  scrollbar-color: #555 transparent; /* Color of the scrollbar thumb on hover */
}
</style>
