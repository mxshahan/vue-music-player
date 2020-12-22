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
        remaining-time="1h 30min"
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
  name: "InicioJornada",
  components: { TareaCard, InicioJornadaMain },
  data() {
    return {
      currentTime: "",
      shifts: [
        {
          symbol: "M",
          symbolColor: "#7ACFEE",
          startTime: "09:10",
          endTime: "15:10"
        },
        {
          symbol: "T",
          symbolColor: "#1197D8",
          startTime: "16:00",
          endTime: "18:00"
        }
      ],
      isStartWorkLate: true,
      cliente: ["Telefónica", "IZO"],
      proyecto: ["Endesa CAT"],
      servicio: ["E-REDES"],
      tarea: ["Auditoría", "Verificación", "Encuesta", "Emisión"],
      progressData: [
        {
          progress: 10,
          duration: "1h 00min",
          time: "9:20-10:30",
          status: "late",
          color: "disabled"
        },
        {
          progress: 10,
          duration: "1h 00min",
          time: "10:30-11:50",
          status: "working",
          color: "primary"
        },
        {
          progress: 10,
          duration: "55min",
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
        },
        {
          progress: 10,
          duration: "45min",
          time: "2:50-3:50",
          status: "working",
          color: "primary"
        },
        {
          progress: 20,
          duration: "2h 30min",
          time: "3:50-5:20",
          status: "stopped",
          color: "error"
        },
        {
          progress: 20,
          duration: "2h 20min",
          time: "05:20-8:00",
          status: "working",
          color: "primary"
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
      this.currentTime = new Date().getTime();
    }
  }
};
</script>
