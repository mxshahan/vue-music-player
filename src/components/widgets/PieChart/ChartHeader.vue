<template>
  <div class="col-6 text-center mb-3">
    <h1>{{ hour }}<span class="h4">h</span></h1>
    <div class="text-style">{{ getDayHour }}</div>
    <p class="text-capitalize">{{ item.title }}</p>
  </div>
</template>

<script>
export default {
  name: "ChartHeader",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    hour() {
      return this.item.time !== null ? this.item.time : 0;
    },
    getDayHour() {
      let hour = 0;
      let day = 0;
      if (this.item.time) {
        hour = this.item.time;
        if (hour > 24) {
          day = (hour / 24).toFixed(0);
          hour = hour - day * 24;
        }
      }
      return day > 1 ? `(${day} días y ${hour})` : `(${day} día y ${hour})`;
    }
  }
};
</script>

<style scoped>
h2 {
  font-weight: 500;
}
.text-style {
  font-weight: 400;
}
</style>
