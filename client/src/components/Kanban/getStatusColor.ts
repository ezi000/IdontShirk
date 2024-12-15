import { TaskStatus } from "./types";

const getStatusColor = (taskStatus: TaskStatus) => {
  switch (taskStatus) {
    case "TODO":
      return "#adb5bd";
    case "IN_PROGRESS":
      return "#fcbf49";
    case "DONE":
      return "#6a994e";
    default:
      return "#343a40";
  }
};

export default getStatusColor;
