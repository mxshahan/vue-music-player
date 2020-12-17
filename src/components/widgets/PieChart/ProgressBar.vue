<template>
  <section class="progress-section mt-3 mb-4 pb-3">
    <div class="container">
      <div class="row">
        <div class="col-10">
          <div class="progress my-auto">
            <div class="progress-bar" :style="`width: ${percentage}%`"></div>
          </div>
        </div>
        <div class="col-2 text-center">
          <div id="progress-percentage">{{ percentage.toFixed(1) }}%</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ProgressBar",
  props: {
    percentage: {
      type: Number,
      required: true
    }
  }
};
</script>

<style scoped>
/* progress section */
.progress-section {
  position: relative;
}

.progress-section h3 {
  font-size: 24px;
  color: #000;
}

.progress-section h6 {
  font-size: 14px;
  color: #000;
}

.progress-section p {
  font-size: 14px;
  color: #777777;
}

.progress-section .progress {
  position: relative;
  height: 5px;
  line-height: 12px;
  top: 3px;
}

.progress .progress-bar {
  background-color: #b9ec7a;
  height: auto;
}

.progress-section #progress-percentage {
  font-size: 12px;
  color: #000;
  font-weight: 700;
  line-height: 12px;
}
</style>
