import { addTask } from "@/graphql/resolvers/mutations/addTask";

jest.mock("../../graphql/models", () => ({
  Task: {
    create: jest.fn(),
  },
}));

describe("add task mutation", () => {
  const input = {
    taskName: "Task1",
    description: "Description 1",
    priority: 1,
    tags: ["tags1"],
  };

  it("1. should return created task successfully", async () => {
    const { Task } = require("../../graphql/models");
    Task.create.mockResolvedValueOnce({
      taskName: "Task1",
      description: "Description 1",
      priority: 1,
      tags: ["tags1"],
    });

    const result = await addTask({}, { input });
    expect(result).toEqual({
      taskName: "Task1",
      description: "Description 1",
      priority: 1,
      tags: ["tags1"],
    });
  });

  it("2. should throw an error when taskName and description are the same", async () => {
    const sameInput = {
      taskName: "Same Name",
      description: "Same Name",
      priority: 1,
      tags: ["tags1"],
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

    await expect(addTask({}, { input })).rejects.toThrow(
      "Failed to add task. Please try again later."
    );
  });
});
