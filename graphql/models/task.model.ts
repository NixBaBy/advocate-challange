import mongoose, { model, Schema } from "mongoose";

const taskSchema = new Schema(
  {
    taskName: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (v: string) {
          return v.length > 0 && v.length <= 100;
        },
        message: "taskName is required and must be under 100 characters",
      },
    },
    description: {
      type: String,
      required: true,
      trim: true,
      validate: [
        {
          validator: function (v: string) {
            return v.length >= 10;
          },
          message: "description must be at least 10 characters long",
        },
      ],
    },
    isDone: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: Number,
      required: true,
      min: [1, "priority must be at least 1"],
      max: [5, "priority must be at most 5"],
    },
    tags: {
      type: [String],
      required: false,
      validate: {
        validator: function (v: string[]) {
          return v.length <= 5;
        },
        message: "tags cannot have more than 5 items",
      },
    },
  },
  {
    timestamps: true,
  }
);

export const Task = mongoose.models.Task || model("Task", taskSchema);
