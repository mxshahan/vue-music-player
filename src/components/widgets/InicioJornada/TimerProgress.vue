<template>
  <v-layout>
    <v-flex>
      <v-tooltip bottom color="dattechs_black_2">
        <template v-slot:activator="{ on, attrs }">
          <v-progress-linear
            v-bind="attrs"
            v-on="on"
            value="10"
            color="disabled"
            background-color="dattechs_black_5"
            rounded height="8"></v-progress-linear>
        </template>
        <v-row>
          <v-col align="center" class="py-0 px-3">
            <span class="body-2 font-weight-medium">1h 10min</span>
            <br>
            <span class="caption">(9:20-9:30)</span>
            <v-img width="16" height="16" src="@/assets/icons/ic_message_read.svg" />
          </v-col>
        </v-row>
      </v-tooltip>
      <div class="pt-2">
        <span class="float-left">00.00.00</span>
        <span class="float-right black--text">08.00.00</span>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "TimerProgress",
  props: {
    startTime: {
      type: String
    },
    endTime: {
      type: String
    }
  }
};
</script>
