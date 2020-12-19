<template>
  <v-card width="507" class="my-5 px-5 py-4">
    <v-row>
      <v-col align="left">
          <span class="body-2">
            {{ $store.state.selectedCliente }} / {{ $store.state.selectedProyecto }} / {{ $store.state.selectedServicio
            }} / <span
            class="primary--text font-weight-bold">{{ $store.state.selectedTarea }}</span>
          </span>
      </v-col>
      <v-col cols="2" class="pt-1">
        <v-menu
          rounded="rounded"
          offset-y

        >
          <template v-slot:activator="{ attrs, on }">
            <v-btn class="float-right play-btn-style" height="40" width="40" icon :color="!play ? 'primary' : 'warning'"
                   outlined>
              <v-icon v-if="!play"
                      @click="play = !play"
              >mdi-pause
              </v-icon>
              <v-icon v-else v-bind="attrs"
                      v-on="on"
                      @click="play = !play"
              >mdi-pause
              </v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item link>
              <v-list-item-title>Descanso</v-list-item-title>
            </v-list-item>
            <v-list-item link>
              <v-list-item-title>Incidencia...</v-list-item-title>
            </v-list-item>
            <v-list-item link>
              <v-list-item-title>Otros...</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
    <TimerProgress />
  </v-card>
</template>

<script>
import TimerProgress from "@/components/widgets/InicioJornada/TimerProgress";

export default {
  name: "TareaCard",
  components: { TimerProgress },
  data() {
    return {
      play: false
    };
  }
};
</script>

<style scoped>
.play-btn-style {
  border: 2px solid;
}
</style>