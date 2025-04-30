import { TaskUpdateInput } from "@/generated";
import { Task } from "@/graphql/models";

export const updateTask = async (
  _: unknown,
  { taskId, input }: { taskId: string; input: TaskUpdateInput }
) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { $set: input },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      throw new Error("task not found");
    }

    return updatedTask;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
