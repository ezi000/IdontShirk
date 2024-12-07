import { RootState } from "../../Redux/store";

const selectTasks = (state: RootState) => state.tasks.tasks;

export default selectTasks;
