<template>
  <v-row>
    <v-col align-self="center" align="center">
      <InicioJornadaMain
        card-title="Inicio de jornada"
        date="09/4/2020"
        start-time="09:00"
        end-time="15:00"
        :cliente="cliente"
        :proyecto="proyecto"
        :servicio="servicio"
        :tarea="tarea"
      />
    </v-col>
  </v-row>
</template>

<script>
import InicioJornadaMain from "@/components/widgets/InicioJornada/Main";

export default {
  name: "InicioJornada",
  components: { InicioJornadaMain },
  data() {
    return {
      cliente: ["Telefónica", "IZO"],
      proyecto: ["Endesa CAT"],
      servicio: ["E-REDES"],
      tarea: ["Auditoría", "Verificación", "Encuesta", "Emisión"]

    };
  }
};
</script>
