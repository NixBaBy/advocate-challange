import { addTask } from "./mutations/addTask";
import { updateTask } from "./mutations/updateTask";
import { getAllTasks, getUserDoneTasksLists } from "./queries";

export const resolvers = {
  Query: {
    getAllTasks,
    getUserDoneTasksLists,
  },
  Mutation: {
    addTask,
    updateTask,
  },
};
