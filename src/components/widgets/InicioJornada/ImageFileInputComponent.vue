<template>
  <div>
    <div v-if="imageData === null" class="img-input-style py-1 pl-2 pr-1" @click="chooseImage">
      <v-btn icon style="margin-top: 2px;">
        <v-img width="40" height="40" src="@/assets/icons/ic_camera.svg" />
      </v-btn>
      <span class="caption ml-2">Seleccionar/arrastrar imagen</span>
    </div>
    <div v-else class="img-input-style py-1 pl-2 pr-1">
      <v-btn icon style="margin-top: 2px;">
        <div class="base-image-input text-center" :style="{ 'background-image': `url(${imageData})` }"></div>
      </v-btn>
      <span class="caption ml-2 black--text">
        {{ fileName }}
        <v-btn small icon class="float-right pa-1" style="margin-top: 5px;" @click="clearFileSelection()"
          ><v-img width="16" height="16" src="@/assets/icons/ic_symbol_x.svg"
        /></v-btn>
      </span>
    </div>
    <input class="d-none" ref="imageFile" type="file" accept="image/*" @input="onSelectFile" />
  </div>
</template>

<script>
export default {
  name: "ImageFileInputComponent",
  data() {
    return {
      imageData: null,
      file: null
    };
  },
  methods: {
    chooseImage() {
      this.$refs.imageFile.click();
    },
    onSelectFile() {
      // console.log("onSelectFile called");

      const input = this.$refs.imageFile;
      const files = input.files;

      if (files && files[0]) {
        console.log("image loaded");
        const reader = new FileReader();
        reader.onload = e => {
          this.imageData = e.target.result;
          this.file = this.$refs.imageFile.files[0];
        };
        reader.readAsDataURL(files[0]);
      } else {
        console.log("image not loaded");
      }
    },
    clearFileSelection() {
      this.imageData = null;
      this.file = null;
    }
  },
  computed: {
    fileName() {
      let name = this.file.name;
      return name.length > 25 ? name.substring(0, 24).toString() + "..." : this.file.name;
    }
  }
};
</script>

<style scoped>
.img-input-style {
  width: 246px;
  height: 48px;
  border: 1px dashed #a0a4a8;
  box-sizing: border-box;
  border-radius: 4px;
  cursor: pointer;
}

.base-image-input {
  display: block;
  width: 40px;
  height: 40px;
  cursor: pointer;
  background-size: cover;
  background-position: center center;
}
</style>
