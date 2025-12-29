"use server";

import { getCurrentUser } from "@/lib/auth/current-user";
import { TodoModel } from "@/lib/db/todo.model";
import { todayString } from "@/lib/todos/today";
import { revalidatePath } from "next/cache";

export async function carryForwardTodo(todoId: string) {
    const user = await getCurrentUser();
    if (!user) throw new Error("Unauthorized");

    const old = await TodoModel.findOne({
        _id: todoId,
        userId: user._id.toString(),
    });

    if (!old) throw new Error("Todo not found");

    await TodoModel.create({
        userId: user._id.toString(),
        title: old.title,
        createdForDate: todayString(),
        locked: false, // draft for today
    });

    revalidatePath("/dashboard");
}
