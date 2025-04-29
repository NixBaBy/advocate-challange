import { getAllTasks } from "@/graphql/resolvers/queries";

jest.mock("../../graphql/models", () => ({
  Task: {
    find: jest
      .fn()
      .mockResolvedValueOnce([
        {
          _id: "1",
          taskName: "Task 1",
          isDone: false,
          description: "Description 1",
          priority: 1,
          tags: ["tag1"],
          createdAt: "2023-01-01T00:00:00Z",
          updatedAt: "2023-01-01T00:00:00Z",
        },
      ])
      .mockRejectedValueOnce(new Error("Database Error")),
  },
}));

describe("getAllTasks Query", () => {
  it("Should return all tasks", async () => {
    const result = await getAllTasks();
    expect(result).toEqual([
      {
        _id: "1",
        taskName: "Task 1",
        isDone: false,
        description: "Description 1",
        priority: 1,
        tags: ["tag1"],
        createdAt: "2023-01-01T00:00:00Z",
        updatedAt: "2023-01-01T00:00:00Z",
      },
    ]);
  });
  it("Shoult throw an error if fetching tasks fail", async () => {
    try {
      await getAllTasks();
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toEqual("Failed to fetch tasks");
      } else {
        throw new Error("Expected an errpr of type Error");
      }
    }
  });
});
