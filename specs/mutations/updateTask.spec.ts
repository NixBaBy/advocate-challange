import { Task } from "@/graphql/models";
import { updateTask } from "@/graphql/resolvers/mutations/updateTask";

jest.mock("../../graphql/models", () => ({
  Task: {
    findByIdAndUpdate: jest.fn(),
  },
}));

describe("update task mutation", () => {
  const input = {
    taskName: "Task2",
    description: "Description 2",
    priority: 2,
    tags: ["tags2"],
  };

  it("1. should successfully update task", async () => {
    (Task.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce({
      taskName: "Task2",
      description: "Description 2",
      priority: 2,
      tags: ["tags2"],
    });

    const result = await updateTask({}, { taskId: "taskId", input });
    expect(result).toEqual({
      taskName: "Task2",
      description: "Description 2",
      priority: 2,
      tags: ["tags2"],
    });
  });

  it("3. should throw an error if taskId is not found", async () => {
    (Task.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(null);

    await expect(
      updateTask(
        {},
        {
          taskId: "invalidId",
          input: { taskName: "New Task", description: "Description" },
        }
      )
    ).rejects.toThrow("task not found");
  });
});
