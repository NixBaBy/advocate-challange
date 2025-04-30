import { Task } from "@/graphql/models";
import { updateTask } from "@/graphql/resolvers/mutations/updateTask";

jest.mock("../../graphql/models", () => ({
  Task: {
    findByIdAndUpdate: jest.fn(),
  },
}));

describe("update task mutation", () => {
  const mockInput = {
    taskName: "Task2",
    description: "Description 2",
    priority: 2,
    tags: ["tags2"],
    isDone:true
  };

  it("1. should successfully update task", async () => {
    (Task.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce({
      ...mockInput,
      isDone: true,
    });

    const result = await updateTask({}, { taskId: "taskId", input: mockInput });
    expect(result).toEqual({
      ...mockInput,
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
