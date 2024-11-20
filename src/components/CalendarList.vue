<template>
  <div>
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
      }
    },
    setActiveDayIndex(index) {
      this.activeDayIndex = index
    },
  },
}
</script>
<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.exit-button {
  padding: 5px;
  margin-left: 100px;
  background: #c1f7ce;
}
</style>
