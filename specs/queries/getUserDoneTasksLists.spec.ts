import { getUserDoneTasksLists } from "@/graphql/resolvers/queries";

jest.mock("../../graphql/models", () => ({
  Task: {
    find: jest
      .fn()
      .mockResolvedValueOnce([
        {
          _id: "1",
          taskName: "Task1",
          isDone: true,
          description: "Description 1",
          priority: 1,
          tags: ["tags1"],
          createdAt: "2023-01-01T00:00:00z",
          updatedAt: "2023-01-01T00:00:00z",
        },
      ])
      .mockRejectedValueOnce(new Error("Database error")),
  },
}));
describe("getUserDoneTasks Query", () => {
  it("should return all done tasks", async () => {
    const result = await getUserDoneTasksLists();
    expect(result).toEqual([
      {
        _id: "1",
        taskName: "Task1",
        isDone: true,
        description: "Description 1",
        priority: 1,
        tags: ["tags1"],
        createdAt: "2023-01-01T00:00:00z",
        updatedAt: "2023-01-01T00:00:00z",
      },
    ]);
  });
  it("Should throw an error when fetching done tasks fails", async () => {
    try {
      await getUserDoneTasksLists();
    } catch (error) {
      if (error instanceof Error)
        expect(error.message).toEqual("Failed to fetch done tasks");
    }
  });
});
