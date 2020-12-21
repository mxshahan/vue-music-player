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
      />
<!--      <TimerProgress :is-over-time="isOverTime" />-->
      <MultiTimerProgress :is-over-time="false"/>
    </v-card-text>
    <DialogFinalizarJordana/>
    <DialogParada/>
  </v-card>
</template>

<script>
import CardHeader from "@/components/widgets/InicioJornada/CardHeader";
import CardBody from "@/components/widgets/InicioJornada/CardBody";
import DialogParada from "@/components/widgets/InicioJornada/dialogs/DialogParada";
import DialogFinalizarJordana from "@/components/widgets/InicioJornada/dialogs/DialogFinalizarJordana";
import MultiTimerProgress from "@/components/widgets/InicioJornada/MultiTimerProgress";

export default {
  name: "InicioJornadaMain",
  components: { MultiTimerProgress, DialogFinalizarJordana, DialogParada, CardBody, CardHeader },
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
    },
    isOverTime: {
      type: Boolean
    },
    cliente: {
      type: Array
    },
    proyecto: {
      type: Array
    },
    servicio: {
      type: Array
    },
    tarea: {
      type: Array
    }
  }
};
</script>
