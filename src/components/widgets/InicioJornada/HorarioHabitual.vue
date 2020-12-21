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
    <v-img
      style="position: absolute; top: 0;left: 48%;  margin-top: -4px;"
      width="10"
      height="4"
      src="@/assets/icons/bg_tooltip_tail.svg"
    />
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