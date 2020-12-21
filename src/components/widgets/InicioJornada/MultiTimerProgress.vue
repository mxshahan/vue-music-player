<template>
  <v-layout>
    <v-flex>
      <ProgressComponent :progress-data="progressData" />
      <div class="pt-2">
        <span v-if="!isOverTime" class="float-left">00.00.00</span>
        <span v-else class="float-left error--text"
          >+ 01:32:30
          <v-btn class="pb-1 ml-1" width="16" height="16" disabled icon
            ><v-img width="16" height="16" src="@/assets/icons/ic_info_warning.svg"/></v-btn
        ></span>
        <span class="float-right black--text">08.00.00</span>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import ProgressComponent from "@/components/widgets/InicioJornada/ProgressComponent";

export default {
  name: "MultiTimerProgress",
  components: { ProgressComponent },
  props: {
    startTime: {
      type: String
    },
    endTime: {
      type: String
    },
    isOverTime: {
      type: Boolean
    },
    progressData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {
    tooltipData() {
      return {
        time: "1h 10min",
        duration: "9:20-9:30"
      };
    }
  }
};
</script>
