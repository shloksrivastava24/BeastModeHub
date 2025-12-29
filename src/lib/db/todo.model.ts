// src/lib/db/todo.model.ts
import { Schema, model, models } from "mongoose";

const TodoSchema = new Schema(
    {
        userId: { type: String, required: true },

        title: { type: String, required: true },
        createdForDate: { type: String, required: true }, // YYYY-MM-DD

        completed: { type: Boolean, default: false },
        locked: { type: Boolean, default: false }, // 
        isAISuggested: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export const TodoModel =
    models.Todo || model("Todo", TodoSchema);
