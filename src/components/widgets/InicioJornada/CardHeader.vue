<template>
  <v-row>
    <v-col align="start" class="pt-1">
      <v-icon class="mr-2" size="22" color="grey">mdi-clock-outline</v-icon>
      <span class="black--text subtitle-2 font-weight-bold">{{ cardTitle }}</span>
    </v-col>
    <v-col align="right" cols="8" class="pt-0">
      <v-btn text small disabled>
        <v-img src="@/assets/icons/ic_calendar.svg" class="mr-1" />
        <span class="dattechs_black_3--text font-weight-light" style="padding-top: 2px;">{{ date }}</span>
      </v-btn>
      <v-tooltip bottom color="dattechs_black_2">
        <template v-slot:activator="{ on, attrs }">
          <v-btn text small :class="{ 'red--text': isStartWorkLate, 'grey--text': !isStartWorkLate }" v-bind="attrs" v-on="on">
            <v-img v-if="isStartWorkLate" src="@/assets/icons/ic_timer_red.svg" class="mr-1" />
            <v-img v-else src="@/assets/icons/ic_timer.svg" class="mr-1" />
            <span
              class="font-weight-light"
              :class="{ 'dattechs_black_3--text': !isStartWorkLate, 'error--text': isStartWorkLate }"
              style="padding-top: 2px;"
              >{{ shifts[0].startTime }} - {{ shifts[0].endTime }}</span
            >
          </v-btn>
        </template>
        <HorarioHabitual :shifts="shifts" />
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
