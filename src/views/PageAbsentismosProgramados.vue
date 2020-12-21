<template>
  <v-row>
    <v-col align-self="center" align="center">
      <InicioJornadaMain
        card-title="Inicio de jornada"
        date="09/4/2020"
        :shifts="shifts"
        :isStartWorkLate="isStartWorkLate"
        :cliente="cliente"
        :proyecto="proyecto"
        :servicio="servicio"
        :tarea="tarea"
        :is-over-time="true"
        :progress-data="progressData"
      />
      <div v-if="$store.state.selectedTarea !== null">
        <TareaCard v-for="(task, index) in $store.state.startedTarea" :key="index" :tarea-details="task"
                   :position="index" />
      </div>
    </v-col>
  </v-row>
</template>

<script>
import InicioJornadaMain from "@/components/widgets/InicioJornada/Main";
import TareaCard from "@/components/widgets/InicioJornada/TareaCard";
export default {
  name: "AbsentismosProgramados",
  components: { TareaCard, InicioJornadaMain },
  data() {
    return {
      currentTime: "",
      shifts: [
        {
          symbol: "M",
          symbolColor: "#7ACFEE",
          startTime: "09:00",
          endTime: "15:00"
        },
        {
          symbol: "T",
          symbolColor: "#1197D8",
          startTime: "16:00",
          endTime: "18:00"
        }
      ],
      isStartWorkLate: false,
      cliente: ["Telefónica", "IZO"],
      proyecto: ["Endesa CAT"],
      servicio: ["E-REDES"],
      tarea: ["Auditoría", "Verificación", "Encuesta", "Emisión"],
      progressData: [
        {
          progress: 10,
          duration: "1h 0min",
          time: "9:00-10:00",
          status: "late",
          color: "dattechs_black_5"
        },
        {
          progress: 20,
          duration: "Médico",
          time: "10:00-12:00",
          status: "leave",
          color: "colorLeave"
        }
      ]
    };
  },
  timers: {
    updateCurrentTime: {
      time: 1000,
      autostart: true
    }
  },
  methods: {
    updateCurrentTime() {
      console.log("updateCurrentTime--->");
      this.currentTime = new Date().getTime();
    }
  }
};
</script>
