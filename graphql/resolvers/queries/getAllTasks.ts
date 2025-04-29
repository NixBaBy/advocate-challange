import { Task } from "@/graphql/models";

export const getAllTasks = async () => {
  try {
    const tasks = await Task.find({ isDone: false });
    return tasks;
  } catch (error) {
    return new Error("failed to fetch task");
  }
};
