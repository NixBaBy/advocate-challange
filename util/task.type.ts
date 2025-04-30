export type AddTaskInput = {
    taskName: string;
    isDone: boolean;
    description: string;
    priority: number;
    tags: string[];
  };
export type TaskUpdateInput = Partial<AddTaskInput>;
