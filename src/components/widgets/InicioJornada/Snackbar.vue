<template>
  <v-snackbar v-model="show" :color="getColor" :timeout="timeout" top>
    {{ message }}
    <v-img
      v-if="color === 'info'"
      class="snackbar-tail"
      width="20"
      height="20"
      src="@/assets/icons/bg_snackbar_info.svg"
    />
    <v-img
      v-else
      class="snackbar-tail"
      width="20"
      height="20"
      src="@/assets/icons/bg_snackbar_error.svg"
    />
  </v-snackbar>
</template>

<script>
export default {
  name: "Snackbar",
  data() {
    return {
      show: false,
      message: "",
      color: "",
      timeout: 6000
    };
  },
  computed: {
    getColor() {
      switch (this.color) {
        case "error":
          return "#DC4456";
        case "info":
          return "#2C67EC";
        default:
          return "2C67EC";
      }
    }
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "SHOW_SNACKBAR_MESSAGE") {
        this.message = state.snackbar.content;
        this.color = state.snackbar.color.toLowerCase();
        this.show = true;
      }
    });
  }
};
</script>

<style scoped>
.snackbar-tail {
  position: absolute;
  left: 0;
  top: 30%;
  margin-left: -20px;
}
</style>
