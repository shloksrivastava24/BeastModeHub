"use server";

import { getCurrentUser } from "@/lib/auth/current-user";
import { TodoModel } from "@/lib/db/todo.model";
import { connectDB } from "@/lib/db/connect";
import { revalidatePath } from "next/cache";

type ActionResponse = {
    success: boolean;
    error?: string;
    completed?: boolean;
};

export async function toggleTodo(todoId: string): Promise<ActionResponse> {
    try {
        // Validate input
        if (!todoId || typeof todoId !== "string") {
            return {
                success: false,
                error: "Invalid todo ID",
            };
        }

        const user = await getCurrentUser();
        if (!user) {
            return {
                success: false,
                error: "Unauthorized",
            };
        }

        await connectDB();

        const todo = await TodoModel.findOne({
            _id: todoId,
            userId: user._id.toString(),
        });

        if (!todo) {
            return {
                success: false,
                error: "Todo not found",
            };
        }

        // Toggle completion status
        todo.completed = !todo.completed;
        await todo.save();

        // Revalidate to update UI
        revalidatePath("/dashboard");

        return {
            success: true,
            completed: todo.completed,
        };
    } catch (error) {
        console.error("Error toggling todo:", error);
        return {
            success: false,
            error: "Failed to update todo",
        };
    }
}