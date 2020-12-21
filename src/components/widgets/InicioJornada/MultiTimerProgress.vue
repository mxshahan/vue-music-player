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
    }
  },
  data() {
    return {
      progressData: [
        {
          progress: 10,
          duration: "1h 10min",
          time: "9:20-10:30",
          status: "late",
          color: "disabled"
        },
        {
          progress: 12,
          duration: "1h 20min",
          time: "10:30-11:50",
          status: "working",
          color: "primary"
        },
        {
          progress: 8,
          duration: "50min",
          time: "11:50-12:40",
          status: "paused",
          color: "warning"
        },
        {
          progress: 20,
          duration: "2h 20min",
          time: "12:40-2:50",
          status: "stopped",
          color: "error"
        }
        // {
        //   progress: 15,
        //   duration: "2h 20min",
        //   time: "12:40-2:50",
        //   status: "stopped",
        //   color: "error"
        // },
        // {
        //   progress: 25,
        //   duration: "2h 20min",
        //   time: "12:40-2:50",
        //   status: "stopped",
        //   color: "error"
        // },
        // {
        //   progress: 25,
        //   duration: "2h 20min",
        //   time: "12:40-2:50",
        //   status: "stopped",
        //   color: "error"
        // }
      ]
    };
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
