import { Task } from "@/graphql/models";

export const addTask = async (_: unknown, { input }: { input: any }) => {
  try {
    if (input.taskName === input.description) {
      throw new Error("description cannot be the same as taskName");
    }

    const newTask = await Task.create({
      taskName: input.taskName,
      isDone: false,
      description: input.description,
      priority: input.priority,
      tags: input.tags,
    });

    return newTask;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
