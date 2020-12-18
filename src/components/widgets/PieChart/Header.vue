<template>
  <header>
    <div class="container">
      <div class="row">
        <div class="col-12 my-3">
          <div class="row">
            <div class="col-6">
              <div class="logo">
                <img :src="headerImg" alt="" class="mr-2" />
                <strong>{{ headerTitle }}</strong>
              </div>
            </div>
            <div class="col-6 text-right">
              <div class="right-txt">
                <span class="mx-2 my-auto">Vista mensual</span>
                <i class="fas fa-ellipsis-v my-auto"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  props: {
    headerImg: {
      type: String,
      required: true
    },
    headerTitle: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
/* header */
.logo {
  font-size: 14px;
  font-weight: 700;
  line-height: 16.41px;
}
.right-txt {
  color: #a0a4a8;
  font-size: 10px;
  line-height: 16.72px;
}
</style>
