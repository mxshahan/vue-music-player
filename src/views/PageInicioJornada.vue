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
      />
      <div v-if="$store.state.selectedTarea !== ''">
        <TareaCard v-for="(task, index) in startedTarea" :key="index" :position="index"/>
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
      shifts: [
        {
          symbol: 'M',
          symbolColor: '#7ACFEE',
          startTime: "09:10",
          endTime: "15:10"
        },
        {
          symbol: 'T',
          symbolColor: '#1197D8',
          startTime: "16:00",
          endTime: "18:00"
        }
      ],
      isStartWorkLate: true,
      cliente: ["Telefónica", "IZO"],
      proyecto: ["Endesa CAT"],
      servicio: ["E-REDES"],
      tarea: ["Auditoría", "Verificación", "Encuesta", "Emisión"],
      startedTarea: ["Verificación", "Encuesta"]
    };
  }
};
</script>
