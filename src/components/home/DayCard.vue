<template>
  <div class="day__container">
    <div v-if="isNewYear" class="day__new-year">
      <p>{{ year }}</p>
    </div>
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
  emits: ['click'],
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
    year() {
      return this.date.getFullYear()
    },
    isNewYear() {
      return this.day === 1 && this.month === 'Jan'
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
.day__container:has(.day__new-year) {
  width: fit-content;
  display: flex;
}
.day__card {
  border: 1.5px solid var(--color-border-one);
  border-radius: 8px;
  min-width: 50px;
  width: 60px;
  padding: 5px 7px;
  display: flex;
  gap: 5px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
}
.day__card_active,
.day__card_current.day__card_active {
  background-color: var(--color-main);
  border: 1.5px solid var(--color-main);
  color: var(--color-text-main);
}
.day__card_current.day__card_active {
  color: var(--color-text-main);
}
.day__card_active .day__dayOfWeek,
.day__card_active .day__month,
.day__card_current.day__card_active .day__dayOfWeek,
.day__card_current.day__card_active .day__month {
  color: var(--color-text-third);
}
.day__card_current {
  border: 1.5px solid var(--color-card-first);
  background-color: var(--color-card-second);
}
.day__card_current .day__dayOfWeek,
.day__card_current .day__month {
  color: var(--color-card-third);
}
.day__card:hover {
  cursor: pointer;
}
.day__card:not(.day__card_active):hover {
  border: 1.5px solid var(--color-sixth);
  background-color: var(--color-sixth-hover);
}

.day__card:not(.day__card_active):hover .day__dayOfWeek,
.day__card:not(.day__card_active):hover .day__month {
  color: var(--color-seventh);
}

.day__dayOfWeek {
  color: var(--color-eighth);
  font-size: 15px;
}
.day__month {
  font-size: 14px;
  color: var(--color-eighth);
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
  background-color: var(--color-undone);
}
.day__done {
  background-color: var(--color-done);
}
.day__new-year {
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.day__new-year p {
  font-size: 20px;
  text-align: center;
  color: var(--color-seventh);
  font-weight: 500;
}

@media (max-width: 576px) {
  .day__container {
    min-width: 50px;
    width: 50px;
    flex-shrink: 0;
  }
  .day__container:has(.day__new-year) {
    width: fit-content;
    display: flex;
  }
  .day__card {
    min-width: 50px;
    width: 50px;
    padding: 5px 5px;
    display: flex;
    gap: 3px;
  }
  .day__dayOfWeek {
    font-size: 14px;
  }
  .day__month {
    font-size: 12px;
  }
  .day__date {
    font-size: 20px;
  }
}
</style>
