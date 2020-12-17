<template>
  <div class="widget mt-3 mx-auto">
    <!-- Header Start -->
    <Header :header-img="headerLeftIconImg" :header-title="headerLeftTitle" />

    <!-- Widget Hour Header -->
    <div class="row">
      <ChartHeader v-for="(item, index) in items" :key="index" :item="item" />
    </div>

    <!-- Progress Section Start -->
    <ProgressBar :percentage="progressPercentage" />

    <!-- Pie chart Section Start -->
    <!-- Chart -->
    <div class="d-flex justify-content-center" style="height: 34vh;">
      <DoughnutChart style="position: absolute;" :height="236" :width="236" :data="doughnutChartData" :options="doughnutChartOptions" />
      <PieChart
        style="position: absolute; margin-top: 25px; border-radius: 50%;"
        :height="186"
        :width="186"
        :data="chartData"
        :options="chartOptions"
      />
    </div>
    <!-- Chart Details Collapsable -->
    <ChartDetails :data-set="dataSet" />
  </div>
</template>

<script>
import PieChart from "@/components/widgets/PieChart/PieChart";
import DoughnutChart from "@/components/widgets/PieChart/DoughnutChart";
import Header from "./Header";
import ProgressBar from "./ProgressBar";
import ChartDetails from "@/components/widgets/PieChart/ChartDetails";
import ChartHeader from "./ChartHeader.vue";

export default {
  name: "PieChartMainComponent",
  components: {
    ChartDetails,
    ProgressBar,
    Header,
    DoughnutChart,
    PieChart,
    ChartHeader
  },
  props: ["headerLeftIconImg", "headerLeftTitle", "widgetHeader", "progressPercentage", "pieChart", "doughnutChart"],
  data() {
    return {
      items: this.widgetHeader,
      dataSet: [
        {
          title: "Facturables",
          data: [
            {
              label: "Horas normales",
              hour: 26
            },
            {
              label: "Horas nocturnas",
              hour: 26
            },
            {
              label: "Festivas",
              hour: 26
            },
            {
              label: "Festivo y nocturno",
              hour: 26
            }
          ]
        },
        {
          title: "Absentismo",
          data: [
            {
              label: "color one",
              hour: 26
            },
            {
              label: "color two",
              hour: 26
            }
          ]
        },
        {
          title: "No retribuido",
          data: [
            {
              label: "color one",
              hour: 26
            },
            {
              label: "color two",
              hour: 26
            }
          ]
        },
        {
          title: "Permiso compensatorio",
          data: [
            {
              label: "color one",
              hour: 26
            },
            {
              label: "color two",
              hour: 26
            }
          ]
        }
      ],
      chartOptions: {
        rotation: -3.1415926535898,
        elements: {
          arc: {
            borderWidth: 0
          }
        },
        legend: {
          display: false
        },
        tooltips: {
          bodySpacing: 6,
          bodyFontSize: 14,
          titleFontStyle: "bold",
          _bodyFontStyle: "normal",
          caretSize: 10,
          caretPadding: 10,
          cornerRadius: 4,
          titleAlign: "center",
          displayColors: false,
          backgroundColor: "#52575C",
          _bodyAlign: "center",
          callbacks: {
            label: function(tooltipItem, chartData) {
              return [chartData.datasets[0].data[tooltipItem.index] + "% - 26h", chartData.labels[tooltipItem.index]];
            }
          }
        }
      },
      chartData: {
        labels: this.pieChart.labels,
        radius: "90%",
        innerRadius: "70%",
        datasets: [
          {
            label: "Data One",
            backgroundColor: this.pieChart.color,
            data: this.pieChart.data,
            radius: 4,
            innerRadius: 50
          }
        ]
      },
      doughnutChartOptions: {
        rotation: -3.1415926535898,
        cutoutPercentage: 90,
        elements: {
          arc: {
            borderWidth: 0
          }
        },
        legend: {
          display: false
        },
        weight: 1,
        tooltips: {
          bodyFontSize: 14,
          titleFontStyle: "bold",
          caretSize: 10,
          cornerRadius: 4,
          titleAlign: "center",
          displayColors: false,
          backgroundColor: "#52575C",
          _bodyAlign: "center",
          callbacks: {
            label: function(tooltipItem, doughnutChartData) {
              return [doughnutChartData.datasets[0].data[tooltipItem.index] + "% - 26h ", doughnutChartData.labels[tooltipItem.index]];
            }
          }
        }
      },
      doughnutChartData: {
        labels: this.doughnutChart.labels,
        radius: 1,
        innerRadius: 1,
        datasets: [
          {
            label: "Data One",
            backgroundColor: this.doughnutChart.color,
            data: this.doughnutChart.data,
            radius: 1,
            innerRadius: 10
          }
        ]
      }
    };
  }
};
</script>

<style scoped>
/* Basic */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  caret-color: transparent;
}

.widget {
  width: 346px;
  /* height: 733px; */
  background-color: #fff;
  box-shadow: 0 0 5px 1px #e5e5e5;
  border-radius: 8px;
}
</style>
