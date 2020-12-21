<template>
  <div>
    <div id="time-tracker" v-if="progressData.length !== 0">
      <v-tooltip style="position: relative; top: 0;" bottom color="dattechs_black_2" v-for="(data, index) in progressData" :key="index">
        <template v-slot:activator="{ on, attrs }">
          <v-progress-linear
            v-bind="attrs"
            v-on="on"
            value="100"
            :color="data.color"
            background-color="dattechs_black_5"
            rounded height="8" />
        </template>
        <v-row>
          <v-col align="center" class="py-0 px-3">
            <span class="body-2 font-weight-medium">{{ data.duration }}</span>
            <br />
            <span class="caption">({{ data.time }})</span>
            <v-img v-if="data.status !== leave" width="16" height="16" src="@/assets/icons/ic_message_read.svg" />
          </v-col>
        </v-row>
      </v-tooltip>
    </div>
    <div v-else>
      <v-progress-linear
        value="0"
        background-color="dattechs_black_5"
        rounded height="8" />
    </div>
  </div>
</template>

<script>
import { workStatus } from "@/helper/constants";

export default {
  name: "ProgressComponent",
  props: {
    progressData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      leave: workStatus.LEAVE
    };
  }
};
</script>

<style scoped>
#time-tracker {
  border: 2px solid white;
  background: #e8e8e8;
  border-radius: 10px;
  overflow: hidden;
  /* New code below: */
  display: grid;
  grid-template-columns: 0.5fr 1fr 0.3fr 0.6fr 1fr;
}
</style>
