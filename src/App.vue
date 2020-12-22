<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  })
};
</script>

<style>
.select-item :hover {
  background: #0047d1;
  color: white !important;
  border-radius: 4px;
}
</style>
