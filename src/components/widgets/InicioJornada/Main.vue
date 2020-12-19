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
      <TimerProgress />
    </v-card-text>
  </v-card>
</template>

<script>
import TimerProgress from "@/components/widgets/InicioJornada/TimerProgress";
import CardHeader from "@/components/widgets/InicioJornada/CardHeader";
import CardBody from "@/components/widgets/InicioJornada/CardBody";

export default {
  name: "InicioJornadaMain",
  components: { CardBody, CardHeader, TimerProgress },
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
