<template>
  <v-layout>
    <v-flex>
      <ProgressComponent :progress-data="progressData" :work-times="workTimes" :work-duration="workDuration" />
      <div class="pt-2">
        <span
          v-if="!isOverTime"
          class="float-left black--text"
          :class="{ 'disabled--text': tareaDetails !== undefined && tareaDetails.status === 'not_started' }"
          >{{ currentDuration }}</span
        >
        <span v-else class="float-left error--text"
          >+ {{ currentDuration }}
          <v-btn class="pb-1 ml-1" width="16" height="16" disabled icon>
            <v-img width="16" height="16" src="@/assets/icons/ic_info_warning.svg"
          /></v-btn>
        </span>
        <span class="float-right black--text">{{ getDayWorkDuration }}</span>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import ProgressComponent from "@/components/widgets/InicioJornada/ProgressComponent";
import { bus } from "@/main";
import { mapActions } from "vuex";
import TimeTrackerMixins from "@/mixins/TimeTrackerMixins";
import { workStatus } from "@/helper/constants";

export default {
  name: "MultiTimerProgress",
  components: { ProgressComponent },
  mixins: [TimeTrackerMixins],
  props: {
    isMainProgress: {
      type: Boolean,
      required: true
    },
    shifts: {
      type: Array,
      required: true
    },
    tareaDetails: {
      type: Object
    },
    progressData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isOverTime: false,
      currentDuration: "00:00:00",
      tareaDurationInMilli: 0,
      currentProgress: 0,
      workTimes: "",
      workDuration: ""
    };
  },
  created() {
    this.$store.commit("SET_SHIFT", this.shifts);
    bus.$on("work_started", tarea => {
      console.log("work_started---->>", tarea);
    });
    bus.$on("work_stopped", async tarea => {
      console.log("work_stopped---->>", tarea);
      if (this.tareaDetails.id === tarea.id) {
        console.log("work_stopped---->> matched");
        let progress = this.currentProgress;
        let duration = this.currentDuration;
        let time = this.currentDuration;
        let status = this.$store.state.userCurrentStatus.status;
        let color = this._getColorBasedOnStatus(status);
        await this.addItemInProgressData({
          progress,
          duration,
          time,
          status,
          color
        });
      } else {
        console.log("work_stopped---> not matched");
      }
    });
  },
  computed: {
    getDayWorkDuration() {
      let { hours, minutes, seconds } = this.getTimeInHourMinSec(this.shifts[0].endTimeInMilli - this.shifts[0].startTimeInMilli);
      return hours + ":" + minutes + ":" + seconds;
    },
    tooltipData() {
      return {
        time: "1h 10min",
        duration: "9:20-9:30"
      };
    }
  },
  timers: {
    updateCurrentTime: { time: 1000, autostart: true, repeat: true }
  },
  methods: {
    ...mapActions(["addItemInProgressData", "updateItemInProgressData", "updateProgressDataInTarea"]),
    async updateCurrentTime() {
      let duration, timerDuration;
      if (this.isMainProgress) {
        if (new Date().getTime() > this.shifts[0].endTimeInMilli) {
          this.isOverTime = true;
          await this.$store.commit("UPDATE_SHIFT_TIME_EXCEED", true);
          duration = timerDuration = new Date().getTime() - this.shifts[0].endTimeInMilli;
          this.updateWorkTimesAndDuration(this.shifts[0].endTimeInMilli, new Date().getTime(), duration);
          // console.log("main duration -- shift over", duration);
        } else if (this.$store.state.userCurrentStatus.initialWorkStartTime === -1) {
          duration = timerDuration = new Date().getTime() - this.shifts[0].startTimeInMilli;
          this.updateWorkTimesAndDuration(this.shifts[0].startTimeInMilli, new Date().getTime(), duration);
          // console.log("main duration -- in shift work not started", duration);
        } else {
          duration = new Date().getTime() - this.$store.state.userCurrentStatus.initialWorkStartTime;
          timerDuration = new Date().getTime() - this.shifts[0].startTimeInMilli;
          this.updateWorkTimesAndDuration(this.shifts[0].startTimeInMilli, new Date().getTime(), duration);
          // console.log("main duration -- in shift work started", duration);
        }
      } else {
        if (
          this.tareaDetails.workingTimes.length === 0 ||
          (this.tareaDetails.status === workStatus.STOPPED && this.timers.updateCurrentTime.isRunning)
        ) {
          return;
        }
        duration = new Date().getTime() - this.tareaDetails.workingTimes[this.tareaDetails.workingTimes.length - 1].startTime;
        timerDuration =
          this.getTareaDurations() + new Date().getTime() - this.tareaDetails.workingTimes[this.tareaDetails.workingTimes.length - 1].startTime;
        // console.log("tarea duration -- in shift work started", duration);
        this.updateWorkTimesAndDuration(this.tareaDetails.workingTimes[this.tareaDetails.workingTimes.length - 1], new Date().getTime(), duration);
      }

      let { hours, minutes, seconds } = this.getTimeInHourMinSec(timerDuration);
      this.currentDuration = hours + ":" + minutes + ":" + seconds;
      // TODO:: fix progress after exceeding time
      this.currentProgress = this.getProgress(this.$store.state.shifts[0].endTimeInMilli - this.$store.state.shifts[0].startTimeInMilli, duration);

      await this.getProgressData();

      // if(new Date().getTime() > this.$store.state.shifts[0].endTimeInMilli &&
      //   (this.$store.state.userCurrentStatus.status === workStatus.NOT_STARTED ||
      //     this.$store.state.userCurrentStatus.status === workStatus.STOPPED)){
      //   //Todo:: when working hour exceeds, stop the timer if the user stop working or not started work
      // this.$timer.updateCurrentTime() = stop
      // }
    },
    updateWorkTimesAndDuration(startTime, endTime, duration) {
      this.workTimes = this.moment(startTime).format("hh:mm") + "-" + this.moment(endTime).format("hh:mm");
      let { hours, minutes } = this.getTimeInHourMinSec(duration);
      this.workDuration = `${hours}h ${minutes}min`;
    },
    getTimeInHourMinSec(duration) {
      let seconds = Math.floor((duration / 1000) % 60);
      let minutes = Math.floor((duration / (1000 * 60)) % 60);
      let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      return { hours, minutes, seconds };
    },
    getProgress(totalDurationOfWorkInMilli, workingDurationInMilli) {
      if (workingDurationInMilli > totalDurationOfWorkInMilli) return 100;
      return (100 / totalDurationOfWorkInMilli) * workingDurationInMilli;
    },
    async getProgressData() {
      // progress, duration, time, status
      let progress = this.currentProgress;
      let duration = this.currentDuration;
      let time = this.currentDuration;
      let status = this.$store.state.userCurrentStatus.status;
      let color = this._getColorBasedOnStatus(status);

      if (this.isMainProgress) {
        if (this.$store.state.progressData.length === 0) {
          await this.addItemInProgressData({
            progress,
            duration,
            time,
            status,
            color
          });
        } else {
          await this.updateItemInProgressData({
            id: this.$store.state.progressData.length - 1,
            progress,
            duration,
            time
          });
        }
      } else {
        // work started
        await this.updateProgressDataInTarea({ tareaId: this.tareaDetails.id, progress, duration, time });
      }
    },
    getTareaDurations() {
      let tareaDuration = 0;
      if (this.tareaDetails.workingTimes.length > 1) {
        this.tareaDetails.workingTimes.forEach(tarea => {
          if (tarea.stopTime !== 0) tareaDuration += tarea.stopTime - tarea.startTime;
        });
      }

      return tareaDuration;
    }
  }
};
</script>
