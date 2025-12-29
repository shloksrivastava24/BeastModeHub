"use server";

import { getCurrentUser } from "@/lib/auth/current-user";
import { TodoModel } from "@/lib/db/todo.model";
import { TodoSchema } from "@/lib/db/todo.schema";
import { todayString } from "@/lib/todos/today";
import { connectDB } from "@/lib/db/connect";
import { revalidatePath } from "next/cache";

// Define return type for better type safety
type ActionResponse<T = void> = {
    success: boolean;
    error?: string;
    data?: T;
};

export async function createTodo(
    formData: FormData
): Promise<ActionResponse> {
    try {
        // 1. Authenticate user
        const user = await getCurrentUser();
        if (!user) {
            return {
                success: false,
                error: "Unauthorized - Please sign in",
            };
        }

        // 2. Parse and validate input
        const data = {
            title: formData.get("title"),
            createdForDate: todayString(),
        };

        const parsed = TodoSchema.safeParse(data);
        if (!parsed.success) {
            return {
                success: false,
                error: "Invalid todo - Title must be at least 3 characters",
            };
        }

        // 3. Connect to database (singleton pattern)
        await connectDB();

        // 4. Check business rules
        const count = await TodoModel.countDocuments({
            userId: user._id.toString(),
            createdForDate: data.createdForDate,
        });

        if (count >= 8) {
            return {
                success: false,
                error: "Daily todo limit reached (8 todos maximum)",
            };
        }

        // 5. Create todo
        await TodoModel.create({
            ...parsed.data,
            userId: user._id.toString(),
        });

        // 6. Revalidate path to update UI
        revalidatePath("/dashboard");

        return {
            success: true,
        };
    } catch (error) {
        console.error("Error creating todo:", error);
        return {
            success: false,
            error: "Failed to create todo. Please try again.",
        };
    }
}