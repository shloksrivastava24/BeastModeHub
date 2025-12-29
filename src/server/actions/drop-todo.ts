"use server";

import { getCurrentUser } from "@/lib/auth/current-user";
import { TodoModel } from "@/lib/db/todo.model";
import { revalidatePath } from "next/cache";

export async function dropTodo(todoId: string) {
    const user = await getCurrentUser();
    if (!user) throw new Error("Unauthorized");

    await TodoModel.deleteOne({
        _id: todoId,
        userId: user._id.toString(),
    });

    revalidatePath("/dashboard");
}