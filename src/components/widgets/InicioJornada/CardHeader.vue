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
      <v-tooltip bottom color="dattechs_black_2">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            text
            small
            :class="{ 'red--text': isStartWorkLate, 'grey--text': !isStartWorkLate }"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon small class="mr-1">mdi-timelapse</v-icon>
            {{ shifts[0].startTime }} - {{ shifts[0].endTime }}
          </v-btn>
        </template>
        <HorarioHabitual :shifts="shifts"/>
      </v-tooltip>
    </v-col>
  </v-row>
</template>

<script>
import HorarioHabitual from "@/components/widgets/InicioJornada/HorarioHabitual";
export default {
  name: "CardHeader",
  components: { HorarioHabitual },
  props: {
    cardTitle: {
      type: String
    },
    date: {
      type: String
    },
    shifts: {
      type: Array
    },
    isStartWorkLate: {
      type: Boolean
    }
  }
};
</script>
