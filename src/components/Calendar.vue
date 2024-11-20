<template>
  <div>
    <DayCard />
  </div>
</template>

<script>
import DayCard from './DayCard.vue'

export default {
  components: {
    DayCard,
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
