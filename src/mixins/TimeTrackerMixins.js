import { workStatus } from "@/helper/constants";

export default {
  methods: {
    _getColorBasedOnStatus(status) {
      switch (status) {
        case workStatus.NOT_STARTED:
          return "disabled";
        case workStatus.LATE:
          return "error";
        case workStatus.WORKING:
          return "primary";
        case workStatus.PAUSED:
          return "dattechs_black_5";
        case workStatus.STOPPED:
          return "warning";
        case workStatus.LEAVE:
          return "colorLeave";
      }
    }
  }
};
