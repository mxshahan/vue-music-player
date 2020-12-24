<template>
  <v-row>
    <v-col align-self="center" align="center">
<!--      <h4>Store Data</h4>-->
<!--      <p class="caption"><strong>userCurrentStatus:</strong> {{ $store.state.userCurrentStatus }}</p>-->
<!--      <p class="caption"><strong>progressData:</strong> {{ $store.state.progressData }}</p>-->
<!--      <p class="caption"><strong>startedTarea:</strong> {{ $store.state.startedTarea }}</p>-->
<!--      <hr />-->
<!--      <br />-->
<!--      <br />-->
      <InicioJornadaMain
        card-title="Inicio de jornada"
        :date="currentDate"
        :shifts="shifts"
        :isStartWorkLate="isStartWorkLate"
        :cliente="cliente"
        :proyecto="proyecto"
        :servicio="servicio"
        :tarea="tarea"
        :progress-data="progressData"
        :is-main-progress="true"
        remaining-time="1h 30min"
      />
      <div v-if="$store.state.selectedTarea !== null">
        <TareaCard v-for="(task, index) in $store.state.startedTarea" :key="index" :tarea-details="task" :position="index" />
      </div>
    </v-col>
  </v-row>
</template>

<script>
import InicioJornadaMain from "@/components/widgets/InicioJornada/Main";
import TareaCard from "@/components/widgets/InicioJornada/TareaCard";
import { DATA_SOURCE } from "@/dummyData/dataSource";

export default {
  name: "InicioJornada",
  components: { TareaCard, InicioJornadaMain },
  data() {
    return {
      shifts: [],
      cliente: [],
      proyecto: [],
      servicio: [],
      tarea: [],
      progressData: [],
      isStartWorkLate: false
    };
  },
  created() {
    let { shifts, cliente, proyecto, servicio, tarea } = DATA_SOURCE;
    shifts.forEach(shift => {
      shift.startTime = this.moment(shifts[0].startTimeInMilli).format("hh:mm");
      shift.endTime = this.moment(shifts[0].endTimeInMilli).format("hh:mm");
    });

    this.shifts = shifts;
    this.cliente = cliente;
    this.proyecto = proyecto;
    this.servicio = servicio;
    this.tarea = tarea;

    this.progressData = this.getSummaryProgressData;

    console.log(new Date().getTime());
  },
  computed: {
    currentDate() {
      return this.moment()
        .subtract(10, "days")
        .calendar();
    },
    getSummaryProgressData() {
      if (this.$store.state.userCurrentStatus.initialWorkStartTime === -1) {
        console.log("getProgressData--> work not started");

        return [
          {
            progress: 10,
            duration: "1h 00min",
            time: "9:20-10:30",
            status: "late",
            color: "disabled"
          }
        ];
      } else {
        // work started
        console.log("getProgressData--> work started");
        return [];
      }
    }
  },
  methods: {}
};
</script>
