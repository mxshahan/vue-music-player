<template>
  <PieChartMain
    :headerLeftIconImg="headerLeftIconImg"
    :headerLeftTitle="headerLeftTitle"
    :widgetHeader="widgetHeader"
    :progressPercentage="63"
    :pieChart="pieChartData"
    :doughnutChart="doughnutChartData"
  />
</template>

<script>
// @ is an alias to /src
import { PieChartMain } from "@/components/widgets";

export default {
  name: "Home",
  components: {
    PieChartMain
  },
  data() {
    return {
      headerLeftIconImg: "/img/watch.png",
      headerLeftTitle: "Bolsa de horas",
      headerRightTitle: "Vista Mensural",
      headerRightIcon: "",
      widgetHeader: [
        {
          title: "compensadas",
          time: 26
        },
        {
          title: "Bolsa de horas",
          time: 98
        }
      ],
      pieChartData: {
        data: [10, 6, 6, 8, 5, 5, 5, 6, 10, 15],
        color: ["#87E378", "#75C668", "#5B9652", "#406F38", "#FFBD6E", "#ED9F41", "#EE9595", "#D16060", "#7AA7EC", "#5D81B7"],
        labels: [
          "Horas normales",
          "Horas nocturnas",
          "Festivas",
          "Festivo y nocturno",
          "color one",
          "color two",
          "color one",
          "color two",
          "color one",
          "color two"
        ]
      },
      doughnutChartData: {
        data: [39, 13, 15, 33],
        color: ["#B9EC7A", "#FFBD6E", "#EE9595", "#7AA7EC"],
        labels: ["Facturables", "Absentismo", "No retribuido", "Permiso compensatorio"]
      }
    };
  }
};
</script>
