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
      <v-tooltip bottom color="#52575C">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            text
            small
            :class="{ 'red--text': attrs['aria-expanded'] === 'true', 'grey--text': attrs['aria-expanded'] !== 'true' }"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon small class="mr-1">mdi-timelapse</v-icon>
            {{ startTime }} - {{ endTime }}
          </v-btn>
        </template>
        <div>
          <span>
            Horario habitual
          </span>
          <div>
            <v-avatar size="16" color="#7ACFEE">
              <span class="white--text" style="font-size: 8px;">M</span>
            </v-avatar>
            <span class="pl-1 caption">9:00-15:00</span>
          </div>
          <div>
            <v-avatar size="16" color="#1197D8">
              <span class="white--text" style="font-size: 8px;">T</span>
            </v-avatar>
            <span class="pl-1 caption">16:00 -18:00</span>
          </div>
        </div>
      </v-tooltip>
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
