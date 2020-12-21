<template>
  <div>
    <div id="time-tracker" v-if="progressData.length !== 0" :style="`grid-template-columns: ${getProgressLength};`">
      <v-tooltip bottom color="dattechs_black_2" v-for="(data, index) in progressData" :key="index">
        <template v-slot:activator="{ on, attrs }">
          <!--            :class="{ 'ml-n2': index > 0 }"-->
          <v-progress-linear
            :style="`z-index: ${9 - index};  margin-left: ${-5 * index + 'px !important;'} width: ${102 + (5 * index) + '% !important;'}`"
            class="cursor-pointer"
            v-bind="attrs"
            v-on="on"
            value="100"
            :color="data.color"
            background-color="dattechs_black_5"
            rounded
            height="8"
          />
        </template>
        <v-row>
          <v-col align="center" class="py-0 px-3">
            <span class="body-2 font-weight-medium">{{ data.duration }}</span>
            <br />
            <span class="caption">({{ data.time }})</span>
            <v-img v-if="data.status !== leave" width="16" height="16" src="@/assets/icons/ic_message_read.svg" />
          </v-col>
        </v-row>
        <v-img style="position: absolute; top: 0;left: 47%;  margin-top: -4px;" width="10" height="4" src="@/assets/icons/bg_tooltip_tail.svg" />
      </v-tooltip>
    </div>
    <div v-else>
      <v-progress-linear value="0" background-color="dattechs_black_5" rounded height="8" />
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
  },
  computed: {
    getProgressLength() {
      let gridColumnsSizes = "";
      let sumOfProgress = 100;
      // this.progressData.forEach(data => {
      //   sumOfProgress += data.progress;
      // });
      this.progressData.forEach(data => {
        gridColumnsSizes += (data.progress / sumOfProgress).toFixed(1).toString() + "fr ";
      });
      return gridColumnsSizes;
    }
  }
};
</script>

<style scoped>
#time-tracker {
  border: 2px solid white;
  background: #e8e8e8;
  border-radius: 8px;
  overflow: hidden;
  /* New code below: */
  display: grid;
  /*grid-template-columns: 0.5fr 1fr 0.3fr 0.6fr 1fr;*/
}

.cursor-pointer {
  cursor: pointer;
}
</style>
