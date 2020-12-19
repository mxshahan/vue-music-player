<template>
  <div>
    <span>
      Horario habitual
    </span>
    <div v-for="(shift, index) in shifts" :key="index">
      <v-avatar size="16" :color="shift.symbolColor">
        <span class="white--text" style="font-size: 8px;">{{ shift.symbol }}</span>
      </v-avatar>
      <span class="pl-1 caption">{{ shift.startTime }}-{{ shift.endTime }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "HorarioHabitual",
  props: {
    shifts: {
      type: Array,
      required: true
    }
  }
};
</script>