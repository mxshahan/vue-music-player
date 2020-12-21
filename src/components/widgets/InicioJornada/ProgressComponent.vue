<template>
  <div>
    <div id="fruit-meter">
      <v-tooltip style="position: relative; top: 0;" bottom color="dattechs_black_2" v-for="(data, index) in progressData" :key="index">
        <template v-slot:activator="{ on, attrs }">
          <v-progress-linear
            v-bind="attrs"
            v-on="on"
            value="100"
            :color="data.color"
            background-color="dattechs_black_5"
            rounded height="8" />
        </template>
        <v-row>
          <v-col align="center" class="py-0 px-3">
            <span class="body-2 font-weight-medium">{{ data.duration }}</span>
            <br />
            <span class="caption">({{ data.time }})</span>
            <v-img width="16" height="16" src="@/assets/icons/ic_message_read.svg" />
          </v-col>
        </v-row>
      </v-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProgressComponent",
  props: {
    progressData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
#fruit-meter {
  border: 2px solid white;
  background: #e8e8e8;
  border-radius: 10px;
  overflow: hidden;
  /* New code below: */
  display: grid;
  grid-template-columns: 0.5fr 1fr 0.3fr 0.6fr 1fr;
}

#apples {
  background: #48bb78;
}

#bananas {
  background: #ecc94b;
}

#peaches {
  background: #ed8936;
}

#cherries {
  background: #e53e3e;
}

#grapes {
  background: #805ad5;
}
</style>
