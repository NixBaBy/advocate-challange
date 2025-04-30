import { Task } from "@/graphql/models";
import { addTask } from "@/graphql/resolvers/mutations/addTask";

jest.mock("../../graphql/models", () => ({
  Task: {
    create: jest.fn(),
  },
}));

describe("add task mutation", () => {
  const mockInput = {
    taskName: "Task1",
    description: "Description 1",
    priority: 1,
    tags: ["tags1"],
    isDone: false,
  };

  it("1. should return created task successfully", async () => {
    (Task.create as jest.Mock).mockResolvedValueOnce({
      ...mockInput,
    });

    const result = await addTask({}, { input: mockInput });
    expect(result).toEqual({
      ...mockInput,
    });
  });

  it("2. should throw an error when taskName and description are the same", async () => {
    const sameInput = {
      taskName: "Same Name",
      description: "Same Name",
      priority: 1,
      tags: ["tags1"],
      isDone: false,
    };

    try {
      await addTask({}, { input: sameInput });
    } catch (error: any) {
      expect(error.message).toBe("description cannot be the same as taskName");
    }
  });

  it("3. should throw an error when task creation fails", async () => {
    const { Task } = require("../../graphql/models");
    Task.create.mockRejectedValueOnce(
      new Error("Failed to add task. Please try again later.")
    );

    await expect(addTask({}, { input: mockInput })).rejects.toThrow(
      "Failed to add task. Please try again later."
    );
  });
});
