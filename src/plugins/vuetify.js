import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#1058FB",
        accent: "#424242",
        secondary: "#FFA815",
        info: "#26A69A",
        warning: "#FFC657",
        error: "#FB4E4E",
        success: "#43A047",
        iconColor: "#A0A4A8",
        iconColorDarkGrey: "#777777",
        textTitle: "#25282B",
        disabled: "#CACCCF", // Divider & Borders, disabled
        disabledCard: "#F9F9FA", // Divider & Borders, disabled
        dattechs_black_2: "#52575C", // Tooltip
        dattechs_black_3: "#A0A4A8",
        dattechs_black_5: "#E8E8E8"
      }
    }
  }
});
