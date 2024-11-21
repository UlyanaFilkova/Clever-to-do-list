<template>
  <div class="day__container">
    <div
      class="day__card"
      :class="{ day__card_current: isCurrent, day__card_active: isActive }"
      @click="$emit('click')"
    >
      <div class="day__dayOfWeek">{{ dayOfWeek }}</div>
      <div class="day__date">{{ day }}</div>
    </div>
    <div class="day__points">
      <div v-if="hasDone" class="day__point day__done"></div>
      <div v-if="hasUndone" class="day__point day__undone"></div>
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

    hasDone: {
      type: Boolean,
      default: false,
    },
    hasUndone: {
      type: Boolean,
      default: false,
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
  },
}
</script>

<style scoped>
.day__container {
  min-width: 50px;
  width: 50px;
  flex-shrink: 0;
}
.day__card {
  border: 1.5px solid #e0e0e0;
  border-radius: 8px;
  width: 100%;
  min-width: 50px;
  padding: 5px 7px;
  display: flex;
  gap: 8px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
}
.day__card_current {
  background: #000;
  border: #000;
  color: #fff;
}
.day__card_current .day__dayOfWeek {
  color: #c0c0c0;
}
.day__card_active {
  border: 1.5px solid #fb6914;
  color: #fb6914;
}
.day__card_active .day__dayOfWeek {
  color: #fb6914;
}
.day__card:hover {
  cursor: pointer;
}
.day__card:not(.day__card_current):hover {
  border: 1.5px solid #fb6914;
  color: #fb6914;
}
.day__card:not(.day__card_current):hover .day__dayOfWeek {
  color: #fb6914;
}

.day__dayOfWeek {
  color: #a0a0a0;
}
.day__date {
  font-size: 20px;
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
