"use server";

import { getCurrentUser } from "@/lib/auth/current-user";
import { TodoModel } from "@/lib/db/todo.model";
import { revalidatePath } from "next/cache";

export async function markYesterdayDone(todoId: string) {
    const user = await getCurrentUser();
    if (!user) throw new Error("Unauthorized");

    await TodoModel.updateOne(
        { _id: todoId, userId: user._id.toString() },
        { completed: true }
    );

    revalidatePath("/dashboard");
}
