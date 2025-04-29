import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Query {
    getAllTasks: [Task]
    getUserDoneTasksLists: [Task]
  }
  input addTaskInput {
    taskName: String!
    description: String!
    priority: Int!
    tags: [String]
  }

  input taskUpdateInput {
    taskName: String
    description: String
    priority: Int
    tags: [String]
    isDone: Boolean
  }

  type Mutation {
    addTask(input: addTaskInput!): Task!
    updateTask(taskId: ID!, input: taskUpdateInput!): Task!
  }
    
  type Task {
    _id: ID!
    taskName: String!
    isDone: Boolean
    description: String
    priority: Int!
    tags: [String!]!
    createdAt: String
    updatedAt: String
  }
`;
