<template>
  <div class="home">
    <h1 class="title">PAGES</h1>
    <ul>
      <li>
        <v-btn link text class="text-decoration-none" to="/pie-chart">Pie Chart</v-btn>
      </li>
      <li>
        <v-btn link text class="text-decoration-none" to="/inicio-jornada">Inicio jornada en remoto</v-btn>
      </li>
      <li>
        <v-btn link text class="text-decoration-none" to="/turnos-partidos">Inicio remoto (Turnos partidos)</v-btn>
      </li>
      <li>
        <v-btn link text class="text-decoration-none" to="/absentismos-programados">Inicio remoto (Absentismos programados)</v-btn>
      </li>
      <li>
        <v-btn link text class="text-decoration-none" to="/horas-extra">Inicio remoto (Horas extra)</v-btn>
      </li>
      <li>
        <v-btn link text class="text-decoration-none" to="/inicio-con-absentismo-programado">Inicio remoto (Inicio con absentismo programado)</v-btn>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "PageHome"
};
</script>

<style scoped>
.home {
  padding: 16px;
}
</style>