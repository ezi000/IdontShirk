export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

export type Task = {
  id: string;
  status: TaskStatus;
  title: string;
  description: string;
  userId: string;
  timeSpent: number;
  timeGoal: number;
  completed: boolean;
};

export type Column = {
  id: TaskStatus;
  title: string;
};
