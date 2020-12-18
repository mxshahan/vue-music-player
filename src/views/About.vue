<template>
  <div class="about">
    <h1>PAGES</h1>
    <ul>
      <li>
        <router-link to="/">Pi-Chart</router-link>
      </li>
      <li>
        <router-link to="/inicio-jornada">Inicio jornada en remoto</router-link>
      </li>
      <li>
        <router-link to="/turnos-partidos">Inicio remoto (Turnos partidos)</router-link>
      </li>
      <li>
        <router-link to="/absentismos-programados">Inicio remoto (Absentismos programados)</router-link>
      </li>
      <li>
        <router-link to="/horas-extra">Inicio remoto (Horas extra)</router-link>
      </li>
      <li>
        <router-link to="/inicio-con-absentismo-programado">Inicio remoto (Inicio con absentismo programado)</router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.about {
  padding: 16px;
}
</style>