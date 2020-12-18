<template>
  <v-layout>
    <v-flex>
      <v-progress-linear color="#CACCCF" background-color="#E8E8E8 " rounded height="8"></v-progress-linear>
      <div class="pt-2">
        <span class="float-left">00.00.00</span>
        <span class="float-right black--text">08.00.00</span>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "TimerProgress"
}
</script>