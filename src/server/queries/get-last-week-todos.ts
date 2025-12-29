import { TodoModel } from "@/lib/db/todo.model";

export async function getLastWeekTodos(userId: string) {
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);

    return TodoModel.find({
        userId,
        createdAt: {
            $gte: sevenDaysAgo,
            $lte: today,
        },
        locked: true,
    })
        .sort({ createdAt: -1 })
        .lean();
}
