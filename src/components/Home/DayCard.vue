<template>
  <div class="day__container">
    <div
      class="day__card"
      :class="{ day__card_current: isCurrent, day__card_active: isActive }"
      @click="$emit('click')"
    >
      <div class="day__dayOfWeek">{{ dayOfWeek }}</div>
      <div class="day__date">{{ day }}</div>
      <div class="day__month">{{ month }}</div>
    </div>
    <div class="day__points">
      <div v-if="dayTaskState.includes('d')" class="day__point day__done"></div>
      <div v-if="dayTaskState.includes('u')" class="day__point day__undone"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    date: {
      type: Date,
      required: true,
    },
    dayTaskState: {
      type: String,
      default: '',
    },
    isCurrent: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    dayOfWeek() {
      return this.date.toLocaleString('en-US', { weekday: 'short' })
    },
    day() {
      return this.date.getDate()
    },
    month() {
      return this.date.toLocaleString('en-US', { month: 'short' })
    },
  },
}
</script>

<style scoped>
.day__container {
  min-width: 50px;
  width: 60px;
  flex-shrink: 0;
}
.day__card {
  border: 1.5px solid #e0e0e0;
  border-radius: 8px;
  width: 100%;
  min-width: 50px;
  padding: 5px 7px;
  display: flex;
  gap: 5px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.day__card_active,
.day__card_current.day__card_active {
  background-color: #fb6914;
  border: 1.5px solid #fb6914;
  color: #fff;
}
.day__card_current.day__card_active {
  color: #fff;
}
.day__card_active .day__dayOfWeek,
.day__card_active .day__month,
.day__card_current.day__card_active .day__dayOfWeek,
.day__card_current.day__card_active .day__month {
  color: #eaeaea;
}
.day__card_current {
  border: 1.5px solid #d8d8d8;
  background-color: #e2e2e2;
}
.day__card_current .day__dayOfWeek,
.day__card_current .day__month {
  color: #818181;
}
.day__card:hover {
  cursor: pointer;
}
.day__card:not(.day__card_active):hover {
  border: 1.5px solid #ffa876;
  background-color: #ffebdf;
}

.day__card:not(.day__card_active):hover .day__dayOfWeek,
.day__card:not(.day__card_active):hover .day__month {
  color: #fd5d00;
}

.day__dayOfWeek {
  color: #a0a0a0;
  font-size: 15px;
}
.day__month{
  font-size: 14px;
  color: #a0a0a0;
}
.day__date {
  font-size: 22px;
}
.day__points {
  display: flex;
  justify-content: center;
  gap: 5px;
}
.day__point {
  width: 6px;
  height: 6px;
  border-radius: 3px;
}
.day__undone {
  background-color: #fa6610;
}
.day__done {
  background-color: #ffc258;
}
</style>
