<template>
  <v-card width="507">
    <v-card-text>
      <CardHeader
        :card-title="cardTitle"
        :date="date"
        :shifts="shifts"
        :isStartWorkLate="isStartWorkLate"
      />
      <CardBody
        :cliente="cliente"
        :proyecto="proyecto"
        :servicio="servicio"
        :tarea="tarea"
        :hasMultipleShift="shifts.length > 1"
      />
      <MultiTimerProgress
          :is-main-progress="isMainProgress"
          :shifts="shifts"
          :progress-data="$store.state.progressData"
      />
    </v-card-text>
    <DialogFinalizarJordana :remaining-time="remainingTime" />
    <DialogParada />
    <Snackbar />
  </v-card>
</template>

<script>
import CardHeader from "@/components/widgets/InicioJornada/CardHeader";
import CardBody from "@/components/widgets/InicioJornada/CardBody";
import DialogParada from "@/components/widgets/InicioJornada/dialogs/DialogParada";
import DialogFinalizarJordana from "@/components/widgets/InicioJornada/dialogs/DialogFinalizarJordana";
import MultiTimerProgress from "@/components/widgets/InicioJornada/MultiTimerProgress";
import Snackbar from "@/components/widgets/InicioJornada/Snackbar";

export default {
  name: "InicioJornadaMain",
  components: { Snackbar, MultiTimerProgress, DialogFinalizarJordana, DialogParada, CardBody, CardHeader },
  props: {
    cardTitle: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    shifts: {
      type: Array,
      required: true
    },
    isStartWorkLate: {
      type: Boolean
    },
    cliente: {
      type: Array,
      required: true
    },
    proyecto: {
      type: Array,
      required: true
    },
    servicio: {
      type: Array,
      required: true
    },
    tarea: {
      type: Array,
      required: true
    },
    isMainProgress: {
      type: Boolean,
      required: true
    },
    progressData: {
      type: Array,
      required: true
    },
    remainingTime: {
      type: String
    }
  }
};
</script>
