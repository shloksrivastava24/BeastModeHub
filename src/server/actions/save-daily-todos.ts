"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth/current-user";
import { TodoModel } from "@/lib/db/todo.model";
import { todayString } from "@/lib/todos/today";
import { connectDB } from "@/lib/db/connect";

type ActionResponse = {
    success: boolean;
    error?: string;
};

export async function saveDailyTodos(todos: string[]): Promise<ActionResponse> {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return {
                success: false,
                error: "Unauthorized - Please sign in",
            };
        }

        // Validate input
        if (!Array.isArray(todos)) {
            return {
                success: false,
                error: "Invalid input format",
            };
        }

        if (todos.length !== 8) {
            return {
                success: false,
                error: "Exactly 8 todos are required",
            };
        }

        // Validate each todo
        for (const todo of todos) {
            if (typeof todo !== "string" || todo.trim().length < 3) {
                return {
                    success: false,
                    error: "Each todo must be at least 3 characters",
                };
            }
        }

        await connectDB();

        const today = todayString();

        // Check if todos already locked for today
        const existing = await TodoModel.countDocuments({
            userId: user._id.toString(),
            createdForDate: today,
            locked: true,
        });

        if (existing > 0) {
            return {
                success: false,
                error: "Todos already locked for today",
            };
        }

        // Create todos
        const docs = todos.map((title) => ({
            userId: user._id.toString(),
            title: title.trim(),
            createdForDate: today,
            locked: true,
        }));

        await TodoModel.insertMany(docs);

        // Revalidate the dashboard
        revalidatePath("/dashboard");

        return {
            success: true,
        };
    } catch (error) {
        console.error("Error saving daily todos:", error);
        return {
            success: false,
            error: "Failed to save todos. Please try again.",
        };
    }
}