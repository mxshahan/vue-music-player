<template>
  <v-select :class="customClass" v-model="selectedItem" :items="items" label="Cliente" dense outlined :disabled="disabled">
    <template v-slot:label>
      <span class="pa-0" :class="`${disabled ? 'disabled--text': 'black--text'}`">{{ label }}</span>
    </template>

    <template v-slot:append>
      <v-img width="16" height="16" class="mt-1" src="@/assets/icons/ic_dropdown.svg" />
    </template>

    <template v-slot:item="{ active, item, attrs, on }">
      <v-list-item dense class="pa-0 ma-0 mx-1" v-on="on" v-bind="attrs">
        <v-list-item-content class="select-item pa-0 ma-0">
          <v-list-item-title class="px-3 py-3">
            {{ item }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-select>
</template>

<script>
export default {
  name: "SelectComponent",
  props: {
    label: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    customClass: {
      type: String
    }
  },
  data() {
    return {
      selectedItem: ""
    };
  },
  watch: {
    selectedItem(newValue) {
      this.$emit("select", newValue);
    }
  }
};
</script>