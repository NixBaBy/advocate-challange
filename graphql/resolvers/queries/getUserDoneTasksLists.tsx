import { Task } from "@/graphql/models";

export const getUserDoneTasksLists = async () => {
  try {
    const doneTasks = await Task.find({ isDone: true });
    return doneTasks;
  } catch (error) {
    throw new Error("Failed to fetch done tasks");
  }
};
