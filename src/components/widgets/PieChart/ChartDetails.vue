<template>
  <section>
    <div class="pie-txt mt-4 ml-3" id="accordion">
      <div class="facturables">
        <div class="d-flex toggler" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          <div class="color color-h-facturables mx-3"></div>
          <div class="facturables-txt">Facturables</div>
          <div class="right-0"><i class="fas fa-chevron-down"></i></div>
        </div>
        <ul id="collapseOne" class="collapse show">
          <li>
            <div class="d-flex">
              <div class="color color-fac-one mx-3"></div>
              <div class="facturables-txt">Horas normales</div>
            </div>
          </li>
          <li>
            <div class="d-flex">
              <div class="color color-fac-two mx-3"></div>
              <div class="facturables-txt">Horas nocturnas</div>
            </div>
          </li>
          <li>
            <div class="d-flex">
              <div class="color color-fac-three mx-3"></div>
              <div class="facturables-txt">Festivas</div>
            </div>
          </li>
          <li>
            <div class="d-flex">
              <div class="color color-fac-four mx-3"></div>
              <div class="facturables-txt">Festivo y nocturno</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="Absentismo">
        <div class="d-flex toggler" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          <div class="color color-h-Absentismo mx-3"></div>
          <div class="facturables-txt">Absentismo</div>
          <div class="right-0"><i class="fas fa-chevron-down"></i></div>
        </div>
        <ul id="collapseTwo" class="collapse">
          <li>
            <div class="d-flex">
              <div class="color color-ab-one mx-3"></div>
              <div class="facturables-txt">color one</div>
            </div>
          </li>
          <li>
            <div class="d-flex">
              <div class="color color-ab-two mx-3"></div>
              <div class="facturables-txt">color two</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="No-retribuído">
        <div class="d-flex toggler" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          <div class="color color-h-No-retribuído mx-3"></div>
          <div class="facturables-txt">No retribuído</div>
          <div class="right-0"><i class="fas fa-chevron-down"></i></div>
        </div>
        <ul id="collapseThree" class="collapse">
          <li>
            <div class="d-flex">
              <div class="color color-rt-one mx-3"></div>
              <div class="facturables-txt">color one</div>
            </div>
          </li>
          <li>
            <div class="d-flex">
              <div class="color color-rt-two mx-3"></div>
              <div class="facturables-txt">color two</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="permiso">
        <div class="d-flex toggler" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
          <div class="color color-h-permiso mx-3"></div>
          <div class="facturables-txt">permiso compensatorio</div>
          <div class="right-0"><i class="fas fa-chevron-down"></i></div>
        </div>
        <ul id="collapseFour" class="collapse">
          <li>
            <div class="d-flex">
              <div class="color color-pe-one mx-3"></div>
              <div class="facturables-txt">color one</div>
            </div>
          </li>
          <li>
            <div class="d-flex">
              <div class="color color-pe-two mx-3"></div>
              <div class="facturables-txt">color two</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ChartDetails",
  props: {
    dataSet: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
/* pie chart */
.pie-txt {
  position: relative;
}

#toggle-fac-hide,
#toggle-ab-hide,
#toggle-rt-hide,
#toggle-pe-hide {
  position: relative;
  height: 0;
  overflow: hidden;
  margin: 0;
  transition: all 0.5s;
}

.toggle-show {
  height: auto !important;
  margin: auto !important;
  transition: all 0.5s;
}

ul li {
  list-style: none;
}

.right-0 {
  position: absolute;
  right: 100px;
  font-size: 14px;
  font-weight: 200;
  top: 5px;
}

.toggler {
  cursor: pointer;
}

.color {
  position: relative;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  top: 5px;
}

.facturables {
  position: relative;
}

.color-h-facturables {
  background-color: #b9ec7a;
}

.color-fac-one {
  background-color: #87e378;
}

.color-fac-two {
  background-color: #75c668;
}

.color-fac-three {
  background-color: #5b9652;
}

.color-fac-four {
  background-color: #406e38;
}

.facturables-txt {
  font-size: 14px;
  line-height: 30px;
  color: #000;
}

.Absentismo {
  position: relative;
}

.color-h-Absentismo {
  background-color: #ffbd6e;
}

.color-ab-one {
  background-color: #ffbd6e;
}

.color-ab-two {
  background-color: #ed9f41;
}

.No-retribuído {
  position: relative;
}

.color-h-No-retribuído {
  background-color: #ee9595;
}

.color-rt-one {
  background-color: #ee9595;
}

.color-rt-two {
  background-color: #d16060;
}

.permiso {
  position: relative;
}

.color-h-permiso {
  background-color: #7aa7ec;
}

.color-pe-one {
  background-color: #7aa7ec;
}

.color-pe-two {
  background-color: #5d81b7;
}
</style>
