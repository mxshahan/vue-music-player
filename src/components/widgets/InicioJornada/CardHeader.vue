<template>
  <v-row>
    <v-col align="start">
      <v-icon class="mr-2" color="grey">mdi-clock-outline</v-icon>
      <span class="black--text subtitle-2 font-weight-bold">{{ cardTitle }}</span>
    </v-col>
    <v-col align="right" cols="8">
      <v-btn text small class="grey--text">
        <v-icon small class="mr-1">mdi-calendar-blank-outline</v-icon>
        {{ date }}
      </v-btn>
      <v-btn text small class="grey--text">
        <v-icon small class="mr-1">mdi-timelapse</v-icon>
        {{ startTime }} - {{ endTime }}
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "CardHeader",
  props: {
    cardTitle: {
      type: String
    },
    date: {
      type: String
    },
    startTime: {
      type: String
    },
    endTime: {
      type: String
    }
  }
};
</script>
